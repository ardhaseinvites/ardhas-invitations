import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowUpRight,
  Send,
  Heart,
  Camera,
  Check,
} from "lucide-react";
import { parseYouTubeUrl } from "../utils/media.js";

export default function EditionNoire({ config, compact = false }) {
  const [guestCount, setGuestCount] = useState(2);
  const [attending, setAttending] = useState(true);
  const [rsvpSent, setRsvpSent] = useState(false);
  const [guestNote, setGuestNote] = useState("");

  const rawNames = config.names || "Aarav & Diya";
  const nameParts = rawNames.split(/&|and|\+/i);
  const name1 = nameParts[0]?.trim() || "Aarav";
  const name2 = nameParts[1]?.trim() || "Diya";

  const heroImage =
    config.heroImage ||
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85";
  const ytData = parseYouTubeUrl(heroImage);

  const gallery =
    config.gallery && config.gallery.length > 0
      ? config.gallery
      : [
          {
            url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
            caption: "Act I · The Vows",
          },
          {
            url: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=800&q=80",
            caption: "Act II · The Feast",
          },
          {
            url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=80",
            caption: "Act III · The Soirée",
          },
        ];

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    const phone = config.contactPhone || "+91 9048503717";
    const cleanPhone = phone.replace(/[^\d]/g, "");
    const message = encodeURIComponent(
      `Hello! RSVP for ${config.names}'s celebration.\nAttending: ${attending ? "Yes" : "Regretfully No"}\nGuests: ${guestCount}\nMessage: ${guestNote || "Looking forward to celebrating!"}`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank");
    setRsvpSent(true);
  };

  return (
    <article className="pinterest-mobile-card edition-noire-card">
      {/* 1. Haute-Couture Magazine Masthead Header */}
      <header className="edition-masthead">
        <div className="edition-issue-bar">
          <span>VOL. XXIV · SPECIAL WEDDING ISSUE</span>
          <span>EST. 2026 · PRIVATE EDITION</span>
        </div>

        <h1 className="edition-title">THE WEDDING EDIT</h1>

        <div className="edition-rule-double" />

        {/* Hero Photo with Editorial Framing */}
        <div className="edition-hero-frame">
          {ytData.isYouTube ? (
            <div className="edition-yt-wrap">
              <iframe
                src={`https://www.youtube.com/embed/${ytData.videoId}?autoplay=1&mute=1&loop=1&playlist=${ytData.videoId}`}
                title="Hero Wedding Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <img
              src={heroImage}
              alt={config.names}
              className="edition-hero-image"
              loading="eager"
            />
          )}

          <div className="edition-hero-overlay">
            <div className="edition-names-block">
              <span className="edition-name-lead">{name1}</span>
              <span className="edition-amp">&</span>
              <span className="edition-name-follow">{name2}</span>
            </div>
            <p className="edition-sub-dateline">
              {config.date || "OCTOBER 24, 2026"} · {config.venue || "KOLLAM, KERALA"}
            </p>
          </div>
        </div>

        <div className="edition-byline">
          <span>CURATED BY ARDHAS</span>
          <span>•</span>
          <span>BLACK TIE & HAUTE COUTURE</span>
        </div>
      </header>

      {/* 2. Editorial Pull-Quote / Love Story */}
      <section className="edition-prologue-section">
        <span className="edition-section-kicker">PROLOGUE</span>
        <blockquote className="edition-pull-quote">
          “{config.story ||
            "Two lives woven into a single narrative. We invite you to witness the beginning of our forever, framed in love and unforgettable elegance."}”
        </blockquote>
        <div className="edition-foil-pinline" />
      </section>

      {/* 3. Program of Events: Three Acts */}
      <section className="edition-acts-section">
        <span className="edition-section-kicker">THE ITINERARY</span>
        <h2 className="edition-section-title">Program in Three Acts</h2>

        <div className="edition-acts-grid">
          {(config.schedule && config.schedule.length > 0
            ? config.schedule
            : [
                { time: "10:00", title: "Act I · The Sacred Vows & Muhurtham" },
                { time: "13:00", title: "Act II · The Grand Luncheon & Toast" },
                { time: "19:30", title: "Act III · Haute Soirée & Afterparty" },
              ]
          ).map((item, idx) => {
            const time = Array.isArray(item) ? item[0] : (item.time || "");
            const title = Array.isArray(item) ? item[1] : (item.title || item.label || "");
            return (
              <div key={idx} className="edition-act-card">
                <div className="edition-act-time">
                  <Clock size={13} />
                  <span>{time}</span>
                </div>
                <h3 className="edition-act-title">{title}</h3>
                <p className="edition-act-desc">
                  {idx === 0
                    ? "Ceremony of union and eternal promises."
                    : idx === 1
                      ? "Curated gastronomy, family blessings and toasts."
                      : "Music, signature cocktails and revelry under the stars."}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Exhibition Venue & Coordinates */}
      <section className="edition-venue-section">
        <span className="edition-section-kicker">DESTINATION</span>
        <h2 className="edition-section-title">{config.venue || "The Leela Palace"}</h2>
        <p className="edition-venue-address">
          {config.address || "Kollam, Kerala · Pin: 9.0478° N, 76.6007° E"}
        </p>

        {!compact ? (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              config.address || config.venue || "Kollam, Kerala"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="edition-map-btn"
          >
            <MapPin size={13} />
            <span>VIEW VENUE ON GOOGLE MAPS</span>
            <ArrowUpRight size={13} />
          </a>
        ) : (
          <span className="edition-map-btn">
            <MapPin size={13} />
            <span>GOOGLE MAPS</span>
          </span>
        )}
      </section>

      {/* 5. Haute Gallery: Exhibition Moments */}
      <section className="edition-gallery-section">
        <span className="edition-section-kicker">EDITORIAL MOMENTS</span>
        <h2 className="edition-section-title">The Curated Gallery</h2>

        <div className="edition-gallery-asym">
          {gallery.map((item, idx) => (
            <div key={idx} className={`edition-photo-plate plate-${idx % 3}`}>
              <img
                src={item.url || item}
                alt={item.caption || `Moment ${idx + 1}`}
                loading="lazy"
              />
              <span className="edition-photo-caption">
                {item.caption || `EXHIBIT ${String(idx + 1).padStart(2, "0")}`}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Dress Code: Monochrome & Brushed Gold */}
      <section className="edition-dress-section">
        <span className="edition-section-kicker">AESTHETIC GUIDELINES</span>
        <h2 className="edition-section-title">Black Tie & Liquid Gold</h2>
        <p className="edition-dress-note">
          {config.dress || "Formal evening attire, black tie, and liquid gold accents."}
        </p>

        <div className="edition-palette-pills">
          {[
            { color: "#1C1D1F", label: "Smoked Basalt" },
            { color: "#C2A265", label: "Brushed Brass" },
            { color: "#EEEBE3", label: "Travertine" },
            { color: "#8E7D63", label: "Raw Linen" },
          ].map((c) => (
            <div key={c.label} className="edition-palette-item">
              <span
                className="edition-color-circle"
                style={{ backgroundColor: c.color }}
              />
              <span className="edition-color-label">{c.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. VIP Access Pass / RSVP */}
      <section className="edition-rsvp-section">
        <div className="edition-rsvp-ticket">
          <div className="edition-ticket-header">
            <span>VIP GUEST ADMISSION PASS</span>
            <Sparkles size={14} color="#c2a265" />
          </div>

          <h3 className="edition-ticket-title">Kindly Confirm Attendance</h3>

          <form onSubmit={handleRsvpSubmit} className="edition-rsvp-form">
            <div className="edition-toggle-row">
              <button
                type="button"
                className={`edition-toggle-btn ${attending ? "active" : ""}`}
                onClick={() => setAttending(true)}
              >
                {attending && <Check size={13} />} ACCEPT WITH PLEASURE
              </button>
              <button
                type="button"
                className={`edition-toggle-btn ${!attending ? "active" : ""}`}
                onClick={() => setAttending(false)}
              >
                {!attending && <Check size={13} />} REGRETFULLY DECLINE
              </button>
            </div>

            {attending && (
              <div className="edition-counter-group">
                <label>NUMBER OF ATTENDING GUESTS</label>
                <div className="edition-counter-controls">
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                  >
                    –
                  </button>
                  <span>{guestCount}</span>
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.min(8, guestCount + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="edition-input-group">
              <label>WARM NOTE OR DIETARY PREFERENCES</label>
              <input
                type="text"
                value={guestNote}
                onChange={(e) => setGuestNote(e.target.value)}
                placeholder="Can't wait to toast with you..."
              />
            </div>

            <button type="submit" className="edition-submit-btn">
              <Send size={14} />
              <span>TRANSMIT RSVP VIA WHATSAPP</span>
            </button>
          </form>

          {rsvpSent && (
            <p className="edition-rsvp-status">
              ✨ Opening WhatsApp to confirm your RSVP!
            </p>
          )}
        </div>
      </section>

      {/* Sign-off footer */}
      <footer className="edition-footer">
        <p className="edition-signoff">WITH ALL OUR LOVE</p>
        <p className="edition-signoff-names">{rawNames}</p>
        <small className="edition-colophon">
          ARDHAS DIGITAL COUTURE · ALL RIGHTS RESERVED
        </small>
      </footer>
    </article>
  );
}
