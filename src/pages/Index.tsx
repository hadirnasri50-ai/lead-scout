import { useState, useMemo } from "react";
import { mockLeads, kpiData, type Lead, type Priority } from "@/data/mockLeads";
import { KPICard } from "@/components/KPICard";
import { LeadTable } from "@/components/LeadTable";
import { LeadDetailPanel } from "@/components/LeadDetailPanel";
import { ScoreDistributionChart, IndustryChart } from "@/components/Charts";
import { Search, SlidersHorizontal, Brain, ChevronDown } from "lucide-react";

type FilterPriority = Priority | "all";
type SortKey = "priorityScore" | "digitalPotential" | "conversionProbability" | "googleRating";

export default function Index() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState<FilterPriority>("all");
  const [sortKey, setSortKey] = useState<SortKey>("priorityScore");
  const [showFilters, setShowFilters] = useState(false);

  const filteredLeads = useMemo(() => {
    return mockLeads
      .filter((lead) => {
        const matchSearch =
          lead.company.toLowerCase().includes(search.toLowerCase()) ||
          lead.industry.toLowerCase().includes(search.toLowerCase()) ||
          lead.location.toLowerCase().includes(search.toLowerCase());
        const matchPriority = filterPriority === "all" || lead.priority === filterPriority;
        return matchSearch && matchPriority;
      })
      .sort((a, b) => b[sortKey] - a[sortKey]);
  }, [search, filterPriority, sortKey]);

  const priorityOptions: { value: FilterPriority; label: string }[] = [
    { value: "all", label: "Tous" },
    { value: "high", label: "Haute" },
    { value: "medium", label: "Moyenne" },
    { value: "low", label: "Faible" },
  ];

  const sortOptions: { value: SortKey; label: string }[] = [
    { value: "priorityScore", label: "Score IA" },
    { value: "digitalPotential", label: "Potentiel digital" },
    { value: "conversionProbability", label: "Conversion" },
    { value: "googleRating", label: "Note Google" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top navigation */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight">LeadScore</span>
              <span className="text-xs text-muted-foreground ml-1 hidden sm:inline">AI Prioritization Platform</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse-ring" />
            <span className="hidden sm:inline">Modèles ML actifs · Analyse en temps réel</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        {/* Page title */}
        <div className="mb-6 animate-fade-in-up">
          <h1 className="text-2xl font-bold tracking-tight">
            Tableau de bord des leads
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Scoring intelligent alimenté par ML · {filteredLeads.length} entreprises analysées
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          <KPICard
            title="Leads totaux"
            value={kpiData.totalLeads}
            subtitle="Entreprises dans le pipeline"
            icon="leads"
            trend={12}
            delay={0}
          />
          <KPICard
            title="Haute priorité"
            value={kpiData.highPriority}
            subtitle="Score ≥ 75 — À contacter en urgence"
            icon="high"
            trend={8}
            delay={60}
          />
          <KPICard
            title="Score moyen"
            value={`${kpiData.avgScore}/100`}
            subtitle="Indice de priorité ML global"
            icon="score"
            delay={120}
          />
          <KPICard
            title="Sans site web"
            value={kpiData.noWebsite}
            subtitle="Potentiel de création de site"
            icon="nowebsite"
            trend={5}
            delay={180}
          />
          <KPICard
            title="Taux conversion"
            value={`${kpiData.avgConversion}%`}
            subtitle="Probabilité moyenne de closing"
            icon="conversion"
            delay={240}
          />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <ScoreDistributionChart />
          <IndustryChart />
        </div>

        {/* Leads section */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Table area */}
          <div className="flex-1 min-w-0">
            {/* Filters bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher une entreprise, secteur, ville..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>

              {/* Filter toggle (mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden flex items-center gap-2 px-4 py-2.5 bg-secondary border border-border rounded-lg text-sm"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filtres
              </button>

              {/* Priority filter */}
              <div className={`flex gap-1.5 ${showFilters ? "flex" : "hidden sm:flex"}`}>
                {priorityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFilterPriority(opt.value)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      filterPriority === opt.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-muted border border-border"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className={`relative ${showFilters ? "flex" : "hidden sm:flex"}`}>
                <select
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value as SortKey)}
                  className="appearance-none bg-secondary border border-border text-secondary-foreground text-xs rounded-lg px-3 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      Trier: {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Results count */}
            <p className="text-xs text-muted-foreground mb-3">
              {filteredLeads.length} résultat{filteredLeads.length !== 1 ? "s" : ""} · Trié par {sortOptions.find(s => s.value === sortKey)?.label}
            </p>

            <LeadTable
              leads={filteredLeads}
              selectedId={selectedLead?.id ?? null}
              onSelect={(lead) => setSelectedLead(lead)}
            />
          </div>

          {/* Detail panel */}
          {selectedLead && (
            <div className="lg:w-[340px] xl:w-[380px] flex-shrink-0">
              <div className="sticky top-20">
                <LeadDetailPanel
                  lead={selectedLead}
                  onClose={() => setSelectedLead(null)}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
