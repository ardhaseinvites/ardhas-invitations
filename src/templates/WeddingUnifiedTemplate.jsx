import { useState, useRef, useEffect } from "react";
import {
  Church,
  Wine,
  Utensils,
  Music2,
  Cake,
  Car,
  Camera,
  Play,
  Pause,
  Shuffle,
  Repeat,
  SkipBack,
  SkipForward,
  Gift,
  Heart,
  ChevronDown,
  X,
  Check,
  PartyPopper,
  Sparkles,
} from "lucide-react";
import { parseYouTubeUrl } from "../utils/media.js";
import "../styles/pinterest-templates.css";

// Realistic QR code component for registry
function QrCodeSvg({ dark = false }) {
  const ink = dark ? "#FFFFFF" : "#2C2925";
  const bg = dark ? "#1E293B" : "#FFFFFF";
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" style={{ width: "100%", height: "100%" }}>
      {/* 3 Position Detection Patterns */}
      <rect x="0" y="0" width="30" height="30" rx="3" fill={ink} />
      <rect x="5" y="5" width="20" height="20" rx="2" fill={bg} />
      <rect x="9" y="9" width="12" height="12" rx="1" fill={ink} />

      <rect x="70" y="0" width="30" height="30" rx="3" fill={ink} />
      <rect x="75" y="5" width="20" height="20" rx="2" fill={bg} />
      <rect x="79" y="9" width="12" height="12" rx="1" fill={ink} />

      <rect x="0" y="70" width="30" height="30" rx="3" fill={ink} />
      <rect x="5" y="75" width="20" height="20" rx="2" fill={bg} />
      <rect x="9" y="79" width="12" height="12" rx="1" fill={ink} />

      {/* Decorative QR data modules */}
      <rect x="36" y="6" width="6" height="6" fill={ink} />
      <rect x="48" y="10" width="8" height="6" fill={ink} />
      <rect x="40" y="20" width="6" height="8" fill={ink} />
      <rect x="52" y="24" width="8" height="8" fill={ink} />

      <rect x="10" y="38" width="6" height="6" fill={ink} />
      <rect x="22" y="44" width="8" height="6" fill={ink} />
      <rect x="6" y="52" width="6" height="8" fill={ink} />

      <rect x="38" y="38" width="8" height="8" fill={ink} />
      <rect x="54" y="42" width="6" height="6" fill={ink} />
      <rect x="42" y="54" width="10" height="6" fill={ink} />
      <rect x="60" y="58" width="8" height="8" fill={ink} />

      <rect x="74" y="38" width="6" height="8" fill={ink} />
      <rect x="88" y="44" width="8" height="6" fill={ink} />
      <rect x="76" y="56" width="8" height="8" fill={ink} />

      <rect x="36" y="74" width="6" height="6" fill={ink} />
      <rect x="48" y="80" width="8" height="8" fill={ink} />
      <rect x="60" y="76" width="6" height="6" fill={ink} />
      <rect x="74" y="84" width="8" height="8" fill={ink} />
      <rect x="88" y="76" width="6" height="6" fill={ink} />
    </svg>
  );
}

export default function WeddingUnifiedTemplate({
  config,
  compact = false,
  themeClass = "velure-template",
  heroCrest,
  photoArchClass = "velure-arch-photo",
  primaryBtnClass = "velure-btn-outline",
  sprigIcon = "𐀔",
  quoteText,
  ceremonyTitle = "CEREMONIA / CEREMONY",
  receptionTitle = "RECEPCIÓN / RECEPTION",
  itineraryTitle = "CRONOGRAMA / ITINERARY",
  dressCodeTitle = "FORMAL ELEGANCE",
  dressCodeSwatches,
  registryTitle = "NUESTRO MEJOR REGALO",
  registryText,
  isDarkTheme = false,
  signoffHeader = "¡GRACIAS!",
  signoffSub = "POR SER PARTE DE NUESTRO COMIENZO",
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(false);
  const [remaining, setRemaining] = useState({
    days: 246,
    hours: 11,
    minutes: 53,
    seconds: 6,
  });

  const audioContext = useRef(null);
  const audioTimer = useRef(null);

  const heroPhoto =
    config.heroImage ||
    "https://images.unsplash.com/photo-1519741497674-611481863552";
  const yt = parseYouTubeUrl(heroPhoto);
  const heroSrc = yt.isYouTube ? yt.thumbnailUrl : heroPhoto;

  const gallery1 =
    config.gallery?.[0]?.src ||
    "https://images.unsplash.com/photo-1529636798458-92182e662485";
  const gallery2 =
    config.gallery?.[1]?.src ||
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946";

  const rawNames = config.names || "Aarav & Diya";
  const nameParts = rawNames.split(/&|and|\+/i);
  const name1 = nameParts[0]?.trim() || "Aarav";
  const name2 = nameParts[1]?.trim() || "Diya";
  const initial1 = name1.charAt(0).toUpperCase() || "A";
  const initial2 = name2.charAt(0).toUpperCase() || "D";

  const eventDate = new Date(`${config.date || "2027-02-22"}T12:00:00`);
  const day = !Number.isNaN(eventDate.getTime())
    ? String(eventDate.getDate()).padStart(2, "0")
    : "22";
  const monthName = !Number.isNaN(eventDate.getTime())
    ? eventDate
        .toLocaleString("en-US", { month: "long" })
        .toUpperCase()
    : "FEBRUARY";
  const year = !Number.isNaN(eventDate.getTime())
    ? eventDate.getFullYear()
    : "2027";

  // Countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const target = new Date(
        `${config.date || "2027-02-22"}T${config.time || "10:00"}:00+05:30`
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

  // Web Audio romantic melody synthesis
  const togglePlaySong = () => {
    if (isPlaying) {
      clearInterval(audioTimer.current);
      audioContext.current?.close();
      audioContext.current = null;
      setIsPlaying(false);
      return;
    }

    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    const ctx = new Audio();
    audioContext.current = ctx;
    const chords = [261.63, 329.63, 392.0, 440.0, 392.0, 329.63];
    let step = 0;

    const playNote = () => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = chords[step++ % chords.length];
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.3);
    };

    ctx.resume();
    playNote();
    audioTimer.current = setInterval(playNote, 700);
    setIsPlaying(true);
  };

  useEffect(() => {
    return () => {
      clearInterval(audioTimer.current);
      audioContext.current?.close();
    };
  }, []);

  const mapLink =
    config.mapUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      config.address || config.venue || "Kollam, Kerala"
    )}`;

  const whatsappRsvp = `https://wa.me/919048503717?text=${encodeURIComponent(
    `Hello! Joyfully confirming our attendance for the wedding celebration of ${rawNames}.`
  )}`;

  const defaultSwatches = [
    { color: "#F7F3EE", title: "Ivory Silk" },
    { color: "#D9CDBE", title: "Warm Sand" },
    { color: config.color || "#8D7045", title: "Theme Accent" },
    { color: "#47453F", title: "Charcoal" },
    { color: "#1C1B19", title: "Classic Ink" },
  ];
  const activeSwatches = dressCodeSwatches || defaultSwatches;

  return (
    <article className={`pinterest-mobile-card ${themeClass}`}>
      {/* 1. Hero & Welcome Section */}
      <section className="velure-hero-section">
        {heroCrest || (
          <div className="velure-monogram-oval" aria-label="Monogram crest">
            <span className="velure-monogram-text">
              {initial1}
              <br />
              {initial2}
            </span>
          </div>
        )}

        <p className="velure-hero-eyebrow">
          {config.copy?.heroEyebrow || "TOGETHER WITH OUR FAMILIES"}
        </p>

        <div className="velure-hero-names">
          <span className="velure-name-line">{name1}</span>
          <span className="velure-and-script">&</span>
          <span className="velure-name-line">{name2}</span>
        </div>

        <div className="velure-date-strip">
          <span>{day}</span>
          <span>·</span>
          <span>{monthName}</span>
          <span>·</span>
          <span>{year}</span>
        </div>

        <div style={{ color: config.color || "#706f54", fontSize: "14px", margin: "10px 0 18px" }}>
          {sprigIcon}
        </div>

        {/* Thematic Hero Arch / Frame Photo */}
        <div className={photoArchClass} style={{ position: "relative" }}>
          <img
            src={heroSrc}
            alt={rawNames}
            loading={compact ? "lazy" : "eager"}
          />
          {yt.isYouTube && (
            <button
              type="button"
              className="pinterest-video-play-overlay"
              onClick={() => setPlayingVideo(true)}
              aria-label="Play welcome video"
              title="Watch welcome video"
            >
              <Play size={22} fill="currentColor" />
            </button>
          )}
        </div>

        {/* Video Player Modal */}
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
                title="Welcome Film"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        <p className="velure-quote-text">
          {quoteText ||
            config.copy?.invitationLine ||
            "Joyfully invite you to celebrate our wedding"}
        </p>
        <div style={{ color: config.color || "#706f54", fontSize: "14px" }}>{sprigIcon}</div>

        {/* 2. Interactive Countdown & Romantic Music Card */}
        <div className={`velure-music-card ${isDarkTheme ? "celestial-card-dark" : ""}`} style={{ marginTop: "24px" }}>
          <p className="velure-music-header">COUNTDOWN TO OUR FOREVER</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "14px",
              margin: "12px 0 16px",
              fontFamily: "Cormorant Garamond, Georgia, serif",
            }}
          >
            <div style={{ textAlign: "center", minWidth: "42px" }}>
              <span style={{ fontSize: "24px", fontWeight: 600, display: "block", lineHeight: 1 }}>
                {remaining.days}
              </span>
              <span style={{ fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase", opacity: 0.7 }}>
                Days
              </span>
            </div>
            <span style={{ opacity: 0.4, fontSize: "18px" }}>:</span>
            <div style={{ textAlign: "center", minWidth: "42px" }}>
              <span style={{ fontSize: "24px", fontWeight: 600, display: "block", lineHeight: 1 }}>
                {remaining.hours}
              </span>
              <span style={{ fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase", opacity: 0.7 }}>
                Hours
              </span>
            </div>
            <span style={{ opacity: 0.4, fontSize: "18px" }}>:</span>
            <div style={{ textAlign: "center", minWidth: "42px" }}>
              <span style={{ fontSize: "24px", fontWeight: 600, display: "block", lineHeight: 1 }}>
                {remaining.minutes}
              </span>
              <span style={{ fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase", opacity: 0.7 }}>
                Mins
              </span>
            </div>
            <span style={{ opacity: 0.4, fontSize: "18px" }}>:</span>
            <div style={{ textAlign: "center", minWidth: "42px" }}>
              <span style={{ fontSize: "24px", fontWeight: 600, display: "block", lineHeight: 1 }}>
                {remaining.seconds}
              </span>
              <span style={{ fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase", opacity: 0.7 }}>
                Secs
              </span>
            </div>
          </div>

          <p className="velure-music-track" style={{ marginTop: "8px" }}>
            Instrumental Celebration Melody
          </p>

          <div className="velure-music-scrubber" onClick={togglePlaySong}>
            <div
              className="velure-music-fill"
              style={{ width: isPlaying ? "72%" : "18%", background: config.color || "var(--pm-accent)" }}
            />
          </div>

          <div className="velure-music-controls">
            <button type="button" className="velure-music-btn" aria-label="Shuffle">
              <Shuffle size={14} />
            </button>
            <button type="button" className="velure-music-btn" aria-label="Previous">
              <SkipBack size={15} />
            </button>
            <button
              type="button"
              className="velure-music-btn play-circle"
              onClick={togglePlaySong}
              aria-label={isPlaying ? "Pause music" : "Play music"}
              style={{ background: config.color || "var(--pm-accent)", color: "#fff" }}
            >
              {isPlaying ? <Pause size={17} /> : <Play size={17} fill="currentColor" />}
            </button>
            <button type="button" className="velure-music-btn" aria-label="Next">
              <SkipForward size={15} />
            </button>
            <button type="button" className="velure-music-btn" aria-label="Repeat">
              <Repeat size={14} />
            </button>
          </div>
        </div>

        <ChevronDown size={18} color="#8c826e" style={{ margin: "14px auto 8px" }} />
      </section>

      {!compact && (
        <>
          {/* 3. Ceremony & Reception Event Cards */}
          <section className={`velure-details-card ${isDarkTheme ? "celestial-card-dark" : ""}`}>
            <div className="velure-detail-box">
              <Church size={34} color={config.color || "#706f54"} strokeWidth={1.3} style={{ margin: "0 auto" }} />
              <h3 className="velure-detail-title">{ceremonyTitle}</h3>
              <p className="velure-detail-time">— {config.time || "10:00 AM"} —</p>
              <p style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>
                {config.venue || "THE WEDDING VENUE"}
              </p>
              <p style={{ fontSize: "12px", opacity: 0.8, marginTop: "2px" }}>
                {config.address || "Kollam, Kerala"}
              </p>
              <a
                href={mapLink}
                target="_blank"
                rel="noreferrer"
                className={primaryBtnClass}
              >
                VIEW DIRECTIONS
              </a>
            </div>

            <div style={{ color: config.color || "#706f54", fontSize: "14px", margin: "20px 0" }}>
              {sprigIcon}
            </div>

            <div className="velure-detail-box">
              <Wine size={34} color={config.color || "#706f54"} strokeWidth={1.3} style={{ margin: "0 auto" }} />
              <h3 className="velure-detail-title">{receptionTitle}</h3>
              <p className="velure-detail-time">— 18:30 —</p>
              <p style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>
                EVENING RECEPTION & DINNER
              </p>
              <p style={{ fontSize: "12px", opacity: 0.8, marginTop: "2px" }}>
                {config.address || "Kollam, Kerala"}
              </p>
              <a
                href={mapLink}
                target="_blank"
                rel="noreferrer"
                className={primaryBtnClass}
              >
                VIEW DIRECTIONS
              </a>
            </div>
          </section>

          {/* 4. Inter-Section Photo with Thematic Frame */}
          <section style={{ width: "100%", height: "360px", overflow: "hidden", position: "relative" }}>
            <img
              src={gallery1}
              alt="Couple celebration"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              loading="lazy"
            />
          </section>

          {/* 5. Wedding Day Itinerary Timeline */}
          <section className={`velure-details-card ${isDarkTheme ? "celestial-card-dark" : ""}`}>
            <h3
              style={{
                fontSize: "13px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "26px",
              }}
            >
              {itineraryTitle}
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "22px",
                maxWidth: "280px",
                margin: "0 auto",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Church size={22} color={config.color || "#706f54"} strokeWidth={1.4} />
                <div>
                  <time style={{ fontSize: "10px", letterSpacing: "1.5px", opacity: 0.7, display: "block" }}>
                    09:30 AM
                  </time>
                  <span style={{ fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>
                    WARM WELCOME & ARRIVAL
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Sparkles size={22} color={config.color || "#706f54"} strokeWidth={1.4} />
                <div>
                  <time style={{ fontSize: "10px", letterSpacing: "1.5px", opacity: 0.7, display: "block" }}>
                    10:00 AM
                  </time>
                  <span style={{ fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>
                    THE WEDDING CEREMONY
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Utensils size={22} color={config.color || "#706f54"} strokeWidth={1.4} />
                <div>
                  <time style={{ fontSize: "10px", letterSpacing: "1.5px", opacity: 0.7, display: "block" }}>
                    12:30 PM
                  </time>
                  <span style={{ fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>
                    TRADITIONAL FEAST & LUNCH
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Wine size={22} color={config.color || "#706f54"} strokeWidth={1.4} />
                <div>
                  <time style={{ fontSize: "10px", letterSpacing: "1.5px", opacity: 0.7, display: "block" }}>
                    06:30 PM
                  </time>
                  <span style={{ fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>
                    RECEPTION & TOAST
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <PartyPopper size={22} color={config.color || "#706f54"} strokeWidth={1.4} />
                <div>
                  <time style={{ fontSize: "10px", letterSpacing: "1.5px", opacity: 0.7, display: "block" }}>
                    08:30 PM
                  </time>
                  <span style={{ fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>
                    MUSIC, DANCING & CELEBRATION
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Dress Code Swatches */}
          <section className={`velure-dresscode-card ${isDarkTheme ? "celestial-card-dark" : ""}`}>
            <h4
              style={{
                fontSize: "12px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "4px",
              }}
            >
              DRESS CODE
            </h4>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: config.color || "var(--pm-accent)",
                fontWeight: 600,
              }}
            >
              {config.dressCode || dressCodeTitle}
            </p>

            <div className="velure-palette-dots">
              {activeSwatches.map((item, idx) => (
                <span
                  key={idx}
                  className="velure-palette-circle"
                  style={{ backgroundColor: item.color }}
                  title={item.title}
                />
              ))}
            </div>
          </section>

          {/* 7. Gift Registry with QR Code */}
          <section className={`velure-registry-box ${isDarkTheme ? "celestial-card-dark" : ""}`}>
            <Gift
              size={28}
              color={config.color || "#706f54"}
              strokeWidth={1.4}
              style={{ margin: "0 auto 8px" }}
            />
            <h4
              style={{
                fontSize: "12px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              {registryTitle}
            </h4>
            <p
              style={{
                fontSize: "12px",
                opacity: 0.8,
                lineHeight: 1.5,
                maxWidth: "280px",
                margin: "0 auto 16px",
              }}
            >
              {registryText ||
                "Your presence and blessings are our greatest gifts. For those wishing to share a token of love, our registry is available."}
            </p>
            <div className="velure-qr-card">
              <QrCodeSvg dark={isDarkTheme} />
            </div>
          </section>

          {/* 8. RSVP Confirmation */}
          <section
            className={`velure-details-card ${isDarkTheme ? "celestial-card-dark" : ""}`}
            style={{ paddingBottom: "40px" }}
          >
            <h4
              style={{
                fontSize: "13px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              CONFIRMATION & RSVP
            </h4>
            <p style={{ fontSize: "12px", opacity: 0.8, marginBottom: "16px" }}>
              Kindly confirm your attendance to help us prepare for your presence.
            </p>
            <a
              href={whatsappRsvp}
              target="_blank"
              rel="noreferrer"
              className={primaryBtnClass}
              style={{
                background: config.color || "var(--pm-accent)",
                color: "#fff",
                borderColor: config.color || "var(--pm-accent)",
              }}
            >
              CONFIRM ATTENDANCE VIA WHATSAPP
            </a>

            <div style={{ color: config.color || "#706f54", fontSize: "14px", margin: "26px 0" }}>
              {sprigIcon}
            </div>

            {/* 9. Recommendations, Closing Photo & Love Sign-off */}
            <h4
              style={{
                fontSize: "12px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "16px",
              }}
            >
              HELPFUL RECOMMENDATIONS
            </h4>

            <div className="velure-recs-grid">
              <div className="velure-rec-item">
                <Car size={24} className="velure-rec-icon" />
                <p className="velure-rec-text">
                  Valet parking is available at the entrance. Plan arrival 15 mins prior.
                </p>
              </div>
              <div className="velure-rec-item">
                <span style={{ fontSize: "20px", marginTop: "2px" }}>✨</span>
                <p className="velure-rec-text">
                  Festive comfort attire recommended for courtyard mandap ceremonies.
                </p>
              </div>
              <div className="velure-rec-item">
                <Camera size={24} className="velure-rec-icon" />
                <p className="velure-rec-text">
                  Celebrate each moment with us. Professional photos will be shared with all guests!
                </p>
              </div>
            </div>

            <p
              style={{
                fontStyle: "italic",
                fontSize: "15px",
                opacity: 0.85,
                margin: "26px auto 14px",
                maxWidth: "280px",
              }}
            >
              ❝ Two souls, one heart, beginning forever. ❞
            </p>
            <div style={{ color: config.color || "#706f54", fontSize: "14px", margin: "10px 0 20px" }}>
              {sprigIcon}
            </div>

            <h4
              style={{
                fontSize: "13px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "4px",
              }}
            >
              {signoffHeader}
            </h4>
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                opacity: 0.7,
                fontWeight: 600,
              }}
            >
              {signoffSub}
            </p>
            <Heart
              size={16}
              fill={config.color || "var(--pm-accent)"}
              color={config.color || "var(--pm-accent)"}
              style={{ margin: "8px auto 24px" }}
            />

            {/* Closing Photo */}
            <div
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                maxWidth: "340px",
                margin: "0 auto 16px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
              }}
            >
              <img
                src={gallery2}
                alt={rawNames}
                style={{
                  width: "100%",
                  height: "260px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            <p
              style={{
                fontSize: "11px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              {rawNames}
            </p>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "2px",
                opacity: 0.7,
                marginTop: "4px",
              }}
            >
              {day} . {monthName.slice(0, 3)} . {year}
            </p>
            <p
              style={{
                fontSize: "9px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                opacity: 0.5,
                marginTop: "32px",
              }}
            >
              ARDHAS DIGITAL INVITATIONS
            </p>
          </section>
        </>
      )}
    </article>
  );
}
