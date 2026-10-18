import { useState } from "react";
import {
  Sparkles,
  Moon,
  MapPin,
  Clock,
  Send,
  ArrowUpRight,
  Compass,
  Star,
  Check,
} from "lucide-react";
import { parseYouTubeUrl } from "../utils/media.js";

export default function NocturneCelestial({ config, compact = false }) {
  const [guestCount, setGuestCount] = useState(2);
  const [attending, setAttending] = useState(true);
  const [lanternWish, setLanternWish] = useState("");
  const [releasedLanterns, setReleasedLanterns] = useState([
    { id: 1, wish: "May your love shine as brightly as the northern star." },
  ]);

  const rawNames = config.names || "Aarav & Diya";
  const names = rawNames.split(/&|and|\+/i);
  const name1 = names[0]?.trim() || "Aarav";
  const name2 = names[1]?.trim() || "Diya";

  const heroImage =
    config.heroImage ||
    "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=85";
  const ytData = parseYouTubeUrl(heroImage);

  const handleReleaseLantern = (e) => {
    e.preventDefault();
    if (!lanternWish.trim()) return;
    setReleasedLanterns((prev) => [
      { id: Date.now(), wish: lanternWish.trim() },
      ...prev,
    ]);
    setLanternWish("");
  };

  const handleRsvp = (e) => {
    e.preventDefault();
    const phone = config.contactPhone || "+91 9048503717";
    const cleanPhone = phone.replace(/[^\d]/g, "");
    const msg = encodeURIComponent(
      `✨ Starlight RSVP for ${config.names}'s celebration.\nAttending: ${attending ? "Yes, counting down!" : "Regretfully Unable"}\nGuests: ${guestCount}\nSee you under the stars!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, "_blank");
  };

  return (
    <article className="pinterest-mobile-card nocturne-card">
      {/* 1. Starlit Celestial Header & Moon Phase */}
      <header className="nocturne-header">
        <div className="nocturne-constellation-badge">
          <Moon size={14} className="nocturne-moon-icon" />
          <span>FULL MOON SOIRÉE · ASTRONOMICAL CELEBRATION</span>
        </div>

        <h1 className="nocturne-title">WRITTEN IN THE STARS</h1>

        <div className="nocturne-names-cluster">
          <span className="nocturne-name-primary">{name1}</span>
          <span className="nocturne-celestial-glyph">✦ ✦ ✦</span>
          <span className="nocturne-name-secondary">{name2}</span>
        </div>

        <p className="nocturne-dateline">
          {config.date || "OCTOBER 24, 2026"} · {config.venue || "KOLLAM, KERALA"}
        </p>

        {/* 3D Pop-Up Diorama Hero Frame */}
        <div className="nocturne-diorama-frame">
          <div className="nocturne-stardust-particles" aria-hidden="true">
            <span className="star-dot s1" />
            <span className="star-dot s2" />
            <span className="star-dot s3" />
            <span className="star-dot s4" />
          </div>

          <div className="nocturne-photo-cutout">
            {ytData.isYouTube ? (
              <div className="nocturne-yt-wrap">
                <iframe
                  src={`https://www.youtube.com/embed/${ytData.videoId}?autoplay=1&mute=1&loop=1&playlist=${ytData.videoId}`}
                  title="Hero Celestial Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={heroImage}
                alt={config.names}
                className="nocturne-hero-img"
                loading="eager"
              />
            )}
          </div>

          <div className="nocturne-arch-bracket" />
        </div>
      </header>

      {/* 2. Celestial Prologue / Starlight Story */}
      <section className="nocturne-prologue">
        <span className="nocturne-kicker">THE CONSTELLATION</span>
        <blockquote className="nocturne-quote">
          “{config.story ||
            "Under an infinite sky, two paths crossed and aligned. Join us beneath the stars as we exchange vows and celebrate the dawn of our forever."}”
        </blockquote>
      </section>

      {/* 3. Constellation Venue Pathfinding */}
      <section className="nocturne-constellation-section">
        <span className="nocturne-kicker">CELESTIAL NAVIGATION</span>
        <h2 className="nocturne-section-heading">Constellation Guide</h2>

        <div className="nocturne-stops-grid">
          {(config.schedule && config.schedule.length > 0
            ? config.schedule
            : [
                { time: "17:30", title: "Twilight Gathering & Arrival" },
                { time: "18:15", title: "Sunset Vows & Exchange of Rings" },
                { time: "20:00", title: "Starlit Gala Banquet & Cocktails" },
              ]
          ).map((item, idx) => {
            const time = Array.isArray(item) ? item[0] : (item.time || "");
            const title = Array.isArray(item) ? item[1] : (item.title || item.label || "");
            return (
              <div key={idx} className="nocturne-stop-node">
                <div className="nocturne-star-marker">
                  <Star size={12} fill="#e0a996" color="#e0a996" />
                  <span className="nocturne-node-time">{time}</span>
                </div>
                <div className="nocturne-node-content">
                  <h3>{title}</h3>
                  <p>
                    {idx === 0
                      ? "Welcome aperitifs as the sun dips below the horizon."
                      : idx === 1
                        ? "Sacred promises bathed in golden twilight."
                        : "Gastronomy, dancing, and midnight toasts."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Astronomical Venue Destination */}
      <section className="nocturne-venue-section">
        <span className="nocturne-kicker">OBSERVATORY</span>
        <h2 className="nocturne-section-heading">{config.venue || "The Starlight Amphitheater"}</h2>
        <p className="nocturne-venue-coords">
          {config.address || "Kollam, Kerala · Starlight Terrace"}
        </p>

        {!compact ? (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              config.address || config.venue || "Kollam, Kerala"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="nocturne-map-link"
          >
            <Compass size={14} />
            <span>CHART ROUTE IN GOOGLE MAPS</span>
            <ArrowUpRight size={14} />
          </a>
        ) : (
          <span className="nocturne-map-link">
            <Compass size={14} />
            <span>CHART ROUTE</span>
          </span>
        )}
      </section>

      {/* 5. Starlight Dress Code */}
      <section className="nocturne-dress-section">
        <span className="nocturne-kicker">ATTIRE PALETTE</span>
        <h2 className="nocturne-section-heading">Midnight Twilight & Rose Gold</h2>
        <p className="nocturne-dress-guide">
          {config.dress || "Black-tie elegance, celestial midnight tones, and metallic shimmer."}
        </p>

        <div className="nocturne-palette-circles">
          {[
            { hex: "#0B1021", label: "Midnight Cosmic" },
            { hex: "#161F38", label: "Twilight Slate" },
            { hex: "#E0A996", label: "Rose Gold Foil" },
            { hex: "#F4F0EA", label: "Pearl Alabaster" },
          ].map((item) => (
            <div key={item.label} className="nocturne-palette-cell">
              <span
                className="nocturne-swatch-dot"
                style={{ backgroundColor: item.hex }}
              />
              <span className="nocturne-swatch-txt">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Interactive Floating Sky Lantern Blessings */}
      <section className="nocturne-lanterns-section">
        <div className="nocturne-lantern-header">
          <Sparkles size={16} color="#e0a996" />
          <h2 className="nocturne-section-heading">Release a Sky Lantern</h2>
          <p>Send your blessing to drift softly through our midnight sky.</p>
        </div>

        <form onSubmit={handleReleaseLantern} className="nocturne-lantern-form">
          <input
            type="text"
            value={lanternWish}
            onChange={(e) => setLanternWish(e.target.value)}
            placeholder="Write a starlight blessing for the couple..."
          />
          <button type="submit">
            <Send size={14} />
            <span>Release Lantern 🏮</span>
          </button>
        </form>

        <div className="nocturne-lantern-sky">
          {releasedLanterns.map((l) => (
            <div key={l.id} className="nocturne-lantern-item">
              <span className="lantern-glow">🏮</span>
              <p>“{l.wish}”</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Celestial RSVP Confirmation */}
      <section className="nocturne-rsvp-section">
        <div className="nocturne-rsvp-card">
          <h3 className="nocturne-rsvp-head">Confirm Your Attendance</h3>
          <p className="nocturne-rsvp-sub">Join us under the starlit sky</p>

          <form onSubmit={handleRsvp} className="nocturne-rsvp-controls">
            <div className="nocturne-decision-row">
              <button
                type="button"
                className={attending ? "active" : ""}
                onClick={() => setAttending(true)}
              >
                {attending && <Check size={13} />} ACCEPT WITH DELIGHT
              </button>
              <button
                type="button"
                className={!attending ? "active" : ""}
                onClick={() => setAttending(false)}
              >
                {!attending && <Check size={13} />} REGRETFULLY UNABLE
              </button>
            </div>

            {attending && (
              <div className="nocturne-counter-box">
                <label>GUEST COUNT</label>
                <div className="nocturne-counter-btns">
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

            <button type="submit" className="nocturne-rsvp-submit">
              <Send size={14} />
              <span>SEND RSVP VIA WHATSAPP</span>
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="nocturne-footer">
        <p className="nocturne-signoff">WITH ETERNAL GRATITUDE</p>
        <p className="nocturne-signoff-names">{rawNames}</p>
        <small className="nocturne-brand-tag">
          ARDHAS CELESTIAL EDITIONS · 2026
        </small>
      </footer>
    </article>
  );
}
