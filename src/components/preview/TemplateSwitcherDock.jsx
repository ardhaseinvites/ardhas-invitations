import { Link } from "react-router-dom";
import { Sparkles, Palette, Check } from "lucide-react";
import { useInvitation } from "../../context/InvitationContext";
import { getEventTemplates } from "../../data/content";

export default function TemplateSwitcherDock() {
  const { config, applyTemplate, selectEvent } = useInvitation();
  const siblingTemplates = getEventTemplates(config.eventType);

  if (!siblingTemplates || siblingTemplates.length <= 1) return null;

  return (
    <nav className="preview-template-dock" aria-label="Switch invitation design">
      <div className="dock-label">
        <Sparkles size={13} color="#c4a365" />
        <select
          value={config.eventType}
          onChange={(e) => selectEvent(e.target.value)}
          className="dock-event-select"
          aria-label="Select celebration occasion"
        >
          {eventTypes.map((evt) => (
            <option key={evt} value={evt}>
              {evt}
            </option>
          ))}
        </select>
      </div>

      <div className="dock-pills">
        {siblingTemplates.map((t) => {
          const isActive = config.template === t.id;
          return (
            <button
              key={t.id}
              className={`dock-pill ${isActive ? "active" : ""}`}
              onClick={() => applyTemplate(t.id)}
              aria-pressed={isActive}
              title={`${t.name} (${t.style} · ${t.layout})`}
            >
              <span
                className="dock-pill-color"
                style={{ backgroundColor: t.color }}
              />
              <span className="dock-pill-name">{t.name}</span>
              {isActive && <Check size={11} className="dock-check" />}
            </button>
          );
        })}
      </div>

      <Link
        to={`/customizer?event=${encodeURIComponent(config.eventType)}&theme=${config.template}`}
        className="dock-customize-btn"
      >
        <Palette size={13} />
        <span>Customize</span>
      </Link>
    </nav>
  );
}
