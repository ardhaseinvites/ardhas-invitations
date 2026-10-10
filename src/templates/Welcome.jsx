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
} from "lucide-react";

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
  };
  return <div className="invite-event-motif">{motifs[config.eventType]}</div>;
}

export default function Welcome({ config, compact }) {
  const reducedMotion = useReducedMotion();
  const heroVideo = useRef(null);
  const [paused, setPaused] = useState(false);
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
  const photo =
    config.background === "Custom Image" ? config.image : config.heroImage;
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
    <div className={`invite-welcome ${photo ? "has-hero-photo" : ""}`}>
      {photo && (
        <img
          className="invite-photo"
          src={photo}
          alt={config.names}
          loading={compact ? "lazy" : "eager"}
          width="1400"
          height="1000"
        />
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
        {!compact && (
          <>
            {config.sections?.countdown !== false && (
              <div
                className="invite-countdown"
                aria-label="Time until the event"
              >
                {Object.entries(remaining).map(([label, value]) => (
                  <div key={label}>
                    <motion.strong
                      key={value}
                      initial={reducedMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {String(value).padStart(2, "0")}
                    </motion.strong>
                    <span>{copy[`${label}Label`]}</span>
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
