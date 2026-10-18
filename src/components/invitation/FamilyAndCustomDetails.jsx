import {
  Heart,
  Users,
  Sparkles,
  MapPin,
  Clock,
  Calendar,
  ExternalLink,
  Tag,
  Info,
} from "lucide-react";
import "../../styles/family-custom-details.css";

export default function FamilyAndCustomDetails({ config, compact = false }) {
  if (compact) return null;

  const isWedding = config.eventType === "Wedding" || !config.eventType;

  // Resolve Groom & Bride Names
  const rawNames = config.names || "Aarav & Diya";
  const nameParts = rawNames.split(/&|and|\+/i);
  const groomFirst = nameParts[0]?.trim() || "Aarav";
  const brideFirst = nameParts[1]?.trim() || "Diya";

  const groomFull = config.groomFullName || `${groomFirst} Suresh Menon`;
  const brideFull = config.brideFullName || `${brideFirst} Rajan Pillai`;

  // Resolve Groom's Parents
  const groomFather = config.groomFatherName || (isWedding ? "Sri Suresh Menon" : "");
  const groomMother = config.groomMotherName || (isWedding ? "Smt. Latha Menon" : "");
  const hasGroomParents = Boolean(groomFather || groomMother);

  // Resolve Bride's Parents
  const brideFather = config.brideFatherName || (isWedding ? "Sri Rajan Pillai" : "");
  const brideMother = config.brideMotherName || (isWedding ? "Smt. Suma Pillai" : "");
  const hasBrideParents = Boolean(brideFather || brideMother);

  // Additional Family Members
  const additionalFamily = config.additionalFamily || [];
  const defaultAdditionalFamily = isWedding && additionalFamily.length === 0
    ? [
        { name: "Smt. Bhavani Amma", relationship: "Paternal Grandmother" },
        { name: "Sri K. P. Nair", relationship: "Maternal Grandfather" },
      ]
    : additionalFamily;

  // Custom Fields
  const userCustomFields = (config.customFields || []).filter(
    (cf) => cf && cf.label && cf.value
  );

  const defaultCustomFields = isWedding && userCustomFields.length === 0
    ? [
        {
          id: "muhurtham",
          label: "Auspicious Muhurtham",
          type: "text",
          value: "10:15 AM – 11:00 AM (Makayiram Nakshatram)",
        },
        {
          id: "dress_theme",
          label: "Attire Guidance",
          type: "text",
          value: "Festive Elegance · Traditional Kasavu & Soft Pastels",
        },
        {
          id: "wedding_tag",
          label: "Celebration Hashtag",
          type: "text",
          value: "#AaravWedsDiya",
        },
        {
          id: "family_kuladevata",
          label: "Ancestral Temple",
          type: "text",
          value: "Sree Krishna Temple, Guruvayur",
        },
      ]
    : userCustomFields;

  // Multi-event repeater (events beyond the primary one)
  const multipleEvents = (config.events || []).filter(
    (ev) => ev && ev.name && (ev.time || ev.venue)
  );

  return (
    <section className="family-custom-details-container">
      {/* 1. PARENTS & FAMILY HERITAGE SECTION */}
      {(hasGroomParents || hasBrideParents || defaultAdditionalFamily.length > 0) && (
        <div className="heritage-section-card">
          <header className="heritage-card-header">
            <span className="heritage-eyebrow">
              <Sparkles size={13} className="heritage-sparkle-icon" />
              TOGETHER WITH THEIR FAMILIES
            </span>
            <h3 className="heritage-card-title">With the Blessings of Our Parents</h3>
            <div className="heritage-divider-ornament">
              <span className="ornament-line" />
              <span className="ornament-glyph">❖ ✦ ❖</span>
              <span className="ornament-line" />
            </div>
            <p className="heritage-intro-quote">
              “Two families unite as one, bound by love, tradition and sacred blessings.”
            </p>
          </header>

          <div className="heritage-parents-grid">
            {/* Groom's Family Column */}
            <div className="heritage-family-col">
              <div className="family-badge groom">GROOM'S FAMILY</div>
              <h4 className="family-person-name">{groomFull}</h4>
              <div className="parents-line-box">
                <p className="parents-prefix">Proud Son of</p>
                <p className="parents-names">
                  {groomFather && groomMother ? (
                    <>
                      <strong>{groomFather}</strong>
                      <span className="parents-amp">&</span>
                      <strong>{groomMother}</strong>
                    </>
                  ) : (
                    <strong>{groomFather || groomMother}</strong>
                  )}
                </p>
              </div>
            </div>

            {/* Union Emblem */}
            <div className="heritage-union-emblem" aria-hidden="true">
              <div className="emblem-circle">
                <Heart size={16} fill="currentColor" />
              </div>
            </div>

            {/* Bride's Family Column */}
            <div className="heritage-family-col">
              <div className="family-badge bride">BRIDE'S FAMILY</div>
              <h4 className="family-person-name">{brideFull}</h4>
              <div className="parents-line-box">
                <p className="parents-prefix">Beloved Daughter of</p>
                <p className="parents-names">
                  {brideFather && brideMother ? (
                    <>
                      <strong>{brideFather}</strong>
                      <span className="parents-amp">&</span>
                      <strong>{brideMother}</strong>
                    </>
                  ) : (
                    <strong>{brideFather || brideMother}</strong>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Family Members (Grandparents, Elders, Siblings) */}
          {defaultAdditionalFamily.length > 0 && (
            <div className="heritage-elders-row">
              <span className="elders-label">
                <Users size={13} />
                Honored Family & Elders:
              </span>
              <div className="elders-chips">
                {defaultAdditionalFamily.map((member, idx) => (
                  <span key={idx} className="elder-chip">
                    <span className="elder-rel">{member.relationship}:</span>
                    <strong className="elder-name">{member.name}</strong>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. MULTI-EVENT CELEBRATIONS (If multiple events exist) */}
      {multipleEvents.length > 1 && (
        <div className="multi-events-section-card">
          <header className="multi-events-header">
            <span className="heritage-eyebrow">CELEBRATION TIMELINE</span>
            <h3 className="heritage-card-title">All Wedding Ceremonies</h3>
            <div className="heritage-divider-ornament">
              <span className="ornament-line" />
              <span className="ornament-glyph">❖</span>
              <span className="ornament-line" />
            </div>
          </header>

          <div className="multi-events-grid">
            {multipleEvents.map((ev, index) => {
              const eventMapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                ev.address || ev.venue || "Kollam, Kerala"
              )}`;
              return (
                <div key={ev.id || index} className="event-ceremony-card">
                  <div className="ceremony-top-row">
                    <span className="ceremony-num">0{index + 1}</span>
                    <h4 className="ceremony-name">{ev.name}</h4>
                  </div>
                  <div className="ceremony-details">
                    {ev.date && (
                      <div className="ceremony-detail-item">
                        <Calendar size={13} />
                        <span>{ev.date}</span>
                      </div>
                    )}
                    {ev.time && (
                      <div className="ceremony-detail-item">
                        <Clock size={13} />
                        <span>{ev.time}</span>
                      </div>
                    )}
                    {ev.venue && (
                      <div className="ceremony-detail-item">
                        <MapPin size={13} />
                        <span>{ev.venue}</span>
                      </div>
                    )}
                  </div>
                  {ev.address && <p className="ceremony-address">{ev.address}</p>}
                  <a
                    href={eventMapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="ceremony-map-btn"
                  >
                    <span>View Directions</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. CUSTOM FIELDS & CEREMONY DETAILS SECTION */}
      {defaultCustomFields.length > 0 && (
        <div className="custom-fields-section-card">
          <header className="custom-fields-header">
            <span className="heritage-eyebrow">
              <Info size={13} />
              ADDITIONAL CEREMONY DETAILS
            </span>
            <h3 className="heritage-card-title">Custom Specifications & Guidelines</h3>
            <div className="heritage-divider-ornament">
              <span className="ornament-line" />
              <span className="ornament-glyph">❖</span>
              <span className="ornament-line" />
            </div>
          </header>

          <div className="custom-fields-grid">
            {defaultCustomFields.map((field, idx) => {
              const isUrl =
                field.type === "link" ||
                (typeof field.value === "string" &&
                  (field.value.startsWith("http://") || field.value.startsWith("https://")));

              return (
                <div key={field.id || idx} className="custom-field-card">
                  <div className="custom-field-label-row">
                    <Tag size={13} className="custom-field-icon" />
                    <span className="custom-field-label">{field.label}</span>
                  </div>
                  <div className="custom-field-value">
                    {isUrl ? (
                      <a
                        href={field.value}
                        target="_blank"
                        rel="noreferrer"
                        className="custom-field-link"
                      >
                        <span>{field.value}</span>
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <p className="custom-field-text">{field.value}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
