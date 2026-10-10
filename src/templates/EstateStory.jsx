import { useState, useEffect, useRef } from "react";
import {
  Heart,
  Phone,
  Mail,
  Minus,
  Plus,
  Check,
  Play,
  Pause,
  X,
  Car,
  Camera,
  Shuffle,
  Repeat,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { parseYouTubeUrl } from "../utils/media.js";
import "../styles/pinterest-templates.css";

export default function EstateStory({ config, compact = false }) {
  const [guestsCount, setGuestsCount] = useState(1);
  const [transport, setTransport] = useState("No");
  const [submitted, setSubmitted] = useState(false);
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
        `${config.date || "2026-05-24"}T${config.time || "11:00"}:00+05:30`
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

  const galleryPhoto =
    config.gallery?.[0]?.src ||
    "https://images.unsplash.com/photo-1529636798458-92182e662485";

  const mapLink =
    config.mapUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      config.address || config.venue || "Maplewood Estate, Greenfield, NY"
    )}`;

  return (
    <article className="pinterest-mobile-card estate-template">
      {/* 1. Hero & Love Letter Card */}
      <section className="estate-hero-section">
        <h1 className="estate-script-names">{config.names || "Jason & Melani"}</h1>
        <p style={{ fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: "#6A645D", fontWeight: 600, marginBottom: "16px" }}>
          WEDDING INVITATION
        </p>

        <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden", maxWidth: "340px", margin: "0 auto 20px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
          <img src={heroSrc} alt={config.names} style={{ width: "100%", height: "360px", objectFit: "cover", display: "block" }} loading={compact ? "lazy" : "eager"} />
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

        <p style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#857E74", fontWeight: 600, marginBottom: "8px" }}>
          WEDDING DAY
        </p>

        {/* Boxed Date */}
        <div style={{ display: "inline-block", padding: "10px 24px", border: "1px solid #D6CEBE", borderRadius: "4px", margin: "0 auto 16px" }}>
          <p style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#857E74" }}>date</p>
          <p style={{ fontSize: "18px", fontWeight: 600, color: "#2B2724", margin: "2px 0" }}>24 May</p>
          <p style={{ fontSize: "12px", color: "#6A645D" }}>{config.time || "11:00"}</p>
        </div>

        {/* Heart Line Drawing */}
        <div style={{ margin: "10px auto 16px", color: "#857E74" }}>
          <Heart size={20} color="#857E74" style={{ margin: "0 auto" }} />
        </div>

        {/* Love Letter Note */}
        <div style={{ maxWidth: "320px", margin: "0 auto 24px", textAlign: "center" }}>
          <h3 style={{ fontStyle: "italic", fontSize: "18px", color: "#3B362F", marginBottom: "8px" }}>
            DEAR FAMILY AND FRIENDS!
          </h3>
          <p style={{ fontSize: "12px", color: "#6A645D", lineHeight: 1.6 }}>
            We are so happy to invite you to share this meaningful day with us. Your presence will make our wedding even more special.
          </p>
          <p style={{ fontFamily: "Italianno", fontSize: "28px", color: "#2B2724", marginTop: "10px" }}>
            With love, {config.names || "Jason & Melani"}
          </p>
        </div>

        {/* Calendar Strip */}
        <div style={{ padding: "16px 20px", background: "#F2EDE4", borderRadius: "8px", maxWidth: "340px", margin: "0 auto 24px" }}>
          <p style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, color: "#544E45", marginBottom: "8px" }}>
            MAY 2026
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px", fontSize: "10px", color: "#6A645D" }}>
            <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
            <span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span>
            <span style={{ background: "#4A3B32", color: "#fff", borderRadius: "50%", padding: "2px 0", fontWeight: 700 }}>24</span>
          </div>
        </div>

        {/* Countdown & Romantic Music Card */}
        <div className="velure-music-card" style={{ margin: "0 auto 24px", maxWidth: "340px", background: "#F5F0E6" }}>
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

          <p className="velure-music-track">Acoustic Romance</p>

          <div className="velure-music-scrubber" onClick={togglePlaySong}>
            <div
              className="velure-music-fill"
              style={{ width: isPlaying ? "72%" : "20%", background: "#4A3B32" }}
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
              style={{ background: "#4A3B32", color: "#fff" }}
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

        {/* Wavy S-Timeline Route */}
        <div className="estate-wavy-timeline">
          <svg viewBox="0 0 240 320" style={{ position: "absolute", top: "10px", left: "20px", width: "200px", height: "300px", pointerEvents: "none" }}>
            <path
              d="M 100 10 Q 140 50 80 80 T 130 150 T 70 220 T 110 280"
              fill="none"
              stroke="#A89E8D"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
          </svg>

          <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: "28px", textAlign: "left", paddingLeft: "30px" }}>
            <div>
              <time style={{ fontSize: "11px", fontWeight: 700, color: "#4A3B32" }}>11:00</time>
              <p style={{ fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", color: "#6A645D" }}>GUEST ARRIVAL</p>
            </div>
            <div style={{ alignSelf: "flex-end", textAlign: "right", paddingRight: "20px" }}>
              <time style={{ fontSize: "11px", fontWeight: 700, color: "#4A3B32" }}>13:00</time>
              <p style={{ fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", color: "#6A645D" }}>LUNCH</p>
            </div>
            <div>
              <time style={{ fontSize: "11px", fontWeight: 700, color: "#4A3B32" }}>15:00</time>
              <p style={{ fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", color: "#6A645D" }}>CELEBRATION</p>
            </div>
            <div style={{ alignSelf: "flex-end", textAlign: "right", paddingRight: "20px" }}>
              <time style={{ fontSize: "11px", fontWeight: 700, color: "#4A3B32" }}>18:00</time>
              <p style={{ fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", color: "#6A645D" }}>DINNER</p>
            </div>
            <div>
              <time style={{ fontSize: "11px", fontWeight: 700, color: "#4A3B32" }}>19:00</time>
              <p style={{ fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", color: "#6A645D" }}>END OF THE EVENING</p>
            </div>
          </div>
        </div>
      </section>

      {!compact && (
        <>
          {/* 2. Venue Architectural Sketch Card */}
          <section className="estate-sketch-card" style={{ borderTop: "1px solid #E6DFD2" }}>
            <h3 style={{ fontStyle: "italic", fontSize: "16px", color: "#3B362F", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "4px" }}>
              WHERE EVERYTHING WILL HAPPEN
            </h3>
            <Heart size={14} color="#857E74" style={{ margin: "0 auto 10px" }} />
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#2B2724" }}>
              {config.venue || "Maplewood Estate"}
            </p>
            <p style={{ fontSize: "11px", color: "#6A645D", marginBottom: "14px" }}>
              {config.address || "123 Willow Lane, Greenfield, NY 12345"}
            </p>

            <div className="estate-sketch-frame">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0"
                alt="Venue estate sketch"
              />
            </div>

            <a
              href={mapLink}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-block",
                padding: "10px 28px",
                border: "1px solid #2B2724",
                borderRadius: "4px",
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#2B2724",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              OPEN MAP
            </a>
          </section>

          {/* 3. Dress Code Bows */}
          <section style={{ padding: "34px 20px", borderTop: "1px solid #E6DFD2", textAlign: "center" }}>
            <h3 style={{ fontStyle: "italic", fontSize: "20px", color: "#3B362F", marginBottom: "6px" }}>
              DRESS CODE
            </h3>
            <p style={{ fontSize: "11px", color: "#6A645D", maxWidth: "280px", margin: "0 auto 16px" }}>
              We kindly ask you to support the aesthetic of our wedding with your outfit in neutral colors.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "16px", fontSize: "24px" }}>
              <span title="Brown bow">🎀</span>
              <span title="Beige bow">🎀</span>
              <span title="Black bow">🎀</span>
              <span title="Champagne bow">🎀</span>
              <span title="Silver bow">🎀</span>
            </div>
          </section>

          {/* 4. Contrast Dark Espresso RSVP Card */}
          <section className="estate-dark-rsvp">
            <h3>Please complete the form</h3>

            {submitted ? (
              <div style={{ padding: "30px 10px", textAlign: "center" }}>
                <Check size={36} color="#4ade80" style={{ margin: "0 auto 12px" }} />
                <h4 style={{ fontSize: "18px", color: "#fff", marginBottom: "4px" }}>RSVP Received!</h4>
                <p style={{ fontSize: "12px", color: "#a89f95" }}>We are so excited to celebrate with you!</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div className="estate-dark-field">
                  <label>First and last name</label>
                  <input type="text" placeholder="Your full name" required />
                </div>

                <div className="estate-dark-field">
                  <label>Number of guests</label>
                  <div className="estate-counter-row">
                    <button
                      type="button"
                      className="estate-counter-btn"
                      onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontSize: "18px", fontWeight: 600 }}>{guestsCount}</span>
                    <button
                      type="button"
                      className="estate-counter-btn"
                      onClick={() => setGuestsCount(guestsCount + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="estate-dark-field">
                  <label>Do you require a seat on transportation?</label>
                  <div style={{ display: "flex", gap: "20px", marginTop: "8px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "13px" }}>
                      <input
                        type="radio"
                        name="transport"
                        checked={transport === "Yes"}
                        onChange={() => setTransport("Yes")}
                      />
                      <span>Yes</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "13px" }}>
                      <input
                        type="radio"
                        name="transport"
                        checked={transport === "No"}
                        onChange={() => setTransport("No")}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <button type="submit" className="estate-send-btn">
                  SEND
                </button>
              </form>
            )}

            {/* Recommendations Grid */}
            <div style={{ marginTop: "32px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.15)", textAlign: "center" }}>
              <h4
                style={{
                  fontSize: "11px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "#f4ede1",
                  marginBottom: "16px",
                }}
              >
                RECOMMENDATIONS
              </h4>

              <div className="velure-recs-grid" style={{ color: "#d6cebe" }}>
                <div className="velure-rec-item" style={{ color: "#d6cebe" }}>
                  <Car size={24} color="#f4ede1" />
                  <p className="velure-rec-text" style={{ color: "#d6cebe" }}>
                    Valet parking is arranged at the estate gate.
                  </p>
                </div>
                <div className="velure-rec-item" style={{ color: "#d6cebe" }}>
                  <span style={{ fontSize: "20px", marginTop: "2px" }}>👠</span>
                  <p className="velure-rec-text" style={{ color: "#d6cebe" }}>
                    Chunky heels or flats recommended for garden paths.
                  </p>
                </div>
                <div className="velure-rec-item" style={{ color: "#d6cebe" }}>
                  <Camera size={24} color="#f4ede1" />
                  <p className="velure-rec-text" style={{ color: "#d6cebe" }}>
                    Share your photos with our hashtag!
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "36px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.15)" }}>
              <p style={{ fontStyle: "italic", fontSize: "16px", color: "#f4ede1" }}>
                WE ARE WAITING FOR YOU, DEAR ONES!
              </p>
              <Heart size={16} fill="#f4ede1" color="#f4ede1" style={{ margin: "8px auto 16px" }} />

              <div style={{ borderRadius: "8px", overflow: "hidden", maxWidth: "280px", margin: "0 auto" }}>
                <img src={galleryPhoto} alt="Jason & Melani" style={{ width: "100%", height: "240px", objectFit: "cover", display: "block" }} />
              </div>
            </div>
          </section>
        </>
      )}
    </article>
  );
}
