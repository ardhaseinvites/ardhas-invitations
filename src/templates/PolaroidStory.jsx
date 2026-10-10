import { useState, useEffect, useRef } from "react";
import {
  Church,
  Wine,
  Utensils,
  Music2,
  Sparkles,
  Bed,
  Globe,
  Check,
  Play,
  Pause,
  X,
  Car,
  Shuffle,
  Repeat,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { parseYouTubeUrl } from "../utils/media.js";
import "../styles/pinterest-templates.css";

function PolaroidQrSvg() {
  return (
    <svg viewBox="0 0 100 100" fill="#2B2723" style={{ width: "100%", height: "100%" }}>
      <rect x="0" y="0" width="30" height="30" rx="2" />
      <rect x="5" y="5" width="20" height="20" rx="1" fill="#FFFFFF" />
      <rect x="9" y="9" width="12" height="12" fill="#2B2723" />

      <rect x="70" y="0" width="30" height="30" rx="2" />
      <rect x="75" y="5" width="20" height="20" rx="1" fill="#FFFFFF" />
      <rect x="79" y="9" width="12" height="12" fill="#2B2723" />

      <rect x="0" y="70" width="30" height="30" rx="2" />
      <rect x="5" y="75" width="20" height="20" rx="1" fill="#FFFFFF" />
      <rect x="9" y="79" width="12" height="12" fill="#2B2723" />

      <rect x="36" y="8" width="6" height="6" />
      <rect x="48" y="14" width="8" height="6" />
      <rect x="38" y="24" width="8" height="8" />
      <rect x="54" y="22" width="6" height="8" />

      <rect x="8" y="38" width="8" height="6" />
      <rect x="22" y="42" width="6" height="8" />
      <rect x="10" y="54" width="6" height="6" />

      <rect x="36" y="38" width="8" height="8" />
      <rect x="52" y="44" width="8" height="6" />
      <rect x="40" y="56" width="6" height="8" />
      <rect x="58" y="58" width="8" height="8" />

      <rect x="74" y="38" width="6" height="8" />
      <rect x="86" y="44" width="8" height="6" />
      <rect x="76" y="56" width="8" height="8" />

      <rect x="36" y="74" width="8" height="6" />
      <rect x="48" y="78" width="6" height="8" />
      <rect x="62" y="74" width="8" height="8" />
      <rect x="76" y="82" width="8" height="8" />
      <rect x="88" y="76" width="6" height="6" />
    </svg>
  );
}

export default function PolaroidStory({ config, compact = false }) {
  const [rsvpChoice, setRsvpChoice] = useState("accept");
  const [playingVideo, setPlayingVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [remaining, setRemaining] = useState({
    days: 246,
    hours: 11,
    minutes: 53,
    seconds: 6,
  });

  const audioContext = useRef(null);
  const audioTimer = useRef(null);

  // Countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const target = new Date(
        `${config.date || "2026-09-14"}T${config.time || "17:00"}:00+05:30`
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

  const heroPhoto =
    config.heroImage ||
    "https://images.unsplash.com/photo-1519741497674-611481863552";
  const yt = parseYouTubeUrl(heroPhoto);
  const heroSrc = yt.isYouTube ? yt.thumbnailUrl : heroPhoto;

  const polaroidPhotos = [
    config.gallery?.[0]?.src || "https://images.unsplash.com/photo-1529636798458-92182e662485",
    config.gallery?.[1]?.src || "https://images.unsplash.com/photo-1490750967868-88aa4486c946",
    config.gallery?.[2]?.src || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
    config.gallery?.[3]?.src || "https://images.unsplash.com/photo-1519689680058-324335c77eba",
  ];

  const mapLink =
    config.mapUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      config.address || config.venue || "Belmond El Encanto, Santa Barbara"
    )}`;

  return (
    <article className="pinterest-mobile-card polaroid-template">
      {/* 1. Hero Card */}
      <section className="polaroid-hero-block">
        <img src={heroSrc} alt={config.names} loading={compact ? "lazy" : "eager"} />
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
        <div className="polaroid-hero-content">
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 600, opacity: 0.9 }}>
              TOGETHER WITH THEIR FAMILIES
            </p>
            <h1 className="polaroid-names-title" style={{ marginTop: "12px" }}>
              {config.names?.split(/&|and/i)?.[0]?.trim() || "OLIVIA"}
              <span>and</span>
              {config.names?.split(/&|and/i)?.[1]?.trim() || "ETHAN"}
            </h1>
          </div>

          <div>
            <p style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", opacity: 0.9 }}>
              INVITE YOU TO CELEBRATE THEIR WEDDING
            </p>
            <p style={{ fontSize: "14px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 600, marginBottom: "4px" }}>
              SEP | 14 | 2026
            </p>
            <p style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", opacity: 0.85 }}>
              AT 5 O'CLOCK IN THE EVENING
            </p>
            <p style={{ fontFamily: "Italianno", fontSize: "32px", marginTop: "12px", lineHeight: 1 }}>
              Belmond El Encanto
            </p>
            <p style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", opacity: 0.8 }}>
              SANTA BARBARA, CALIFORNIA
            </p>
            <p style={{ fontStyle: "italic", fontSize: "13px", marginTop: "12px", opacity: 0.8 }}>
              reception to follow
            </p>
          </div>
        </div>
      </section>

      {/* Countdown & Romantic Music Card */}
      <section className="velure-music-card" style={{ margin: "20px 20px 0", background: "#fcf9f2" }}>
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
          <div style={{ textAlign: "center", minWidth: "40px" }}>
            <span style={{ fontSize: "24px", fontWeight: 600, display: "block", lineHeight: 1 }}>
              {remaining.days}
            </span>
            <span style={{ fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase", opacity: 0.7 }}>
              Days
            </span>
          </div>
          <span style={{ opacity: 0.4, fontSize: "18px" }}>:</span>
          <div style={{ textAlign: "center", minWidth: "40px" }}>
            <span style={{ fontSize: "24px", fontWeight: 600, display: "block", lineHeight: 1 }}>
              {remaining.hours}
            </span>
            <span style={{ fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase", opacity: 0.7 }}>
              Hours
            </span>
          </div>
          <span style={{ opacity: 0.4, fontSize: "18px" }}>:</span>
          <div style={{ textAlign: "center", minWidth: "40px" }}>
            <span style={{ fontSize: "24px", fontWeight: 600, display: "block", lineHeight: 1 }}>
              {remaining.minutes}
            </span>
            <span style={{ fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase", opacity: 0.7 }}>
              Mins
            </span>
          </div>
          <span style={{ opacity: 0.4, fontSize: "18px" }}>:</span>
          <div style={{ textAlign: "center", minWidth: "40px" }}>
            <span style={{ fontSize: "24px", fontWeight: 600, display: "block", lineHeight: 1 }}>
              {remaining.seconds}
            </span>
            <span style={{ fontSize: "9px", letterSpacing: "1px", textTransform: "uppercase", opacity: 0.7 }}>
              Secs
            </span>
          </div>
        </div>

        <p className="velure-music-track">Love Song Melody</p>

        <div className="velure-music-scrubber" onClick={togglePlaySong}>
          <div
            className="velure-music-fill"
            style={{ width: isPlaying ? "72%" : "20%", background: "#7C886E" }}
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
            style={{ background: "#7C886E", color: "#fff" }}
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
      </section>

      {!compact && (
        <>
          {/* 2. Our Story Polaroid Stack */}
          <section className="polaroid-story-section">
            <h3 className="polaroid-section-title">Our Story 𐀔</h3>

            <div className="polaroid-stack">
              <div className="polaroid-item">
                <div className="polaroid-frame">
                  <img src={polaroidPhotos[0]} alt="We met" />
                </div>
                <div className="polaroid-info">
                  <time>2018</time>
                  <h4>WE MET</h4>
                  <p>A chance meeting that changed everything.</p>
                </div>
              </div>

              <div className="polaroid-item">
                <div className="polaroid-frame">
                  <img src={polaroidPhotos[1]} alt="We fell in love" />
                </div>
                <div className="polaroid-info">
                  <time>2020</time>
                  <h4>WE FELL IN LOVE</h4>
                  <p>Adventures, laughter and countless memories.</p>
                </div>
              </div>

              <div className="polaroid-item">
                <div className="polaroid-frame">
                  <img src={polaroidPhotos[2]} alt="The proposal" />
                </div>
                <div className="polaroid-info">
                  <time>2023</time>
                  <h4>THE PROPOSAL</h4>
                  <p>The start of our forever together.</p>
                </div>
              </div>

              <div className="polaroid-item">
                <div className="polaroid-frame">
                  <img src={polaroidPhotos[3]} alt="We say I do" />
                </div>
                <div className="polaroid-info">
                  <time>2026</time>
                  <h4>WE SAY I DO</h4>
                  <p>We can't wait to celebrate with you!</p>
                </div>
              </div>
            </div>
          </section>

          {/* 3. The Details */}
          <section style={{ padding: "40px 24px 30px", borderTop: "1px solid #E6E0D4" }}>
            <p style={{ fontStyle: "italic", fontSize: "16px", color: "#7C886E", marginBottom: "2px" }}>the</p>
            <h3 style={{ fontSize: "20px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 600, color: "#2B2723", marginBottom: "28px" }}>
              DETAILS
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "22px", maxWidth: "300px", margin: "0 auto", textAlign: "left" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <Church size={24} color="#7C886E" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <h4 style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600 }}>
                    CEREMONY & RECEPTION
                  </h4>
                  <p style={{ fontSize: "12px", color: "#6A645D", marginTop: "2px" }}>
                    Belmond El Encanto<br />800 Alvarado Place, Santa Barbara, CA
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "22px", lineHeight: 1 }}>👗</span>
                <div>
                  <h4 style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600 }}>
                    ATTIRE
                  </h4>
                  <p style={{ fontSize: "12px", color: "#6A645D", marginTop: "2px" }}>
                    Formal Attire
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <Bed size={22} color="#7C886E" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <h4 style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600 }}>
                    ACCOMMODATIONS
                  </h4>
                  <p style={{ fontSize: "12px", color: "#6A645D", marginTop: "2px" }}>
                    A block of rooms has been reserved at nearby hotels.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <Globe size={22} color="#7C886E" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <h4 style={{ fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600 }}>
                    MORE INFORMATION
                  </h4>
                  <p style={{ fontSize: "12px", color: "#6A645D", marginTop: "2px" }}>
                    oliviaandethan.com
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. The Timeline */}
          <section style={{ padding: "40px 24px 30px", borderTop: "1px solid #E6E0D4" }}>
            <p style={{ fontStyle: "italic", fontSize: "16px", color: "#7C886E", marginBottom: "2px" }}>the</p>
            <h3 style={{ fontSize: "20px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 600, color: "#2B2723", marginBottom: "28px" }}>
              TIMELINE
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "22px", maxWidth: "260px", margin: "0 auto", textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Church size={22} color="#7C886E" />
                <div>
                  <time style={{ fontSize: "11px", letterSpacing: "1.5px", color: "#7C886E", fontWeight: 600 }}>5:00 PM</time>
                  <p style={{ fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>CEREMONY</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Wine size={22} color="#7C886E" />
                <div>
                  <time style={{ fontSize: "11px", letterSpacing: "1.5px", color: "#7C886E", fontWeight: 600 }}>5:30 PM</time>
                  <p style={{ fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>COCKTAIL HOUR</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Utensils size={22} color="#7C886E" />
                <div>
                  <time style={{ fontSize: "11px", letterSpacing: "1.5px", color: "#7C886E", fontWeight: 600 }}>7:00 PM</time>
                  <p style={{ fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>DINNER & TOASTS</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Music2 size={22} color="#7C886E" />
                <div>
                  <time style={{ fontSize: "11px", letterSpacing: "1.5px", color: "#7C886E", fontWeight: 600 }}>8:30 PM</time>
                  <p style={{ fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>DANCING</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Sparkles size={22} color="#7C886E" />
                <div>
                  <time style={{ fontSize: "11px", letterSpacing: "1.5px", color: "#7C886E", fontWeight: 600 }}>10:30 PM</time>
                  <p style={{ fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>SEND OFF</p>
                </div>
              </div>
            </div>
          </section>

          {/* Dress Code Swatches */}
          <section className="velure-dresscode-card" style={{ borderTop: "1px solid #E6E0D4" }}>
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
                color: "#7C886E",
                fontWeight: 600,
              }}
            >
              FORMAL ATTIRE
            </p>

            <div className="velure-palette-dots">
              <span className="velure-palette-circle" style={{ backgroundColor: "#F7F3EE" }} title="Ivory" />
              <span className="velure-palette-circle" style={{ backgroundColor: "#D9CDBE" }} title="Warm Sand" />
              <span className="velure-palette-circle" style={{ backgroundColor: "#7C886E" }} title="Sage Green" />
              <span className="velure-palette-circle" style={{ backgroundColor: "#47453F" }} title="Charcoal" />
              <span className="velure-palette-circle" style={{ backgroundColor: "#1C1B19" }} title="Classic Black" />
            </div>
          </section>

          {/* 5. Kindly RSVP with QR Code */}
          <section style={{ padding: "40px 24px 34px", borderTop: "1px solid #E6E0D4", background: "#F5F1E8" }}>
            <h3 style={{ fontFamily: "Italianno", fontSize: "44px", color: "#2B2723", lineHeight: 1, marginBottom: "4px" }}>
              Kindly RSVP
            </h3>
            <p style={{ fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: "#6A645D", fontWeight: 600, marginBottom: "24px" }}>
              KINDLY REPLY BY AUGUST 1, 2026
            </p>

            <div style={{ maxWidth: "280px", margin: "0 auto", textAlign: "left", marginBottom: "24px" }}>
              <div style={{ borderBottom: "1px solid #C4BCAC", paddingBottom: "4px", marginBottom: "16px" }}>
                <span style={{ fontSize: "13px", color: "#554F47", fontStyle: "italic" }}>M _______________________</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#454038", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="rsvp"
                    checked={rsvpChoice === "accept"}
                    onChange={() => setRsvpChoice("accept")}
                  />
                  <span>ACCEPTS WITH PLEASURE</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#454038", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="rsvp"
                    checked={rsvpChoice === "decline"}
                    onChange={() => setRsvpChoice("decline")}
                  />
                  <span>DECLINES WITH REGRET</span>
                </label>
              </div>
            </div>

            {/* QR Code */}
            <div style={{ width: "130px", height: "130px", margin: "16px auto", padding: "10px", background: "#fff", borderRadius: "8px", boxShadow: "0 4px 14px rgba(0,0,0,0.06)" }}>
              <PolaroidQrSvg />
            </div>
            <p style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#7C886E", fontWeight: 600 }}>
              PLEASE RSVP ON OUR WEBSITE
            </p>
            <p style={{ fontSize: "11px", color: "#4B463E", marginTop: "2px" }}>
              OLIVIAANDETHAN.COM
            </p>
          </section>

          {/* Recommendations Grid */}
          <section style={{ padding: "30px 20px", borderTop: "1px solid #E6E0D4", textAlign: "center" }}>
            <h4
              style={{
                fontSize: "12px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "#2B2723",
                marginBottom: "16px",
              }}
            >
              RECOMMENDATIONS
            </h4>

            <div className="velure-recs-grid">
              <div className="velure-rec-item">
                <Car size={24} className="velure-rec-icon" />
                <p className="velure-rec-text">
                  Valet parking is available. Please allow extra time for arrival.
                </p>
              </div>
              <div className="velure-rec-item">
                <span style={{ fontSize: "20px", marginTop: "2px" }}>👠</span>
                <p className="velure-rec-text">
                  Grass-friendly footwear recommended for the outdoor lawn ceremony.
                </p>
              </div>
              <div className="velure-rec-item">
                <Camera size={24} className="velure-rec-icon" />
                <p className="velure-rec-text">
                  Unplugged ceremony: please keep phones away until the reception!
                </p>
              </div>
            </div>
          </section>

          {/* 6. Closing Courtyard Photo */}
          <section style={{ padding: "34px 20px 48px", textAlign: "center" }}>
            <p style={{ fontSize: "12px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 600, color: "#3B362F" }}>
              WE CAN'T WAIT TO CELEBRATE
            </p>
            <p style={{ fontFamily: "Italianno", fontSize: "40px", color: "#7C886E", margin: "2px 0 16px" }}>
              with you!
            </p>

            <div style={{ borderRadius: "8px", overflow: "hidden", maxWidth: "340px", margin: "0 auto 16px" }}>
              <img src={polaroidPhotos[0]} alt="Olivia & Ethan" style={{ width: "100%", height: "300px", objectFit: "cover", display: "block" }} />
            </div>

            <p style={{ fontStyle: "italic", fontSize: "16px", color: "#554F47" }}>with love,</p>
            <p style={{ fontSize: "12px", letterSpacing: "2.5px", textTransform: "uppercase", color: "#2B2723", fontWeight: 600, marginTop: "2px" }}>
              {config.names || "OLIVIA & ETHAN"}
            </p>
          </section>
        </>
      )}
    </article>
  );
}
