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
} from "lucide-react";
import { parseYouTubeUrl } from "../utils/media.js";
import "../styles/pinterest-templates.css";

// Realistic QR code component for registry
function QrCodeSvg() {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor">
      {/* 3 Position Detection Patterns */}
      <rect x="0" y="0" width="30" height="30" rx="3" fill="#2C2925" />
      <rect x="5" y="5" width="20" height="20" rx="2" fill="#FFFFFF" />
      <rect x="9" y="9" width="12" height="12" rx="1" fill="#2C2925" />

      <rect x="70" y="0" width="30" height="30" rx="3" fill="#2C2925" />
      <rect x="75" y="5" width="20" height="20" rx="2" fill="#FFFFFF" />
      <rect x="79" y="9" width="12" height="12" rx="1" fill="#2C2925" />

      <rect x="0" y="70" width="30" height="30" rx="3" fill="#2C2925" />
      <rect x="5" y="75" width="20" height="20" rx="2" fill="#FFFFFF" />
      <rect x="9" y="79" width="12" height="12" rx="1" fill="#2C2925" />

      {/* Decorative QR data modules */}
      <rect x="36" y="6" width="6" height="6" fill="#2C2925" />
      <rect x="48" y="10" width="8" height="6" fill="#2C2925" />
      <rect x="40" y="20" width="6" height="8" fill="#2C2925" />
      <rect x="52" y="24" width="8" height="8" fill="#2C2925" />

      <rect x="10" y="38" width="6" height="6" fill="#2C2925" />
      <rect x="22" y="44" width="8" height="6" fill="#2C2925" />
      <rect x="6" y="52" width="6" height="8" fill="#2C2925" />

      <rect x="38" y="38" width="8" height="8" fill="#2C2925" />
      <rect x="54" y="42" width="6" height="6" fill="#2C2925" />
      <rect x="42" y="54" width="10" height="6" fill="#2C2925" />
      <rect x="60" y="58" width="8" height="8" fill="#2C2925" />

      <rect x="74" y="38" width="6" height="8" fill="#2C2925" />
      <rect x="88" y="44" width="8" height="6" fill="#2C2925" />
      <rect x="76" y="56" width="8" height="6" fill="#2C2925" />

      <rect x="36" y="74" width="6" height="6" fill="#2C2925" />
      <rect x="48" y="80" width="8" height="8" fill="#2C2925" />
      <rect x="60" y="76" width="6" height="6" fill="#2C2925" />
      <rect x="74" y="84" width="8" height="8" fill="#2C2925" />
      <rect x="88" y="76" width="6" height="6" fill="#2C2925" />
    </svg>
  );
}

export default function VelureMinimal({ config, compact = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(false);
  const audioContext = useRef(null);
  const audioTimer = useRef(null);

  const heroPhoto =
    config.heroImage ||
    "https://images.unsplash.com/photo-1519741497674-611481863552";
  const yt = parseYouTubeUrl(heroPhoto);
  const heroSrc = yt.isYouTube ? yt.thumbnailUrl : heroPhoto;

  const galleryPhoto =
    config.gallery?.[0]?.src ||
    "https://images.unsplash.com/photo-1529636798458-92182e662485";

  // Monogram initials from couple names
  const names = (config.names || "Alejandra & Mateo").split(/&|and|\+/i);
  const initial1 = names[0]?.trim()?.charAt(0)?.toUpperCase() || "A";
  const initial2 = names[1]?.trim()?.charAt(0)?.toUpperCase() || "M";

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
      config.address || config.venue || "Valle de Bravo, Estado de México"
    )}`;

  const whatsappRsvp = `https://wa.me/919048503717?text=${encodeURIComponent(
    `Hola! Con mucho gusto confirmo mi asistencia a la boda de ${config.names || "Alejandra & Mateo"}.`
  )}`;

  return (
    <article className="pinterest-mobile-card velure-template">
      {/* 1. Hero & Monogram Section */}
      <section className="velure-hero-section">
        {/* Monogram Oval Crest */}
        <div className="velure-monogram-oval" aria-label="Monogram crest">
          <span className="velure-monogram-text">
            {initial1}
            <br />
            {initial2}
          </span>
        </div>

        <p className="velure-hero-eyebrow">NOS CASAMOS</p>

        <div className="velure-hero-names">
          <span className="velure-name-line">{names[0]?.trim() || "ALEJANDRA"}</span>
          <span className="velure-and-script">y</span>
          <span className="velure-name-line">{names[1]?.trim() || "MATEO"}</span>
        </div>

        <div className="velure-date-strip">
          <span>16</span>
          <span>·</span>
          <span>AGOSTO</span>
          <span>·</span>
          <span>2025</span>
        </div>

        <div style={{ color: "#706f54", fontSize: "14px", margin: "10px 0 18px" }}>
          𐀔
        </div>

        {/* Arched Photo with Soft Watercolor Base */}
        <div className="velure-arch-photo" style={{ position: "relative" }}>
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
          "Un día para celebrar el amor y la vida juntos."
        </p>
        <div style={{ color: "#706f54", fontSize: "14px" }}>𐀔</div>

        {/* 2. Realistic Love Song Player Widget */}
        <div className="velure-music-card">
          <p className="velure-music-header">NUESTRA CANCIÓN</p>
          <p className="velure-music-track">All of Me — John Legend</p>

          <div className="velure-music-scrubber" onClick={togglePlaySong}>
            <div
              className="velure-music-fill"
              style={{ width: isPlaying ? "68%" : "22%" }}
            />
          </div>

          <div className="velure-music-time-row">
            <span>{isPlaying ? "2:34" : "0:45"}</span>
            <span>4:29</span>
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

        <ChevronDown size={18} color="#8c826e" style={{ margin: "4px auto 14px" }} />
      </section>

      {!compact && (
        <>
          {/* 3. Ceremony & Reception Venue Details */}
          <section className="velure-details-card">
            <div className="velure-detail-box">
              <Church size={34} color="#706f54" strokeWidth={1.3} style={{ margin: "0 auto" }} />
              <h3 className="velure-detail-title">CEREMONIA</h3>
              <p className="velure-detail-time">5:00 PM</p>
              <p style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>
                HACIENDA SAN GABRIEL
              </p>
              <p style={{ fontSize: "12px", color: "#6a6459", marginTop: "2px" }}>
                Valle de Bravo, Estado de México
              </p>
              <a
                href={mapLink}
                target="_blank"
                rel="noreferrer"
                className="velure-btn-outline"
              >
                VER UBICACIÓN
              </a>
            </div>

            <div style={{ color: "#706f54", fontSize: "14px", margin: "20px 0" }}>𐀔</div>

            <div className="velure-detail-box">
              <Wine size={34} color="#706f54" strokeWidth={1.3} style={{ margin: "0 auto" }} />
              <h3 className="velure-detail-title">RECEPCIÓN</h3>
              <p className="velure-detail-time">7:00 PM</p>
              <p style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>
                JARDÍN LA ISLA
              </p>
              <p style={{ fontSize: "12px", color: "#6a6459", marginTop: "2px" }}>
                Valle de Bravo, Estado de México
              </p>
              <a
                href={mapLink}
                target="_blank"
                rel="noreferrer"
                className="velure-btn-outline"
              >
                VER UBICACIÓN
              </a>
            </div>
          </section>

          {/* 4. Cronograma (Timeline) */}
          <section className="velure-details-card">
            <h3
              style={{
                fontSize: "13px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#2c2925",
                fontWeight: 600,
                marginBottom: "26px",
              }}
            >
              CRONOGRAMA
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "22px", maxWidth: "260px", margin: "0 auto", textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Church size={22} color="#706f54" strokeWidth={1.4} />
                <div>
                  <time style={{ fontSize: "10px", letterSpacing: "1.5px", color: "#7a756b", display: "block" }}>
                    5:00 PM
                  </time>
                  <span style={{ fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>
                    CEREMONIA
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Wine size={22} color="#706f54" strokeWidth={1.4} />
                <div>
                  <time style={{ fontSize: "10px", letterSpacing: "1.5px", color: "#7a756b", display: "block" }}>
                    6:00 PM
                  </time>
                  <span style={{ fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>
                    COCTEL DE BIENVENIDA
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Utensils size={22} color="#706f54" strokeWidth={1.4} />
                <div>
                  <time style={{ fontSize: "10px", letterSpacing: "1.5px", color: "#7a756b", display: "block" }}>
                    7:00 PM
                  </time>
                  <span style={{ fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>
                    CENA
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Music2 size={22} color="#706f54" strokeWidth={1.4} />
                <div>
                  <time style={{ fontSize: "10px", letterSpacing: "1.5px", color: "#7a756b", display: "block" }}>
                    8:30 PM
                  </time>
                  <span style={{ fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>
                    PRIMER BAILE Y FIESTA
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <Cake size={22} color="#706f54" strokeWidth={1.4} />
                <div>
                  <time style={{ fontSize: "10px", letterSpacing: "1.5px", color: "#7a756b", display: "block" }}>
                    12:00 AM
                  </time>
                  <span style={{ fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>
                    FIN DE LA NOCHE
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Dress Code Swatches */}
          <section className="velure-dresscode-card">
            <h4 style={{ fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#2c2925", fontWeight: 600, marginBottom: "4px" }}>
              DRESS CODE
            </h4>
            <p style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#706f54", fontWeight: 600 }}>
              FORMAL
            </p>

            <div className="velure-palette-dots">
              <span className="velure-palette-circle" style={{ backgroundColor: "#F7F3EE" }} title="Ivory" />
              <span className="velure-palette-circle" style={{ backgroundColor: "#D9CDBE" }} title="Warm Sand" />
              <span className="velure-palette-circle" style={{ backgroundColor: "#8C8275" }} title="Taupe" />
              <span className="velure-palette-circle" style={{ backgroundColor: "#47453F" }} title="Charcoal" />
              <span className="velure-palette-circle" style={{ backgroundColor: "#1C1B19" }} title="Black" />
            </div>
          </section>

          {/* 6. Gift Registry with QR Code */}
          <section className="velure-registry-box">
            <Gift size={28} color="#706f54" strokeWidth={1.4} style={{ margin: "0 auto 8px" }} />
            <h4 style={{ fontSize: "12px", letterSpacing: "2.5px", textTransform: "uppercase", color: "#2c2925", fontWeight: 600, marginBottom: "8px" }}>
              NUESTRO MEJOR REGALO
            </h4>
            <p style={{ fontSize: "12px", color: "#5c574c", lineHeight: 1.5, maxWidth: "280px", margin: "0 auto 16px" }}>
              Su presencia es nuestro mayor regalo, pero si desean tener un detalle con nosotros, les dejamos nuestra lista.
            </p>
            <div className="velure-qr-card">
              <QrCodeSvg />
            </div>
          </section>

          {/* 7. RSVP Confirmation & Recommendations */}
          <section className="velure-details-card" style={{ paddingBottom: "40px" }}>
            <h4 style={{ fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "#2c2925", fontWeight: 600, marginBottom: "8px" }}>
              CONFIRMACIÓN
            </h4>
            <p style={{ fontSize: "12px", color: "#5c574c", marginBottom: "16px" }}>
              Agradecemos confirmar su asistencia antes del 16 de julio.
            </p>
            <a
              href={whatsappRsvp}
              target="_blank"
              rel="noreferrer"
              className="velure-btn-outline"
              style={{ background: "#706f54", color: "#fff", borderColor: "#706f54" }}
            >
              CONFIRMAR ASISTENCIA
            </a>

            <div style={{ color: "#706f54", fontSize: "14px", margin: "26px 0" }}>𐀔</div>

            <h4 style={{ fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#2c2925", fontWeight: 600, marginBottom: "16px" }}>
              RECOMENDACIONES
            </h4>

            <div className="velure-recs-grid">
              <div className="velure-rec-item">
                <Car size={24} className="velure-rec-icon" />
                <p className="velure-rec-text">
                  Considera el tráfico y el clima. Planifica tu llegada con tiempo.
                </p>
              </div>
              <div className="velure-rec-item">
                <span style={{ fontSize: "20px", marginTop: "2px" }}>👠</span>
                <p className="velure-rec-text">
                  Usa calzado cómodo. El césped será parte de la celebración.
                </p>
              </div>
              <div className="velure-rec-item">
                <Camera size={24} className="velure-rec-icon" />
                <p className="velure-rec-text">
                  Disfruta el momento con nosotros. Habrá fotos, pero las mejores serán las que vivas.
                </p>
              </div>
            </div>

            <p style={{ fontStyle: "italic", fontSize: "15px", color: "#5c574c", margin: "26px auto 14px", maxWidth: "280px" }}>
              ❝ No hay mejor aventura que la que comenzamos juntos. ❞
            </p>
            <div style={{ color: "#706f54", fontSize: "14px", margin: "10px 0 20px" }}>𐀔</div>

            <h4 style={{ fontSize: "13px", letterSpacing: "2.5px", textTransform: "uppercase", color: "#2c2925", fontWeight: 600, marginBottom: "4px" }}>
              ¡GRACIAS!
            </h4>
            <p style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#7a756b", fontWeight: 600 }}>
              POR SER PARTE DE NUESTRO COMIENZO
            </p>
            <Heart size={16} fill="#706f54" color="#706f54" style={{ margin: "8px auto 24px" }} />

            {/* Closing Photo */}
            <div style={{ borderRadius: "8px", overflow: "hidden", maxWidth: "340px", margin: "0 auto 16px" }}>
              <img src={galleryPhoto} alt="Alejandra y Mateo" style={{ width: "100%", height: "260px", objectFit: "cover", display: "block" }} />
            </div>

            <p style={{ fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase", color: "#4f4b43", fontWeight: 600 }}>
              {config.names || "ALEJANDRA & MATEO"}
            </p>
            <p style={{ fontSize: "11px", letterSpacing: "2px", color: "#7a756b", marginTop: "4px" }}>
              16 . 08 . 25
            </p>
            <p style={{ fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: "#9c9485", marginTop: "32px" }}>
              VELURE DIGITAL INVITATIONS
            </p>
          </section>
        </>
      )}
    </article>
  );
}
