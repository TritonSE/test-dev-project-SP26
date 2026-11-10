import teamChipStyles from "./teamChip.module.css";

type Team = {
  id: string;
  name: string;
};

type TeamChipProps = {
  team: Team;
};

export function getTeamVariantClassName(name: string) {
  const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const teamKey = normalizedName.startsWith("f3") ? "f3" : normalizedName;
  return teamChipStyles[teamKey as keyof typeof teamChipStyles] ?? "";
}

export default function TeamChip({ team }: TeamChipProps) {
  const variantClassName = getTeamVariantClassName(team.name);
  const className = [teamChipStyles.teamChip, variantClassName].filter(Boolean).join(" ");
  const fontSize = Math.max(7, 12 - Math.max(0, team.name.length - 12) * 0.25);

  return (
    <div className={className}>
      <span className={teamChipStyles.label} style={{ fontSize: `${fontSize}px` }}>
        {team.name}
      </span>
    </div>
  );
}
