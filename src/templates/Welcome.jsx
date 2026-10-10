import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  Sparkles,
  Heart,
  Flower2,
  Leaf,
  Lamp,
  Landmark,
  Bug,
  Home,
  Moon,
  Star,
  Gem,
  Sun,
  PartyPopper,
  Baby,
  Pause,
  Play,
  Music,
  Flame,
  GraduationCap,
  UtensilsCrossed,
  Wine,
  X,
} from "lucide-react";
import { parseYouTubeUrl } from "../utils/media.js";

function EventMotif({ config, date }) {
  const copy = config.copy || {};
  const motifs = {
    Wedding: (
      <div className="event-entwined">
        <i />
        <i />
      </div>
    ),
    Engagement: (
      <div className="event-ring">
        <Gem />
        <i />
      </div>
    ),
    Birthday: (
      <div className="event-age">
        <strong>{config.age}</strong>
        <span>{copy.ageLabel}</span>
        <PartyPopper />
      </div>
    ),
    Housewarming: (
      <div className="event-home">
        <Home />
        <span>{config.address}</span>
      </div>
    ),
    "Baby Shower": (
      <div className="event-moon">
        <Moon />
        <Star />
        <i />
      </div>
    ),
    Anniversary: (
      <div className="event-milestone">
        <strong>{config.milestone}</strong>
        <span>{copy.milestoneLabel}</span>
      </div>
    ),
    "Naming Ceremony": (
      <div className="event-cradle">
        <Baby />
        <span>{copy.nameRevealLabel}</span>
      </div>
    ),
    "Save the Date": (
      <div className="event-calendar">
        <span>{copy.calendarLabel}</span>
        <strong>{Number.isNaN(date.getTime()) ? "—" : date.getDate()}</strong>
        <span>
          {Number.isNaN(date.getTime())
            ? ""
            : date.toLocaleDateString("en-GB", {
                month: "long",
                year: "numeric",
              })}
        </span>
      </div>
    ),
    Reception: (
      <div className="event-gala">
        <Star />
        <i />
        <Star />
      </div>
    ),
    Mehendi: (
      <div className="event-henna">
        <Flower2 />
        <Leaf />
        <Flower2 />
      </div>
    ),
    Haldi: (
      <div className="event-sun">
        <Sun />
        <Flower2 />
        <Flower2 />
      </div>
    ),
    Other: (
      <div className="event-party">
        <PartyPopper />
        <Sparkles />
      </div>
    ),
    "Sangeet & Cocktail": (
      <div className="event-sangeet">
        <Music />
        <Sparkles />
        <Wine />
      </div>
    ),
    "Pooja & House Blessing": (
      <div className="event-pooja">
        <Flame />
        <Flower2 />
        <Flame />
      </div>
    ),
    Graduation: (
      <div className="event-grad">
        <GraduationCap />
        <Star />
      </div>
    ),
    "Dinner Party": (
      <div className="event-dinner">
        <UtensilsCrossed />
        <Wine />
      </div>
    ),
  };
  return <div className="invite-event-motif">{motifs[config.eventType]}</div>;
}

function getMonogram(names) {
  if (!names) return "A · M";
  const parts = names.split(/&|and|\+/i).map((s) => s.trim()).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0].charAt(0).toUpperCase()} · ${parts[1].charAt(0).toUpperCase()}`;
  }
  return names.slice(0, 2).toUpperCase();
}

export default function Welcome({ config, compact }) {
  const reducedMotion = useReducedMotion();
  const heroVideo = useRef(null);
  const [paused, setPaused] = useState(false);
  const [playingTrack, setPlayingTrack] = useState(false);
  const isDeckle = config.layout === "deckle" || config.style === "deckle";
  const isVelure = config.layout === "velure" || config.style === "velure";
  const videoSource =
    config.heroVideoUrl?.startsWith("blob:") ||
    /^https:\/\/.+\.(mp4|webm)(\?.*)?$/i.test(config.heroVideoUrl || "")
      ? config.heroVideoUrl
      : null;
  useEffect(() => {
    if (!heroVideo.current) return;
    if (paused || reducedMotion !== false) heroVideo.current.pause();
    else heroVideo.current.play().catch(() => setPaused(true));
  }, [paused, reducedMotion, videoSource, compact]);
  const [remaining, setRemaining] = useState({});
  const copy = config.copy || {};
  useEffect(() => {
    const update = () => {
      const timestamp = new Date(
        `${config.date}T${config.time || "10:00"}:00${config.timezone || "+05:30"}`,
      ).getTime();
      if (!Number.isFinite(timestamp)) return setRemaining({});
      const seconds = Math.max(0, Math.floor((timestamp - Date.now()) / 1000));
      setRemaining({
        days: Math.floor(seconds / 86400),
        hours: Math.floor(seconds / 3600) % 24,
        minutes: Math.floor(seconds / 60) % 60,
        seconds: seconds % 60,
      });
    };
    update();
    if (compact) return;
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [config.date, config.time, config.timezone, compact]);
  const date = new Date(`${config.date}T12:00:00`);
  const [playingHeroVideo, setPlayingHeroVideo] = useState(false);
  const photo =
    config.background === "Custom Image" ? config.image : config.heroImage;
  const photoYt = parseYouTubeUrl(photo);
  const heroThumbnail = photoYt.isYouTube ? photoYt.thumbnailUrl : photo;
  const firstSection = [
    "story",
    "details",
    "schedule",
    "gallery",
    "video",
    "rsvp",
    "wishes",
    "registry",
    "contacts",
  ].find((section) => config.sections?.[section] !== false);
  return (
    <div className={`invite-welcome ${heroThumbnail ? "has-hero-photo" : ""}`}>
      {heroThumbnail && (
        <div className="invite-hero-media-wrap">
          <img
            className="invite-photo"
            src={heroThumbnail}
            alt={config.names}
            loading={compact ? "lazy" : "eager"}
            width="1400"
            height="1000"
          />
          {photoYt.isYouTube && !compact && !playingHeroVideo && (
            <button
              type="button"
              className="invite-hero-yt-play-btn"
              onClick={() => setPlayingHeroVideo(true)}
              aria-label="Watch Welcome Video"
            >
              <span className="invite-hero-yt-play-icon">
                <Play size={18} fill="currentColor" />
              </span>
              <span className="invite-hero-yt-play-text">Watch Welcome Film</span>
            </button>
          )}
          {photoYt.isYouTube && compact && (
            <div className="invite-hero-yt-compact-tag" aria-hidden="true">
              <Play size={10} fill="currentColor" /> Video
            </div>
          )}
          {photoYt.isYouTube && !compact && playingHeroVideo && (
            <div className="invite-hero-yt-player-modal">
              <div className="invite-hero-yt-player-container">
                <iframe
                  src={photoYt.embedUrl}
                  title="Welcome Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <button
                  type="button"
                  className="invite-hero-yt-close-btn"
                  onClick={() => setPlayingHeroVideo(false)}
                  aria-label="Close welcome video"
                >
                  <X size={15} /> Close Video
                </button>
              </div>
            </div>
          )}
          {isDeckle && (
            <div className="invite-deckle-edge" aria-hidden="true">
              <svg viewBox="0 0 1200 30" preserveAspectRatio="none" className="deckle-svg">
                <path
                  d="M0,0 L0,18 Q30,28 60,17 Q90,7 120,20 Q150,30 180,15 Q210,5 240,19 Q270,30 300,16 Q330,8 360,22 Q390,30 420,14 Q450,4 480,18 Q510,30 540,16 Q570,6 600,21 Q630,30 660,15 Q690,5 720,20 Q750,30 780,16 Q810,7 840,22 Q870,30 900,15 Q930,5 960,19 Q990,30 1020,16 Q1050,7 1080,21 Q1110,30 1140,15 Q1170,8 1200,20 L1200,30 L0,30 Z"
                  fill="var(--invite-paper, #faf7f2)"
                />
              </svg>
            </div>
          )}
        </div>
      )}
      {!compact && videoSource && (
        <>
          <video
            key={videoSource}
            ref={heroVideo}
            className="invite-hero-video"
            src={videoSource}
            poster={config.heroImage || undefined}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
          />
          {!reducedMotion && (
            <button
              className="invite-video-toggle"
              onClick={() => setPaused((value) => !value)}
              aria-label={
                paused
                  ? copy.videoBackgroundPlayLabel
                  : copy.videoBackgroundPauseLabel
              }
            >
              {paused ? <Play size={12} /> : <Pause size={12} />}
              {paused
                ? copy.videoBackgroundPlayLabel
                : copy.videoBackgroundPauseLabel}
            </button>
          )}
        </>
      )}
      <div className="invite-decorations" aria-hidden="true">
        {Object.entries(config.decorations || {})
          .filter(([, enabled]) => enabled)
          .map(([name], index) => {
            const Icon =
              {
                Flowers: Flower2,
                Leaves: Leaf,
                Sparkles,
                Lanterns: Lamp,
                Butterflies: Bug,
                Hearts: Heart,
                "Temple Pattern": Landmark,
              }[name] || Sparkles;
            return (
              <Icon
                key={name}
                className={`invite-decoration decoration-${index}`}
                size={index % 2 ? 35 : 52}
              />
            );
          })}
      </div>
      <div className="invite-welcome-copy">
        {isVelure && (
          <div className="invite-velure-seal" title="Monogram Crest">
            <span className="invite-velure-initials">{getMonogram(config.names)}</span>
          </div>
        )}
        <p className="invite-overline">{copy.heroEyebrow}</p>
        <EventMotif config={config} date={date} />
        <h2>{config.names}</h2>
        <p className="invite-event-label">{copy.invitationLine}</p>
        <div className="invite-date">
          {Number.isNaN(date.getTime())
            ? ""
            : date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
        </div>
        <p className="invite-venue">{config.venue}</p>

        {isVelure && !compact && (
          <>
            <div className="invite-velure-player">
              <button
                type="button"
                className="invite-velure-play-btn"
                onClick={() => setPlayingTrack(!playingTrack)}
                aria-label={playingTrack ? "Pause love song" : "Play love song"}
              >
                {playingTrack ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
              </button>
              <div className="invite-velure-player-info">
                <span className="invite-velure-song-title">All of Me · John Legend</span>
                <div className="invite-velure-scrubber">
                  <div
                    className="invite-velure-scrubber-fill"
                    style={{ width: playingTrack ? "72%" : "25%" }}
                  />
                </div>
              </div>
              <span className="invite-velure-time">{playingTrack ? "2:45" : "0:45"}</span>
            </div>

            <div className="invite-velure-palette">
              <span className="invite-palette-label">DRESS CODE PALETTE</span>
              <div className="invite-palette-dots">
                {["#556b2f", "#8fbc8f", "#cd853f", "#d2b48c", "#faf0e6"].map((swatch, i) => (
                  <span
                    key={i}
                    className="invite-palette-dot"
                    style={{ backgroundColor: swatch }}
                    title={`Palette swatch ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {isDeckle && !compact && (
          <div className="invite-deckle-socials">
            <span className="deckle-hashtag-pill">
              #{config.names ? config.names.replace(/[^a-zA-Z]/g, "") : "OurForever"}
            </span>
            <div className="deckle-playlist-card">
              <Music size={14} />
              <span>Our Wedding Playlist · Spotify</span>
            </div>
          </div>
        )}

        {!compact && (
          <>
            {config.sections?.countdown !== false && (
              <div
                className={`invite-countdown ${isDeckle ? "invite-countdown-deckle" : ""}`}
                aria-label="Time until the event"
              >
                {Object.entries(remaining).map(([label, value]) => (
                  <div key={label} className={isDeckle ? "deckle-countdown-box" : ""}>
                    <motion.strong
                      key={value}
                      initial={reducedMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {String(value).padStart(2, "0")}
                    </motion.strong>
                    <span>{copy[`${label}Label`] || label.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            )}
            {firstSection && (
              <a className="invite-discover" href={`#invite-${firstSection}`}>
                {copy.scrollLabel}
                <ArrowDown size={14} />
              </a>
            )}
          </>
        )}
      </div>
      <div className="invite-bottom-line">{copy.footerLine}</div>
    </div>
  );
}
