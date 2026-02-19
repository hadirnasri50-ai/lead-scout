import { type Lead } from "@/data/mockLeads";
import { ScoreCircle, PriorityBadge, SentimentBadge } from "./ScoreBadges";
import {
  X, Globe, Users, Star, MapPin, Building2, TrendingUp,
  AlertCircle, CheckCircle, Tag, Calendar, Cpu
} from "lucide-react";

interface LeadDetailPanelProps {
  lead: Lead;
  onClose: () => void;
}

function ProgressBar({ value, label, color = "primary" }: { value: number; label: string; color?: string }) {
  const colorClass = color === "success" ? "bg-success" : color === "warning" ? "bg-warning" : "bg-primary";
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className={`h-2 rounded-full ${colorClass} transition-all duration-700`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function InfoRow({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{className?: string}> }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
      <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium truncate">{value}</p>
      </div>
    </div>
  );
}

export function LeadDetailPanel({ lead, onClose }: LeadDetailPanelProps) {
  return (
    <div className="glass-card rounded-xl overflow-hidden animate-slide-in-right h-full flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-border bg-gradient-card">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-lg font-bold text-primary-foreground">
              {lead.company.charAt(0)}
            </div>
            <div>
              <h2 className="font-bold text-base leading-tight">{lead.company}</h2>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" /> {lead.location}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-muted hover:bg-secondary transition-colors flex items-center justify-center"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <PriorityBadge priority={lead.priority} />
          {lead.needsWebsite ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-warning/15 text-warning border border-warning/30">
              <AlertCircle className="w-3 h-3" /> Sans site web
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border">
              <Globe className="w-3 h-3" /> Site existant
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Score ring */}
        <div className="flex items-center justify-center gap-6 py-2">
          <div className="text-center">
            <ScoreCircle score={lead.priorityScore} size={80} strokeWidth={7} />
            <p className="text-xs text-muted-foreground mt-2">Score IA</p>
          </div>
          <div className="text-center">
            <ScoreCircle score={lead.digitalPotential} size={80} strokeWidth={7} />
            <p className="text-xs text-muted-foreground mt-2">Potentiel digital</p>
          </div>
          <div className="text-center">
            <ScoreCircle score={lead.conversionProbability} size={80} strokeWidth={7} />
            <p className="text-xs text-muted-foreground mt-2">Conversion</p>
          </div>
        </div>

        {/* Sentiment */}
        <div className="bg-muted/40 rounded-xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-semibold">Analyse NLP des avis</h3>
          </div>
          <SentimentBadge sentiment={lead.sentiment} score={lead.sentimentScore} />
          <div className="mt-3 space-y-2">
            <ProgressBar
              value={Math.round((lead.sentimentScore + 1) / 2 * 100)}
              label="Score sentiment global"
              color={lead.sentiment === "positive" ? "success" : lead.sentiment === "neutral" ? "primary" : "warning"}
            />
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <Star className="w-3.5 h-3.5 text-warning" />
              <span>{lead.googleRating}/5 · {lead.reviewCount} avis analysés</span>
            </div>
          </div>
        </div>

        {/* Métriques */}
        <div className="bg-muted/40 rounded-xl p-4 border border-border">
          <h3 className="text-sm font-semibold mb-3">Métriques de scoring</h3>
          <div className="space-y-3">
            <ProgressBar value={lead.priorityScore} label="Score de priorité ML" color="primary" />
            <ProgressBar value={lead.digitalPotential} label="Potentiel digital" color={lead.digitalPotential >= 70 ? "success" : "primary"} />
            {lead.hasWebsite && (
              <ProgressBar value={lead.websiteQuality} label="Qualité du site actuel" color={lead.websiteQuality >= 60 ? "success" : "warning"} />
            )}
            <ProgressBar value={lead.conversionProbability} label="Probabilité de conversion" color="success" />
          </div>
        </div>

        {/* Informations */}
        <div className="bg-muted/40 rounded-xl p-4 border border-border">
          <h3 className="text-sm font-semibold mb-1">Informations entreprise</h3>
          <InfoRow label="Secteur" value={lead.industry} icon={Building2} />
          <InfoRow label="Effectifs" value={lead.employees + " employés"} icon={Users} />
          <InfoRow label="Chiffre d'affaires" value={lead.revenue} icon={TrendingUp} />
          <InfoRow label="Présence web" value={lead.hasWebsite ? `Site existant (qualité: ${lead.websiteQuality}%)` : "Aucun site web"} icon={Globe} />
          <InfoRow label="Dernière analyse" value={lead.lastAnalyzed} icon={Calendar} />
        </div>

        {/* Tags */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-3.5 h-3.5 text-muted-foreground" />
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tags ML</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {lead.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-full bg-secondary text-xs text-secondary-foreground border border-border">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button className="w-full py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-glow">
          <CheckCircle className="w-4 h-4" />
          Contacter ce lead
        </button>
      </div>
    </div>
  );
}
