import { Search, X, Heart, LayoutGrid, Rows3, Sparkles } from "lucide-react";

export const VIBE_OPTIONS = [
  { id: "all", label: "All Aesthetics" },
  { id: "deckle", label: "Deckle Torn-Paper" },
  { id: "velure", label: "Velure Olive Linen" },
  { id: "minimal", label: "Minimalist Luxury" },
  { id: "heritage", label: "Royal Heritage" },
  { id: "celestial", label: "Celestial Starlight" },
  { id: "boho", label: "Boho Terracotta" },
  { id: "royal", label: "Royal Velvet" },
  { id: "romantic", label: "Modern Romance" },
  { id: "floral", label: "Garden Floral" },
  { id: "classic", label: "Classic Traditional" },
];

export const COLOR_PALETTES = [
  { id: "all", label: "All Colors", color: "all" },
  { id: "gold", label: "Gold & Champagne", color: "#c8a96a" },
  { id: "ruby", label: "Ruby & Crimson", color: "#8a2b3d" },
  { id: "sage", label: "Emerald & Sage", color: "#25665b" },
  { id: "terracotta", label: "Terracotta & Ochre", color: "#bc6c25" },
  { id: "midnight", label: "Midnight Sapphire", color: "#38527a" },
  { id: "rose", label: "Blush Rose", color: "#a55770" },
];

export const LAYOUT_OPTIONS = [
  { id: "all", label: "All Layouts" },
  { id: "editorial", label: "Editorial Wash" },
  { id: "deckle", label: "Deckle Torn Edge" },
  { id: "velure", label: "Velure Monogram" },
  { id: "arch", label: "Regal Arch" },
  { id: "split", label: "Asymmetric Split" },
  { id: "framed", label: "Cameo Medallion" },
  { id: "floating", label: "Floating Envelope" },
  { id: "polaroid", label: "Polaroid Film Stack" },
  { id: "estate", label: "Architectural Estate" },
];

export default function FilterBar({
  searchQuery,
  onSearchChange,
  activeVibe,
  onVibeChange,
  activeColor,
  onColorChange,
  activeLayout,
  onLayoutChange,
  viewMode,
  onViewModeChange,
  totalResults,
  totalTemplates,
  onResetFilters,
  hasActiveFilters,
  savedCount,
  onOpenShortlist,
}) {
  return (
    <div className="discovery-controls">
      {/* Search & Mode Header */}
      <div className="discovery-header-row">
        <div className="discovery-search-box">
          <Search size={16} className="discovery-search-icon" />
          <input
            type="text"
            placeholder="Search templates (e.g. Gold, Arch, Sangeet, Velvet, Boho)…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search template designs"
          />
          {searchQuery && (
            <button
              className="discovery-clear-search"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="discovery-actions">
          <div className="discovery-view-toggle" role="group" aria-label="View mode">
            <button
              className={`discovery-view-btn ${viewMode === "masonry" ? "active" : ""}`}
              onClick={() => onViewModeChange("masonry")}
              title="Pinterest Masonry Moodboard"
            >
              <LayoutGrid size={14} />
              <span>Moodboard</span>
            </button>
            <button
              className={`discovery-view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => onViewModeChange("grid")}
              title="Classic Editorial Grid"
            >
              <Rows3 size={14} />
              <span>Grid</span>
            </button>
          </div>

          <button
            className="shortlist-trigger-btn"
            onClick={onOpenShortlist}
            aria-label={`View saved templates (${savedCount})`}
          >
            <Heart size={15} fill={savedCount > 0 ? "#c4a365" : "none"} />
            <span>Shortlist</span>
            {savedCount > 0 && <span className="shortlist-badge">{savedCount}</span>}
          </button>
        </div>
      </div>

      {/* Filter Cluster */}
      <div className="discovery-filters-cluster">
        {/* Aesthetic Vibes */}
        <div className="discovery-pills-row" role="group" aria-label="Filter by aesthetic">
          <span className="discovery-filter-label">Vibe:</span>
          {VIBE_OPTIONS.map((vibe) => (
            <button
              key={vibe.id}
              className={`vibe-pill ${activeVibe === vibe.id ? "active" : ""}`}
              onClick={() => onVibeChange(vibe.id)}
            >
              {vibe.label}
            </button>
          ))}
        </div>

        {/* Color Palettes & Layouts */}
        <div className="discovery-pills-row" style={{ alignItems: "center" }}>
          <span className="discovery-filter-label">Palette:</span>
          {COLOR_PALETTES.map((palette) => (
            <button
              key={palette.id}
              className={`color-chip ${palette.id === "all" ? "color-chip-all" : ""} ${
                activeColor === palette.id ? "active" : ""
              }`}
              style={
                palette.id !== "all" ? { backgroundColor: palette.color } : undefined
              }
              title={palette.label}
              onClick={() => onColorChange(palette.id)}
              aria-label={`Filter by ${palette.label}`}
            />
          ))}

          <span
            className="discovery-filter-label"
            style={{ marginLeft: "16px", borderLeft: "1px solid rgba(0,0,0,0.1)", paddingLeft: "14px" }}
          >
            Layout:
          </span>
          {LAYOUT_OPTIONS.map((layout) => (
            <button
              key={layout.id}
              className={`vibe-pill ${activeLayout === layout.id ? "active" : ""}`}
              onClick={() => onLayoutChange(layout.id)}
            >
              {layout.label}
            </button>
          ))}
        </div>
      </div>

      {/* Live status bar */}
      <div className="discovery-status-bar">
        <span>
          Showing <strong>{totalResults}</strong> of {totalTemplates} signature designs
          {hasActiveFilters && " (filtered)"}
        </span>
        {hasActiveFilters && (
          <button className="discovery-reset-btn" onClick={onResetFilters}>
            Reset filters
          </button>
        )}
      </div>
    </div>
  );
}
