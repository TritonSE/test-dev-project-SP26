import mongoose from "mongoose";

import { database_url } from "../config";
import { members, rankings, submissions, teams } from "../data/data";
import Member from "../models/Member";
import Rankings from "../models/Rankings";
import Submission from "../models/Submission";
import Team from "../models/Team";

import type { Types } from "mongoose";

function getRequired<T>(recordsByKey: Map<string, T>, key: string, context: string): T {
  const record = recordsByKey.get(key);

  if (!record) {
    throw new Error(`${context}: no record found for "${key}"`);
  }

  return record;
}

function getUniqueMember<T>(membersByName: Map<string, T[]>, name: string, context: string): T {
  const matches = membersByName.get(name) ?? [];

  if (matches.length !== 1) {
    throw new Error(`${context}: expected one member named "${name}", found ${matches.length}`);
  }

  return matches[0];
}

async function seedTeams() {
  const insertedTeams = await Team.insertMany(teams);
  const teamsByName = new Map<string, (typeof insertedTeams)[number]>();

  for (const team of insertedTeams) {
    if (teamsByName.has(team.teamName)) {
      throw new Error(`Duplicate team name in database seed: "${team.teamName}"`);
    }

    teamsByName.set(team.teamName, team);
  }

  console.info(`Seeded ${insertedTeams.length} teams`);
  return teamsByName;
}

type TeamsByName = Awaited<ReturnType<typeof seedTeams>>;

async function seedMembers(teamsByName: TeamsByName) {
  const membersToInsert = await Promise.all(
    members.map(async (member) => {
      const team = getRequired(teamsByName, member.team, `Team for member "${member.name}"`);

      return {
        ...member,
        team: team._id,
      };
    }),
  );
  const insertedMembers = await Member.insertMany(membersToInsert);
  const membersByName = new Map<string, (typeof insertedMembers)[number][]>();

  for (const member of insertedMembers) {
    const matches = membersByName.get(member.name) ?? [];
    matches.push(member);
    membersByName.set(member.name, matches);
  }

  console.info(`Seeded ${insertedMembers.length} members`);
  return membersByName;
}

type MembersByName = Awaited<ReturnType<typeof seedMembers>>;

async function seedSubmissions(teamsByName: TeamsByName, membersByName: MembersByName) {
  const submissionKeys = submissions.map(({ key }) => key);

  if (new Set(submissionKeys).size !== submissionKeys.length) {
    throw new Error("Submission seed keys must be unique");
  }

  const submissionsByKey = new Map<string, Types.ObjectId>();

  await Promise.all(
    submissions.map(async (submission) => {
      const pointAllocation = submission.pointAllocation.map((allocation) => ({
        ...allocation,
        team: getRequired(
          teamsByName,
          allocation.team,
          `Team in point allocation for "${submission.eventName}"`,
        )._id,
      }));
      const tags = submission.tags.map((tag) => ({
        ...tag,
        member: getUniqueMember(
          membersByName,
          tag.member,
          `Tag in submission "${submission.eventName}"`,
        )._id,
      }));
      const member = getUniqueMember(
        membersByName,
        submission.member,
        `Submitter for "${submission.eventName}"`,
      );
      const targetTeam = submission.pvpTargetTeam
        ? getRequired(
            teamsByName,
            submission.pvpTargetTeam,
            `PVP target for "${submission.eventName}"`,
          )
        : null;

      if (submission.pvpHandling === "yes" && !targetTeam) {
        throw new Error(`PVP target is required for "${submission.eventName}"`);
      }

      if (submission.pvpHandling === "no" && targetTeam) {
        throw new Error(`Unexpected PVP target for "${submission.eventName}"`);
      }

      const insertedSubmission = await Submission.create({
        photoKeys: submission.photoKeys,
        eventName: submission.eventName,
        date: submission.date,
        location: submission.location,
        pointAllocation,
        tags,
        pvpHandling: submission.pvpHandling,
        pvpTargetTeam: targetTeam?._id ?? null,
        status: submission.status,
        reviewedAt: submission.reviewedAt,
        member: member._id,
      });

      submissionsByKey.set(submission.key, insertedSubmission._id);
    }),
  );

  console.info(`Seeded ${submissionsByKey.size} submissions`);
  return submissionsByKey;
}

type SubmissionsByKey = Awaited<ReturnType<typeof seedSubmissions>>;

async function seedRankings(teamsByName: TeamsByName, submissionsByKey: SubmissionsByKey) {
  const rankingsToInsert = rankings.map((ranking) => {
    if (ranking.rankings.length !== teamsByName.size) {
      throw new Error(`Ranking "${ranking.message}" must include every seeded team`);
    }

    const rankedTeams = ranking.rankings.map(
      (teamName) => getRequired(teamsByName, teamName, `Ranking "${ranking.message}"`)._id,
    );

    if (new Set(ranking.rankings).size !== teamsByName.size) {
      throw new Error(`Ranking "${ranking.message}" must list each team exactly once`);
    }

    const submission =
      ranking.source === "submission"
        ? ranking.submission
          ? getRequired(
              submissionsByKey,
              ranking.submission,
              `Submission for ranking "${ranking.message}"`,
            )
          : null
        : null;

    if (ranking.source === "submission" && !submission) {
      throw new Error(`Ranking "${ranking.message}" requires a submission seed key`);
    }

    if (ranking.source === "pointsAdjustment" && ranking.submission !== null) {
      throw new Error(
        `Points-adjustment ranking "${ranking.message}" cannot reference a submission`,
      );
    }

    return {
      message: ranking.message,
      rankings: rankedTeams,
      source: ranking.source,
      submission,
    };
  });
  const insertedRankings = await Rankings.insertMany(rankingsToInsert);

  console.info(`Seeded ${insertedRankings.length} rankings`);
}

async function seedDatabase() {
  await mongoose.connect(database_url);
  console.info("Connected to MongoDB");

  try {
    await Rankings.deleteMany({});
    await Submission.deleteMany({});
    await Member.deleteMany({});
    await Team.deleteMany({});

    const teamsByName = await seedTeams();
    const membersByName = await seedMembers(teamsByName);
    const submissionsByKey = await seedSubmissions(teamsByName, membersByName);
    await seedRankings(teamsByName, submissionsByKey);
  } finally {
    await mongoose.disconnect();
    console.info("Disconnected from MongoDB");
  }
}

seedDatabase().catch((error: unknown) => {
  console.error("Failed to seed database:", error);
  process.exitCode = 1;
});
