import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, Heart, Palette, Play, Share2, Check, Sparkles, MoveRight } from "lucide-react";
import Invitation from "../../templates/Invitation";
import { getEventDefaults } from "../../data/content";

export default function TemplateQuickViewModal({
  template,
  onClose,
  isSaved,
  onToggleSave,
  onApplyTemplate,
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!template) return null;

  const config = getEventDefaults(template.eventType, template.id);
  const destination = `/customizer?event=${encodeURIComponent(template.eventType)}&theme=${template.id}`;

  const handleShare = () => {
    const url = window.location.origin + destination;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="quick-view-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="qv-title"
    >
      <div className="quick-view-modal">
        <button
          className="quick-view-close"
          onClick={onClose}
          aria-label="Close template details"
        >
          <X size={18} />
        </button>

        {/* Left: Scaled live invitation canvas */}
        <div className="quick-view-preview-pane">
          <div className="quick-view-canvas-wrap">
            <Invitation config={config} compact />
          </div>
        </div>

        {/* Right: Detailed design spec & CTAs */}
        <div className="quick-view-details-pane">
          <div>
            <div className="quick-view-eyebrow">
              <Sparkles size={13} />
              <span>{template.eventType} · {template.tag}</span>
            </div>
            <h2 id="qv-title" className="quick-view-title">{template.name}</h2>
            <p className="quick-view-desc">{template.description}</p>

            <div className="quick-view-specs">
              <div className="spec-item">
                <small>Aesthetic Vibe</small>
                <span>{template.style}</span>
              </div>
              <div className="spec-item">
                <small>Layout Architecture</small>
                <span>{template.layout}</span>
              </div>
              <div className="spec-item">
                <small>Palette Accent</small>
                <span>
                  <i
                    className="spec-color-dot"
                    style={{ backgroundColor: template.color }}
                  />
                  {template.color}
                </span>
              </div>
              <div className="spec-item">
                <small>Typography</small>
                <span>{template.font}</span>
              </div>
            </div>
          </div>

          <div className="quick-view-cta-group">
            <Link
              to={destination}
              className="quick-view-primary-btn"
              onClick={() => onApplyTemplate?.(template.id)}
            >
              <Palette size={16} />
              <span>Customize This Design</span>
              <MoveRight size={16} />
            </Link>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <Link
                to="/preview"
                className="quick-view-secondary-btn"
                onClick={() => onApplyTemplate?.(template.id)}
              >
                <Play size={14} fill="currentColor" />
                <span>Live Preview</span>
              </Link>

              <button
                type="button"
                className="quick-view-secondary-btn"
                onClick={() => onToggleSave(template.id)}
              >
                <Heart size={15} fill={isSaved ? "#e63946" : "none"} color={isSaved ? "#e63946" : "currentColor"} />
                <span>{isSaved ? "Saved" : "Save to Board"}</span>
              </button>
            </div>

            <button
              type="button"
              className="quick-view-secondary-btn"
              onClick={handleShare}
              style={{ justifyContent: "center" }}
            >
              {copied ? <Check size={14} color="#2a9d8f" /> : <Share2 size={14} />}
              <span>{copied ? "Link Copied to Clipboard" : "Share Design Link"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
