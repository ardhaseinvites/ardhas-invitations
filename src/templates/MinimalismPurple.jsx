import { useState, useEffect } from "react";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Check,
  Play,
  X,
  ExternalLink,
} from "lucide-react";
import { parseYouTubeUrl } from "../utils/media.js";
import "../styles/minimalism-purple.css";

// Decorative SVG Petals for Ambient Falling Animation
function AmbientPetal({ left, delay, duration, size }) {
  return (
    <div
      className="mp-petal"
      style={{
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        fontSize: `${size}px`,
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
        <ellipse cx="12" cy="6" rx="2.4" ry="5" />
        <ellipse cx="12" cy="6" rx="2.4" ry="5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="6" rx="2.4" ry="5" transform="rotate(120 12 12)" />
        <ellipse cx="12" cy="6" rx="2.4" ry="5" transform="rotate(180 12 12)" />
        <ellipse cx="12" cy="6" rx="2.4" ry="5" transform="rotate(240 12 12)" />
        <ellipse cx="12" cy="6" rx="2.4" ry="5" transform="rotate(300 12 12)" />
        <circle cx="12" cy="12" r="2" fillOpacity="0.4" />
      </svg>
    </div>
  );
}

export default function MinimalismPurple({ config, compact = false }) {
  const [isOpen, setIsOpen] = useState(compact);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(false);
  const [rsvpDone, setRsvpDone] = useState(false);

  // If in compact preview mode, show directly as opened
  useEffect(() => {
    if (compact) setIsOpen(true);
  }, [compact]);

  const rawNames = config.names || "Thomas & Beatrice";
  const namesParts = rawNames.split(/&|and|\+/i);
  const groomName = namesParts[0]?.trim() || "Thomas";
  const brideName = namesParts[1]?.trim() || "Beatrice";

  const heroPhoto =
    config.heroImage ||
    "https://images.unsplash.com/photo-1519741497674-611481863552";
  const yt = parseYouTubeUrl(heroPhoto);
  const heroSrc = yt.isYouTube ? yt.thumbnailUrl : heroPhoto;

  const galleryList = (config.gallery && config.gallery.length > 0)
    ? config.gallery.map((item) => item.src)
    : [
        "https://images.unsplash.com/photo-1529636798458-92182e662485",
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
        "https://images.unsplash.com/photo-1519689680058-324335c77eba",
      ];

  const dateObj = new Date(config.date || "2027-08-08");
  const dayNum = String(dateObj.getDate() || 8).padStart(2, "0");
  const monthName = dateObj.toLocaleString("en-US", { month: "long" }).toUpperCase() || "AUGUST";
  const yearNum = dateObj.getFullYear() || 2027;
  const weekdayName = dateObj.toLocaleString("en-US", { weekday: "long" }).toUpperCase() || "SUNDAY";

  // Google Calendar link
  const calTitle = encodeURIComponent(`${rawNames}'s Wedding`);
  const calLocation = encodeURIComponent(config.address || config.venue || "Tresanton Hotel, Cornwall, England");
  const googleCalUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&location=${calLocation}&details=Wedding+Celebration`;

  return (
    <article className="mp-template">
      {/* ====================================================================
          1. ENVELOPE OPENING LANDING (If not yet opened)
          ==================================================================== */}
      {!isOpen && !compact ? (
        <section className="mp-envelope-overlay" aria-label="Wedding Envelope">
          {/* Ambient Falling Petals */}
          <AmbientPetal left={12} delay={0} duration={12} size={16} />
          <AmbientPetal left={34} delay={3} duration={15} size={14} />
          <AmbientPetal left={62} delay={1.5} duration={13} size={18} />
          <AmbientPetal left={82} delay={4.5} duration={16} size={15} />

          <div className="mp-envelope-card">
            {/* Pulsing Gold Heart Wax Seal */}
            <button
              type="button"
              className="mp-wax-seal"
              onClick={() => setIsOpen(true)}
              aria-label="Open invitation wax seal"
              title="Click to break the wax seal and open"
            >
              <Heart size={26} fill="#ffffff" color="#ffffff" />
            </button>

            <h2 className="mp-envelope-names">
              <span>{groomName}</span>
              <span className="mp-amp">&amp;</span>
              <span>{brideName}</span>
            </h2>

            <div className="mp-divider-glyph" aria-hidden="true">
              <span>❦</span>
            </div>

            <p className="mp-envelope-date">
              {monthName} {parseInt(dayNum, 10)}, {yearNum}
            </p>

            <p className="mp-envelope-sub">
              Cordially Invites You
            </p>

            <button
              type="button"
              className="mp-open-btn"
              onClick={() => setIsOpen(true)}
            >
              Open Invitation
            </button>
          </div>
        </section>
      ) : (
        /* ====================================================================
            2. MAIN OPENED INVITATION CONTENT
            ==================================================================== */
        <div className="mp-main-card">
          <div className="mp-paper-texture" aria-hidden="true" />

          {/* Header & Envelope-Tucked Photo */}
          <header className="mp-header-section">
            <p className="mp-save-the-date">SAVE THE DATE</p>

            {/* 3D Envelope Pocket with Floating Tilted Photo */}
            <div className="mp-envelope-pocket-wrap">
              <div className="mp-envelope-back" />
              <div className="mp-tucked-photo">
                <img src={heroSrc} alt={rawNames} loading={compact ? "lazy" : "eager"} />
                {yt.isYouTube && (
                  <button
                    type="button"
                    className="pinterest-video-play-overlay"
                    onClick={() => setPlayingVideo(true)}
                    aria-label="Play welcome video"
                    title="Watch welcome film"
                  >
                    <Play size={22} fill="currentColor" />
                  </button>
                )}
              </div>
              {/* Botanical Spray SVG Accent */}
              <div className="mp-botanical-accent" aria-hidden="true">
                <svg viewBox="0 0 100 100" fill="none">
                  <path
                    d="M10,80 Q40,40 80,20 Q60,50 30,75 Z"
                    fill="#7869a0"
                    opacity="0.35"
                  />
                  <circle cx="75" cy="25" r="8" fill="#9a8cc0" opacity="0.6" />
                  <circle cx="60" cy="40" r="6" fill="#7869a0" opacity="0.5" />
                  <circle cx="45" cy="55" r="5" fill="#574a78" opacity="0.6" />
                </svg>
              </div>
              <div className="mp-envelope-front" />
            </div>

            {/* Couple Hero Names with Giant Calligraphy & */}
            <div className="mp-hero-names-wrap">
              <span className="mp-giant-amp" aria-hidden="true">&amp;</span>
              <h1 className="mp-hero-name">{groomName}</h1>
              <h1 className="mp-hero-name">{brideName}</h1>
            </div>
          </header>

          {/* YouTube Video Modal Player */}
          {playingVideo && yt.isYouTube && (
            <div className="pinterest-video-modal" onClick={() => setPlayingVideo(false)}>
              <div className="pinterest-video-modal-content" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="pinterest-video-close-btn"
                  onClick={() => setPlayingVideo(false)}
                >
                  <X size={18} /> Close
                </button>
                <iframe
                  src={`${yt.embedUrl}?autoplay=1`}
                  title="Wedding Film"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {!compact && (
            <>
              {/* 3. Ceremony Info Card */}
              <section className="mp-purple-card">
                <h3 className="mp-card-title">CEREMONY INFO</h3>

                {/* Parents Section */}
                <div className="mp-parents-grid">
                  <div className="mp-parent-col">
                    <span className="mp-parent-role">Groom's Family</span>
                    <span className="mp-parent-name">
                      {config.groomFatherName && config.groomMotherName
                        ? `${config.groomFatherName} & ${config.groomMotherName}`
                        : config.groomFatherName || config.groomMotherName || `${groomName}'s Parents`}
                    </span>
                  </div>
                  <div className="mp-parents-vsep" aria-hidden="true" />
                  <div className="mp-parent-col">
                    <span className="mp-parent-role">Bride's Family</span>
                    <span className="mp-parent-name">
                      {config.brideFatherName && config.brideMotherName
                        ? `${config.brideFatherName} & ${config.brideMotherName}`
                        : config.brideFatherName || config.brideMotherName || `${brideName}'s Parents`}
                    </span>
                  </div>
                </div>

                <p className="mp-announcement-quote">
                  "With great joy we invite you to share this special day with us."
                </p>

                {/* Ceremony Event */}
                <div className="mp-event-subcard">
                  <h4 className="mp-event-venue-name">
                    {config.venue || "St. Enodoc Church"}
                  </h4>
                  <p className="mp-event-address">
                    {config.address || "Cornwall, England"}
                  </p>
                  <div className="mp-date-row">
                    <span className="mp-big-day">{dayNum}</span>
                    <div className="mp-date-sep" />
                    <div className="mp-date-month-year">
                      <span className="mp-date-month">{monthName}</span>
                      <span className="mp-date-year">{yearNum} · {config.time || "19:00"}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. Photo Gallery (Carousel Cards) */}
              <section className="mp-gallery-section">
                <h3
                  style={{
                    fontFamily: "Times New Roman, serif",
                    fontSize: "18px",
                    letterSpacing: "2.5px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: "12px",
                  }}
                >
                  PHOTO GALLERY
                </h3>

                <div className="mp-gallery-card-frame">
                  <img
                    src={galleryList[galleryIdx]}
                    alt={`Photo ${galleryIdx + 1}`}
                  />
                </div>

                <div className="mp-gallery-nav-row">
                  <button
                    type="button"
                    className="mp-gallery-arrow-btn"
                    onClick={() =>
                      setGalleryIdx((prev) => (prev > 0 ? prev - 1 : galleryList.length - 1))
                    }
                    aria-label="Previous photograph"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="mp-gallery-counter">
                    {galleryIdx + 1} / {galleryList.length}
                  </span>
                  <button
                    type="button"
                    className="mp-gallery-arrow-btn"
                    onClick={() =>
                      setGalleryIdx((prev) => (prev < galleryList.length - 1 ? prev + 1 : 0))
                    }
                    aria-label="Next photograph"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </section>

              {/* 5. Reception Info & Mini Calendar Card */}
              <section className="mp-purple-card">
                <h3 className="mp-card-title">RECEPTION INFO</h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", marginBottom: "8px" }}>
                  The reception will take place at:
                </p>
                <p style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>
                  {config.venue || "Tresanton Hotel"}
                </p>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginBottom: "16px" }}>
                  {weekdayName} · {config.time || "20:30"}
                </p>

                {/* White Interactive Month Calendar Box with Heart Badge */}
                <div className="mp-calendar-box">
                  <div className="mp-calendar-header">
                    {monthName.charAt(0) + monthName.slice(1).toLowerCase()} {yearNum}
                  </div>
                  <div className="mp-calendar-days-row">
                    <span>Mo</span>
                    <span>Tu</span>
                    <span>We</span>
                    <span>Th</span>
                    <span>Fr</span>
                    <span>Sa</span>
                    <span>Su</span>
                  </div>
                  <div className="mp-calendar-grid">
                    {/* Dummy padding days for illustration */}
                    <div className="mp-calendar-cell" />
                    <div className="mp-calendar-cell" />
                    <div className="mp-calendar-cell" />
                    <div className="mp-calendar-cell" />
                    <div className="mp-calendar-cell" />
                    <div className="mp-calendar-cell" />
                    <div className="mp-calendar-cell">1</div>
                    <div className="mp-calendar-cell">2</div>
                    <div className="mp-calendar-cell">3</div>
                    <div className="mp-calendar-cell">4</div>
                    <div className="mp-calendar-cell">5</div>
                    <div className="mp-calendar-cell">6</div>
                    <div className="mp-calendar-cell">7</div>
                    {/* Highlighted Heart Wedding Day */}
                    <div className="mp-calendar-cell">
                      <div className="mp-calendar-active-heart">
                        <svg viewBox="0 0 24 24" className="mp-calendar-heart-svg">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span className="mp-calendar-active-num">{parseInt(dayNum, 10)}</span>
                      </div>
                    </div>
                    <div className="mp-calendar-cell">9</div>
                    <div className="mp-calendar-cell">10</div>
                    <div className="mp-calendar-cell">11</div>
                    <div className="mp-calendar-cell">12</div>
                    <div className="mp-calendar-cell">13</div>
                    <div className="mp-calendar-cell">14</div>
                    <div className="mp-calendar-cell">15</div>
                  </div>
                </div>

                <a
                  href={googleCalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mp-add-cal-link"
                >
                  <Calendar size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
                  Add to Google Calendar
                </a>
              </section>

              {/* 6. RSVP Attendance Button */}
              <section className="mp-rsvp-section">
                <button
                  type="button"
                  className="mp-rsvp-confirm-btn"
                  onClick={() => setRsvpDone(true)}
                >
                  {rsvpDone ? <><Check size={14} style={{ display: "inline", marginRight: "6px" }} /> Attendance Confirmed</> : "Confirm Attendance"}
                </button>
              </section>

              {/* 7. Dress Code Section */}
              <section className="mp-dresscode-section">
                <h3
                  style={{
                    fontFamily: "Times New Roman, serif",
                    fontSize: "18px",
                    letterSpacing: "2.5px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  DRESS CODE
                </h3>
                <p style={{ fontSize: "13px", color: "var(--mp-sand)", marginTop: "4px" }}>
                  {config.dressCode || "Party & Festive Attire"}
                </p>
                <div className="mp-swatches-row">
                  <span className="mp-swatch-circle" style={{ backgroundColor: "#432b14" }} title="Espresso" />
                  <span className="mp-swatch-circle" style={{ backgroundColor: "#6b533c" }} title="Mocha" />
                  <span className="mp-swatch-circle" style={{ backgroundColor: "#e3cbb4" }} title="Linen Cream" />
                  <span className="mp-swatch-circle" style={{ backgroundColor: "#7869a0" }} title="Lavender" />
                </div>
              </section>

              {/* 8. Wedding Day Schedule Timeline */}
              <section className="mp-purple-card" style={{ marginBottom: "16px" }}>
                <h3 className="mp-card-title">WEDDING DAY SCHEDULE</h3>
                <div className="mp-schedule-list">
                  <div className="mp-schedule-line" aria-hidden="true" />
                  {(config.schedule && config.schedule.length > 0 ? config.schedule : [
                    { time: "18:30", title: "Guests arrive and seated" },
                    { time: "19:00", title: "Processional and vows" },
                    { time: "19:45", title: "Photographs & confetti" },
                    { time: "20:30", title: "Cocktail hour & reception" },
                    { time: "21:30", title: "Wedding dinner served" },
                    { time: "23:00", title: "First dance & party" },
                  ]).map((item, idx) => (
                    <div key={idx} className="mp-schedule-row">
                      <span className="mp-schedule-time">{item.time}</span>
                      <span className="mp-schedule-dot" />
                      <span className="mp-schedule-title">{item.title}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 9. Venue Directions Link */}
              <div style={{ textAlign: "center", padding: "10px 20px 20px" }}>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.address || config.venue || "Tresanton Hotel, Cornwall, England")}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "var(--mp-purple)",
                    fontSize: "13px",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  <MapPin size={16} />
                  <span>Get Directions to Venue</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </article>
  );
}
