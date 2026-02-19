import { type Priority, type Sentiment } from "@/data/mockLeads";

interface ScoreCircleProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

function getScoreColor(score: number) {
  if (score >= 75) return "hsl(142, 71%, 45%)";
  if (score >= 50) return "hsl(38, 92%, 50%)";
  return "hsl(4, 90%, 58%)";
}

export function ScoreCircle({ score, size = 56, strokeWidth = 5, showLabel = true }: ScoreCircleProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(224, 25%, 14%)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1s ease-out",
            filter: `drop-shadow(0 0 4px ${color})`,
          }}
        />
      </svg>
      {showLabel && (
        <span
          className="absolute text-xs font-bold mono"
          style={{ color }}
        >
          {score}
        </span>
      )}
    </div>
  );
}

interface PriorityBadgeProps {
  priority: Priority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = {
    high: {
      label: "Haute",
      className: "bg-success/15 text-success border-success/30",
      dot: "bg-success",
    },
    medium: {
      label: "Moyenne",
      className: "bg-warning/15 text-warning border-warning/30",
      dot: "bg-warning",
    },
    low: {
      label: "Faible",
      className: "bg-destructive/15 text-destructive border-destructive/30",
      dot: "bg-destructive",
    },
  };

  const { label, className, dot } = config[priority];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot} animate-pulse-ring`} />
      {label}
    </span>
  );
}

interface SentimentBadgeProps {
  sentiment: Sentiment;
  score: number;
}

export function SentimentBadge({ sentiment, score }: SentimentBadgeProps) {
  const config = {
    positive: { label: "Positif", emoji: "😊", className: "bg-success/10 text-success border-success/25" },
    neutral: { label: "Neutre", emoji: "😐", className: "bg-muted text-muted-foreground border-border" },
    negative: { label: "Négatif", emoji: "😟", className: "bg-destructive/10 text-destructive border-destructive/25" },
  };

  const { label, emoji, className } = config[sentiment];
  const pct = Math.round(Math.abs(score) * 100);

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${className}`}>
      <span>{emoji}</span>
      <span>{label}</span>
      <span className="opacity-60">({pct}%)</span>
    </div>
  );
}
