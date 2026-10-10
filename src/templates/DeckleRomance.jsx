import { useState, useEffect } from "react";
import {
  Church,
  Wine,
  Utensils,
  PartyPopper,
  Home,
  Instagram,
  Music,
  ExternalLink,
  Check,
  Play,
  X,
} from "lucide-react";
import { parseYouTubeUrl } from "../utils/media.js";
import "../styles/pinterest-templates.css";

// Realistic Torn Paper Edge SVG path
function TornDeckleEdge({ isTop = false }) {
  return (
    <div className={`deckle-torn-edge ${isTop ? "top" : ""}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0 L0,20 Q25,32 50,18 T100,24 T150,15 T200,28 T250,16 T300,25 T350,14 T400,29 T450,17 T500,26 T550,13 T600,28 T650,15 T700,27 T750,14 T800,28 T850,16 T900,26 T950,13 T1000,27 T1050,15 T1100,28 T1150,17 L1200,22 L1200,40 L0,40 Z"
          fill="#FAF7F2"
        />
        <path
          d="M0,20 Q25,32 50,18 T100,24 T150,15 T200,28 T250,16 T300,25 T350,14 T400,29 T450,17 T500,26 T550,13 T600,28 T650,15 T700,27 T750,14 T800,28 T850,16 T900,26 T950,13 T1000,27 T1050,15 T1100,28 T1150,17 L1200,22"
          fill="none"
          stroke="#E6DFD2"
          strokeWidth="1.5"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

export default function DeckleRomance({ config, compact = false }) {
  const [copied, setCopied] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(false);
  const [remaining, setRemaining] = useState({
    days: 246,
    hours: 11,
    minutes: 53,
    seconds: 6,
  });

  const photo = config.heroImage || "https://images.unsplash.com/photo-1519741497674-611481863552";
  const yt = parseYouTubeUrl(photo);
  const heroSrc = yt.isYouTube ? yt.thumbnailUrl : photo;

  const gallery1 =
    config.gallery?.[0]?.src ||
    "https://images.unsplash.com/photo-1529636798458-92182e662485";
  const gallery2 =
    config.gallery?.[1]?.src ||
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946";

  const eventDate = new Date(`${config.date || "2025-11-29"}T12:00:00`);
  const dateFormatted = !Number.isNaN(eventDate.getTime())
    ? `${String(eventDate.getDate()).padStart(2, "0")}.${String(eventDate.getMonth() + 1).padStart(2, "0")}.${eventDate.getFullYear()}`
    : "29.11.2025";

  // Countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const target = new Date(
        `${config.date || "2025-11-29"}T${config.time || "16:00"}:00+05:30`
      ).getTime();
      if (!Number.isFinite(target)) return;
      const diff = Math.max(0, Math.floor((target - Date.now()) / 1000));
      setRemaining({
        days: Math.floor(diff / 86400),
        hours: Math.floor((diff % 86400) / 3600),
        minutes: Math.floor((diff % 3600) / 60),
        seconds: diff % 60,
      });
    };
    updateCountdown();
    if (compact) return;
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [config.date, config.time, compact]);

  const hashtag = `#${(config.names || "Lucia & Juan").replace(/[^a-zA-Z]/g, "")}`;

  const copyHashtag = () => {
    navigator.clipboard?.writeText(hashtag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const mapLink =
    config.mapUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      config.address || config.venue || "Santa María Chapel, Ronda"
    )}`;

  return (
    <article className="pinterest-mobile-card deckle-template">
      {/* 1. Hero Section with Deckle Bottom Edge */}
      <section className="deckle-hero">
        <img
          src={heroSrc}
          alt={config.names}
          className="deckle-hero-img"
          loading={compact ? "lazy" : "eager"}
        />
        <div className="deckle-hero-overlay">
          <p className="deckle-hero-eyebrow">WE'RE GETTING MARRIED</p>
          <h1 className="deckle-hero-names">{config.names || "Lucia & Juan"}</h1>
          <p className="deckle-hero-date">{dateFormatted}</p>
          <div className="deckle-hero-sprig" aria-hidden="true">
            𐀔 𐀔 𐀔
          </div>
          {yt.isYouTube && !compact && !playingVideo && (
            <button
              type="button"
              className="deckle-pill-btn"
              style={{ marginTop: "16px", background: "rgba(0,0,0,0.65)" }}
              onClick={() => setPlayingVideo(true)}
            >
              <Play size={14} fill="currentColor" /> Watch Welcome Film
            </button>
          )}
        </div>

        {/* Video Player Modal */}
        {playingVideo && yt.isYouTube && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#000",
              zIndex: 10,
            }}
          >
            <iframe
              src={yt.embedUrl}
              title="Welcome Film"
              style={{ width: "100%", height: "100%", border: 0 }}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            <button
              type="button"
              onClick={() => setPlayingVideo(false)}
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                background: "rgba(0,0,0,0.8)",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              <X size={14} /> Close
            </button>
          </div>
        )}

        <TornDeckleEdge />
      </section>

      {/* 2. Countdown Section */}
      <section className="deckle-countdown-section">
        <p className="deckle-countdown-label">FALTAN / COUNTDOWN</p>
        <div className="deckle-countdown-grid">
          <div className="deckle-countdown-col">
            <span className="deckle-countdown-num">{remaining.days}</span>
            <span className="deckle-countdown-unit">Days</span>
          </div>
          <div className="deckle-countdown-sep" />
          <div className="deckle-countdown-col">
            <span className="deckle-countdown-num">{remaining.hours}</span>
            <span className="deckle-countdown-unit">Hours</span>
          </div>
          <div className="deckle-countdown-sep" />
          <div className="deckle-countdown-col">
            <span className="deckle-countdown-num">{remaining.minutes}</span>
            <span className="deckle-countdown-unit">Minutes</span>
          </div>
          <div className="deckle-countdown-sep" />
          <div className="deckle-countdown-col">
            <span className="deckle-countdown-num">{remaining.seconds}</span>
            <span className="deckle-countdown-unit">Seconds</span>
          </div>
        </div>
        <div className="deckle-ornament-sprig">𐀔</div>
      </section>

      {/* 3. Ceremony & Reception Cards */}
      <section className="deckle-card-section">
        <div className="deckle-event-card">
          <div className="deckle-event-icon">
            <Church size={38} strokeWidth={1.2} />
          </div>
          <h3 className="deckle-event-title">Ceremony</h3>
          <p className="deckle-event-time">— {config.time || "16:00"} —</p>
          <p className="deckle-event-venue">
            {config.venue || "SANTA MARÍA CHAPEL"}
          </p>
          <p className="deckle-event-address">
            {config.address || "Ronda, Málaga"}
          </p>
          <a
            href={mapLink}
            target="_blank"
            rel="noreferrer"
            className="deckle-pill-btn"
          >
            VIEW DETAILS
          </a>
        </div>

        <div className="deckle-divider-line" />

        <div className="deckle-event-card">
          <div className="deckle-event-icon">
            <Wine size={38} strokeWidth={1.2} />
          </div>
          <h3 className="deckle-event-title">Reception</h3>
          <p className="deckle-event-time">— 18:30 —</p>
          <p className="deckle-event-venue">FINCA LA CONCEPCIÓN</p>
          <p className="deckle-event-address">Marbella, Málaga</p>
          <a
            href={mapLink}
            target="_blank"
            rel="noreferrer"
            className="deckle-pill-btn"
          >
            VIEW DETAILS
          </a>
        </div>
      </section>

      {!compact && (
        <>
          {/* 4. Inter-Section Photo with Torn Deckle Edges */}
          <section className="deckle-photo-block">
            <TornDeckleEdge isTop />
            <img src={gallery1} alt="Lucia & Juan memories" loading="lazy" />
            <TornDeckleEdge />
          </section>

          {/* 5. Itinerary Timeline */}
          <section className="deckle-timeline-section">
            <header className="deckle-timeline-heading">
              <p className="deckle-script-brand">AreOne</p>
              <h3 className="deckle-timeline-title">𐀔 THE WEDDING DAY 𐀔</h3>
            </header>

            <div className="deckle-timeline-list">
              <div className="deckle-timeline-line" />

              <div className="deckle-timeline-item">
                <span className="deckle-timeline-dot" />
                <div className="deckle-timeline-icon">
                  <Home size={22} strokeWidth={1.4} />
                </div>
                <div className="deckle-timeline-content">
                  <time>15:00</time>
                  <span>Location arrival</span>
                </div>
              </div>

              <div className="deckle-timeline-item">
                <span className="deckle-timeline-dot" />
                <div className="deckle-timeline-icon">
                  <Church size={22} strokeWidth={1.4} />
                </div>
                <div className="deckle-timeline-content">
                  <time>16:00</time>
                  <span>Ceremony</span>
                </div>
              </div>

              <div className="deckle-timeline-item">
                <span className="deckle-timeline-dot" />
                <div className="deckle-timeline-icon">
                  <Wine size={22} strokeWidth={1.4} />
                </div>
                <div className="deckle-timeline-content">
                  <time>17:00</time>
                  <span>Toast</span>
                </div>
              </div>

              <div className="deckle-timeline-item">
                <span className="deckle-timeline-dot" />
                <div className="deckle-timeline-icon">
                  <Utensils size={22} strokeWidth={1.4} />
                </div>
                <div className="deckle-timeline-content">
                  <time>18:30</time>
                  <span>Dinner</span>
                </div>
              </div>

              <div className="deckle-timeline-item">
                <span className="deckle-timeline-dot" />
                <div className="deckle-timeline-icon">
                  <PartyPopper size={22} strokeWidth={1.4} />
                </div>
                <div className="deckle-timeline-content">
                  <time>21:00</time>
                  <span>Party</span>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Inter-Section Photo */}
          <section className="deckle-photo-block">
            <TornDeckleEdge isTop />
            <img src={gallery2} alt="Couple celebration" loading="lazy" />
            <TornDeckleEdge />
          </section>

          {/* 7. Instagram Share Section */}
          <section className="deckle-instagram-block">
            <Instagram size={32} strokeWidth={1.4} />
            <h4 className="deckle-block-title">SHARE THE LOVE</h4>
            <p className="deckle-block-sub">
              Help us capture our special day by sharing your photos and
              stories.
            </p>
            <button
              type="button"
              className="deckle-pill-btn"
              onClick={copyHashtag}
              title="Click to copy hashtag"
            >
              {copied ? <Check size={14} /> : null}
              {copied ? "COPIED TO CLIPBOARD" : hashtag}
            </button>
          </section>

          {/* 8. Spotify Wedding Playlist Section */}
          <section className="deckle-playlist-block">
            <Music size={32} strokeWidth={1.4} color="#6F7558" />
            <h4 className="deckle-block-title">OUR WEDDING PLAYLIST</h4>
            <p className="deckle-block-sub">
              Add a song to get us dancing all night long!
            </p>
            <a
              href="https://spotify.com"
              target="_blank"
              rel="noreferrer"
              className="deckle-pill-btn"
            >
              ADD A SONG
            </a>
            <p
              className="deckle-script-brand"
              style={{ marginTop: "32px", fontSize: "28px" }}
            >
              AreOne 𐀔
            </p>
          </section>
        </>
      )}
    </article>
  );
}
