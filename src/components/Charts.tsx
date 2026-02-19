import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { scoreDistribution, industryBreakdown } from "@/data/mockLeads";

const SCORE_COLORS = ["hsl(4,90%,58%)", "hsl(4,90%,58%)", "hsl(38,92%,50%)", "hsl(217,91%,60%)", "hsl(142,71%,45%)"];
const INDUSTRY_COLORS = [
  "hsl(217,91%,60%)", "hsl(189,94%,58%)", "hsl(142,71%,45%)",
  "hsl(38,92%,50%)", "hsl(280,80%,65%)", "hsl(4,90%,58%)", "hsl(160,70%,50%)"
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-elevated text-xs">
        <p className="font-semibold">{label}</p>
        <p className="text-primary">{payload[0].value} leads</p>
      </div>
    );
  }
  return null;
};

export function ScoreDistributionChart() {
  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="text-sm font-semibold mb-1">Distribution des scores IA</h3>
      <p className="text-xs text-muted-foreground mb-4">Répartition par tranche de score de priorité</p>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={scoreDistribution} barSize={32}>
          <XAxis
            dataKey="range"
            tick={{ fill: "hsl(215,15%,55%)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(224,25%,14%)" }} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {scoreDistribution.map((_, i) => (
              <Cell key={i} fill={SCORE_COLORS[i]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function IndustryChart() {
  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="text-sm font-semibold mb-1">Leads par secteur</h3>
      <p className="text-xs text-muted-foreground mb-4">Répartition sectorielle du portefeuille</p>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={industryBreakdown}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={75}
            paddingAngle={3}
            dataKey="value"
          >
            {industryBreakdown.map((_, i) => (
              <Cell key={i} fill={INDUSTRY_COLORS[i % INDUSTRY_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) =>
              active && payload?.length ? (
                <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-elevated text-xs">
                  <p className="font-semibold">{payload[0].name}</p>
                  <p className="text-primary">{payload[0].value} lead(s)</p>
                </div>
              ) : null
            }
          />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => <span style={{ color: "hsl(215,15%,55%)", fontSize: 11 }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
