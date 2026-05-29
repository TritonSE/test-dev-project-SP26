import teamChipStyles from "../styles/teamChip.module.css";

type Team = {
  id: string;
  name: string;
};

type TeamChipProps = {
  team: Team;
};

export default function TeamChip({ team }: TeamChipProps) {
  const variantClassName = teamChipStyles[team.id as keyof typeof teamChipStyles] ?? "";
  const className = [teamChipStyles.teamChip, variantClassName].filter(Boolean).join(" ");
  return (
    <div className={className}>
      <span className={teamChipStyles.label}>{team.name}</span>
    </div>
  );
}
