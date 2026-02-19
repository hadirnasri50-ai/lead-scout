import { TrendingUp, Users, Zap, Globe, Target } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: "leads" | "high" | "score" | "nowebsite" | "conversion";
  trend?: number;
  delay?: number;
}

const iconMap = {
  leads: Users,
  high: Zap,
  score: Target,
  nowebsite: Globe,
  conversion: TrendingUp,
};

const colorMap = {
  leads: "from-primary/20 to-primary/5 border-primary/30 text-primary",
  high: "from-success/20 to-success/5 border-success/30 text-success",
  score: "from-accent/20 to-accent/5 border-accent/30 text-accent",
  nowebsite: "from-warning/20 to-warning/5 border-warning/30 text-warning",
  conversion: "from-primary/20 to-primary/5 border-primary/30 text-primary",
};

export function KPICard({ title, value, subtitle, icon, trend, delay = 0 }: KPICardProps) {
  const Icon = iconMap[icon];
  const colors = colorMap[icon];

  return (
    <div
      className="glass-card rounded-xl p-5 flex flex-col gap-3 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors} border flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend !== undefined && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              trend >= 0
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {trend >= 0 ? "+" : ""}{trend}%
          </span>
        )}
      </div>
      <div>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{title}</p>
      </div>
      <p className="text-xs text-muted-foreground border-t border-border pt-3">{subtitle}</p>
    </div>
  );
}
