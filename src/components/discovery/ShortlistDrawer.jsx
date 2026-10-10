import { useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Trash2, Heart, Palette, MessageCircle } from "lucide-react";
import { templates } from "../../data/content";

export default function ShortlistDrawer({
  isOpen,
  onClose,
  savedIds,
  onRemove,
  onClear,
  onApplyTemplate,
}) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const savedTemplates = templates.filter((t) => savedIds.includes(t.id));

  const whatsappMessage = encodeURIComponent(
    `Hi Ardhas! Here is my shortlisted invitation moodboard:\n` +
      savedTemplates.map((t, i) => `${i + 1}. ${t.name} (${t.eventType} - ${t.style})`).join("\n") +
      `\n\nI'd love to discuss personalizing one of these!`
  );
  const whatsappUrl = `https://wa.me/919048503717?text=${whatsappMessage}`;

  return (
    <div
      className="shortlist-drawer-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="My Saved Moodboard"
    >
      <div className="shortlist-drawer">
        <div className="shortlist-drawer-header">
          <h3>
            <Heart size={20} fill="#c4a365" color="#c4a365" />
            <span>My Moodboard</span>
            <span style={{ fontSize: "14px", color: "#8c827a", fontWeight: 400 }}>
              ({savedTemplates.length})
            </span>
          </h3>
          <button className="quick-view-close" onClick={onClose} aria-label="Close shortlist">
            <X size={16} />
          </button>
        </div>

        <div className="shortlist-drawer-body">
          {savedTemplates.length === 0 ? (
            <div className="shortlist-empty-state">
              <Heart size={44} strokeWidth={1} />
              <h4>Your moodboard is empty</h4>
              <p>
                Browse designs and tap the heart icon on your favorite cards to build your personal celebration collection.
              </p>
            </div>
          ) : (
            savedTemplates.map((template) => {
              const destination = `/customizer?event=${encodeURIComponent(
                template.eventType
              )}&theme=${template.id}`;

              return (
                <div key={template.id} className="shortlist-item-card">
                  <div
                    className="shortlist-thumb"
                    style={{
                      backgroundColor: template.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    <span>{template.tag}</span>
                  </div>

                  <div className="shortlist-item-info">
                    <h4>{template.name}</h4>
                    <p>
                      {template.eventType} · {template.style}
                    </p>
                    <div className="shortlist-item-actions">
                      <Link
                        to={destination}
                        className="shortlist-apply-btn"
                        onClick={() => {
                          onApplyTemplate?.(template.id);
                          onClose();
                        }}
                      >
                        <Palette size={11} style={{ marginRight: 4 }} />
                        Customize
                      </Link>
                      <button
                        className="shortlist-remove-btn"
                        onClick={() => onRemove(template.id)}
                        aria-label={`Remove ${template.name}`}
                        title="Remove from board"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {savedTemplates.length > 0 && (
          <div className="shortlist-drawer-footer">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shortlist-share-btn"
            >
              <MessageCircle size={16} />
              <span>Share Moodboard on WhatsApp</span>
            </a>
            <button className="shortlist-clear-btn" onClick={onClear}>
              Clear all saved
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
