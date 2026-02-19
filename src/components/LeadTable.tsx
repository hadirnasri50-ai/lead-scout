import { type Lead } from "@/data/mockLeads";
import { ScoreCircle, PriorityBadge, SentimentBadge } from "./ScoreBadges";
import { Globe, TrendingUp, Star, Users, MapPin, ChevronRight } from "lucide-react";

interface LeadTableProps {
  leads: Lead[];
  selectedId: string | null;
  onSelect: (lead: Lead) => void;
}

export function LeadTable({ leads, selectedId, onSelect }: LeadTableProps) {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      {/* Header */}
      <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_40px] gap-4 px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border bg-muted/30">
        <span>Entreprise</span>
        <span>Score IA</span>
        <span>Priorité</span>
        <span>Sentiment NLP</span>
        <span>Conversion</span>
        <span></span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-border">
        {leads.map((lead, i) => (
          <button
            key={lead.id}
            onClick={() => onSelect(lead)}
            className={`w-full text-left px-5 py-4 transition-all duration-200 animate-fade-in-up ${
              selectedId === lead.id
                ? "bg-primary/10 border-l-2 border-l-primary"
                : "hover:bg-secondary/50 border-l-2 border-l-transparent"
            }`}
            style={{ animationDelay: `${i * 40}ms` }}
          >
            {/* Mobile layout */}
            <div className="md:hidden flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ScoreCircle score={lead.priorityScore} size={44} />
                <div>
                  <p className="font-semibold text-sm">{lead.company}</p>
                  <p className="text-xs text-muted-foreground">{lead.industry} · {lead.location}</p>
                  <div className="mt-1">
                    <PriorityBadge priority={lead.priority} />
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>

            {/* Desktop layout */}
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_40px] gap-4 items-center">
              {/* Company */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                  {lead.company.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{lead.company}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-0.5">
                      <MapPin className="w-3 h-3" />{lead.location.split(",")[0]}
                    </span>
                    <span>·</span>
                    <span>{lead.industry}</span>
                    {!lead.hasWebsite && (
                      <>
                        <span>·</span>
                        <span className="text-warning flex items-center gap-0.5">
                          <Globe className="w-3 h-3" /> Sans site
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Score */}
              <div className="flex items-center gap-2.5">
                <ScoreCircle score={lead.priorityScore} size={44} />
                <div className="text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-warning" />
                    {lead.googleRating}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Users className="w-3 h-3" />
                    {lead.reviewCount} avis
                  </div>
                </div>
              </div>

              {/* Priority */}
              <div>
                <PriorityBadge priority={lead.priority} />
                <p className="text-xs text-muted-foreground mt-1">
                  Potentiel: {lead.digitalPotential}%
                </p>
              </div>

              {/* Sentiment */}
              <div>
                <SentimentBadge sentiment={lead.sentiment} score={lead.sentimentScore} />
              </div>

              {/* Conversion */}
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-primary" />
                  <span className="text-sm font-bold">{lead.conversionProbability}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-gradient-primary transition-all"
                    style={{ width: `${lead.conversionProbability}%` }}
                  />
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-muted-foreground justify-self-end" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
