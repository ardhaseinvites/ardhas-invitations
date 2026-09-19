import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import gsap from "gsap";
import { Helmet } from "react-helmet";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, A11y, Zoom } from "swiper/modules";
import {
  PiHouseLine,
  PiFlowerLotusLight,
  PiHandsPrayingLight,
} from "react-icons/pi";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  Volume2,
  VolumeX,
  Home,
  Users,
  Flower2,
  MapPin,
  Images,
  Puzzle,
  Heart,
  Mail,
  CalendarDays,
  Clock3,
  Flame,
  Utensils,
  Coffee,
  Sparkles,
  Sprout,
  Hammer,
  Copy,
  Share2,
  X,
  Plus,
  Navigation as NavigationIcon,
  MessageCircle,
  Instagram,
} from "lucide-react";
import Reveal from "../components/Reveal";
import BlurText from "../components/housewarming/BlurText";
import useInvitationBell from "../hooks/useInvitationBell";
import {
  housewarming as event,
  ceremony,
  homeStory,
  gallery,
} from "../data/housewarming";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import "../styles/housewarming.css";

const Games = lazy(
  () => import("../components/housewarming/HousewarmingGames"),
);
const CelebrationMark = lazy(
  () => import("../components/housewarming/CelebrationMark"),
);
const navigation = [
  ["welcome", "Home", Home],
  ["family", "Family", Users],
  ["invitation", "Invitation", Flower2],
  ["location", "Location", MapPin],
  ["gallery", "Gallery", Images],
  ["games", "Games", Puzzle],
  ["blessings", "Blessings", Heart],
  ["rsvp", "RSVP", Mail],
];
const iconMap = {
  flame: Flame,
  flower: Flower2,
  lunch: Utensils,
  tea: Coffee,
  sparkles: Sparkles,
  sprout: Sprout,
  hammer: Hammer,
  home: Home,
  heart: Heart,
};

function Petals({ night = false }) {
  return (
    <div
      className={`hw-petals ${night ? "hw-fireflies" : ""}`}
      aria-hidden="true"
    >
      {Array.from({ length: 12 }, (_, i) => (
        <i
          key={i}
          style={{
            "--x": `${(i * 17 + 7) % 100}%`,
            "--delay": `${i * -1.7}s`,
            "--duration": `${12 + (i % 6)}s`,
            "--size": `${5 + (i % 5)}px`,
          }}
        />
      ))}
    </div>
  );
}

function Rangoli({ className = "" }) {
  return (
    <svg
      className={`hw-rangoli ${className}`}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="100"
        cy="100"
        r="92"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeDasharray="2 5"
      />
      <circle
        cx="100"
        cy="100"
        r="68"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse
          key={i}
          cx="100"
          cy="64"
          rx="16"
          ry="36"
          stroke="currentColor"
          strokeWidth="0.8"
          transform={`rotate(${i * 30} 100 100)`}
        />
      ))}
      <circle cx="100" cy="100" r="12" fill="currentColor" opacity=".4" />
    </svg>
  );
}

function SectionHeading({ eyebrow, children, description, light = false }) {
  return (
    <Reveal className={`hw-section-heading ${light ? "hw-light" : ""}`}>
      <p className="hw-eyebrow">
        <span />
        {eyebrow}
        <span />
      </p>
      <h2>{children}</h2>
      {description && <p className="hw-description">{description}</p>}
    </Reveal>
  );
}

function Countdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  const seconds = Math.max(
    0,
    Math.floor((new Date(event.date).getTime() - now) / 1000),
  );
  const values = [
    Math.floor(seconds / 86400),
    Math.floor(seconds / 3600) % 24,
    Math.floor(seconds / 60) % 60,
    seconds % 60,
  ];
  const isToday =
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now) === "2026-09-20";
  return (
    <div className="hw-countdown">
      <p className="hw-eyebrow">
        {seconds
          ? "Counting down to a beautiful beginning"
          : isToday
            ? "Today, we welcome you home"
            : "A beautiful beginning, forever cherished"}
      </p>
      <div
        className="hw-countdown-grid"
        aria-label={
          seconds
            ? `${values[0]} days, ${values[1]} hours, ${values[2]} minutes until the ceremony`
            : "The ceremony date has arrived"
        }
      >
        {values.map((value, i) => (
          <div className="hw-countdown-unit" key={i}>
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="45" />
              <circle
                className="hw-ring-progress"
                cx="50"
                cy="50"
                r="45"
                pathLength="100"
                strokeDasharray={`${seconds ? Math.min(100, (value / [365, 24, 60, 60][i]) * 100) : 100} 100`}
              />
            </svg>
            <strong>{String(value).padStart(2, "0")}</strong>
            <span>{["Days", "Hours", "Minutes", "Seconds"][i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HouseGallery() {
  const dialog = useRef(null);
  const lastTrigger = useRef(null);
  const [selected, setSelected] = useState(0);
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    if (!opened) return;
    dialog.current?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      lastTrigger.current?.focus();
    };
  }, [opened]);
  const close = () => {
    dialog.current?.close();
    setOpened(false);
  };
  return (
    <section className="hw-section hw-gallery-section" id="gallery">
      <SectionHeading
        eyebrow="Every corner, a little love"
        description="A glimpse of the warmth waiting behind our doors."
      >
        Spaces for <em>new memories.</em>
      </SectionHeading>
      <Reveal className="hw-gallery-grid">
        {gallery.map((photo, index) => (
          <button
            className={`hw-gallery-item hw-gallery-item-${index}`}
            key={photo.title}
            onClick={(e) => {
              lastTrigger.current = e.currentTarget;
              setSelected(index);
              setOpened(true);
            }}
            aria-label={`View ${photo.title}`}
          >
            <img
              src={photo.image}
              alt={photo.title}
              loading="lazy"
              width="900"
              height="700"
              style={{
                objectPosition: photo.position,
                "--image-zoom": photo.zoom || 1,
              }}
            />
            <span className="hw-gallery-caption">
              <span>
                <small>0{index + 1}</small>
                {photo.title}
              </span>
              <Plus size={22} />
            </span>
          </button>
        ))}
      </Reveal>
      <p className="hw-small-note">
        Home artwork and interior photographs are illustrative. Select an image
        to explore.
      </p>
      <dialog
        className="hw-lightbox"
        ref={dialog}
        onCancel={close}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
        aria-label="Home photo gallery"
      >
        {opened && (
          <>
            <button
              className="hw-lightbox-close"
              onClick={close}
              aria-label="Close photo gallery"
              autoFocus
            >
              <X />
            </button>
            <Swiper
              initialSlide={selected}
              modules={[Navigation, Keyboard, A11y, Zoom]}
              navigation
              keyboard={{ enabled: true }}
              zoom={{ maxRatio: 3 }}
              onSlideChange={(swiper) => setSelected(swiper.activeIndex)}
            >
              {gallery.map((photo) => (
                <SwiperSlide key={photo.title}>
                  <div className="swiper-zoom-container">
                    <img src={photo.image} alt={photo.title} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <p className="hw-lightbox-caption">
              {gallery[selected].title}
              <span>
                {gallery[selected].caption} · Pinch or double-tap to zoom
              </span>
            </p>
          </>
        )}
      </dialog>
    </section>
  );
}

function Location() {
  const [status, setStatus] = useState("");
  const [showMap, setShowMap] = useState(false);
  const fullAddress = `${event.name}, ${event.address}. ${event.coordinates}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${fullAddress}\n${event.mapUrl}`);
      setStatus("Address and map link copied.");
    } catch {
      setStatus(`Copy this address: ${fullAddress}`);
    }
  };
  const share = async () => {
    if (!navigator.share) return copy();
    try {
      await navigator.share({
        title: event.name,
        text: fullAddress,
        url: event.mapUrl,
      });
      setStatus("Location shared.");
    } catch (error) {
      if (error.name !== "AbortError")
        setStatus("Sharing unavailable. Use Copy Address instead.");
    }
  };
  return (
    <section className="hw-section hw-location" id="location">
      <Reveal className="hw-location-copy">
        <p className="hw-eyebrow">All roads lead to home</p>
        <h2>
          Find your way
          <br />
          <em>to our hearts.</em>
        </h2>
        <p>
          Come for the ceremony.
          <br />
          Stay for the conversations.
        </p>
        <div className="hw-address">
          <MapPin size={22} />
          <div>
            <h3>{event.name}</h3>
            <address>{event.address}</address>
            <small>{event.coordinates}</small>
          </div>
        </div>
        <a
          className="hw-button hw-button-dark"
          href={event.mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open Google Maps <ArrowUpRight size={17} />
        </a>
        <div className="hw-location-actions">
          <button onClick={copy}>
            <Copy size={15} /> Copy Address
          </button>
          <button onClick={share}>
            <Share2 size={15} /> Share Location
          </button>
        </div>
        <p className="hw-status" role="status">
          {status}
        </p>
      </Reveal>
      <Reveal className="hw-map-card" delay={0.12}>
        {showMap ? (
          <iframe
            title={`Map to ${event.name}`}
            src={`https://maps.google.com/maps?q=${event.latitude},${event.longitude}&z=15&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <>
            <div className="hw-map-art" aria-hidden="true">
              <div className="hw-map-lake" />
              <svg viewBox="0 0 500 450" preserveAspectRatio="none">
                <path
                  className="hw-map-road"
                  d="M-20 370 Q120 290 150 350 T390 280 T530 130 M80 -20 Q180 70 210 170 T350 300 L420 500"
                />
                <path
                  className="hw-map-route"
                  d="M20 360 Q115 305 160 350 T340 320 Q360 260 280 220"
                />
              </svg>
              <span className="hw-map-town">SASTHAMCOTTA</span>
              <span className="hw-map-lake-label">Sasthamcotta Lake</span>
              <span className="hw-map-pin">
                <Home size={24} />
              </span>
              <span className="hw-map-home">You’re almost home</span>
            </div>
            <button className="hw-map-load" onClick={() => setShowMap(true)}>
              <NavigationIcon size={17} /> Explore interactive map{" "}
              <ArrowUpRight size={16} />
            </button>
            <p className="hw-map-disclaimer">
              Illustrated map · load Google Maps for exact directions
            </p>
          </>
        )}
      </Reveal>
    </section>
  );
}

function Blessings() {
  const [blessing, setBlessing] = useState("");
  const reduced = useReducedMotion();
  const [bloom, setBloom] = useState(0);
  const bless = async (value) => {
    setBlessing(value);
    setBloom((count) => count + 1);
    if (!reduced) {
      const { default: confetti } = await import("canvas-confetti");
      confetti({
        particleCount: 35,
        spread: 70,
        startVelocity: 22,
        origin: { y: 0.72 },
        colors: ["#c4a365", "#e8c8a9", "#92a68a"],
        disableForReducedMotion: true,
      });
    }
  };
  return (
    <section className="hw-blessings" id="blessings">
      <Rangoli className="hw-blessings-rangoli" />
      <SectionHeading
        eyebrow="The most beautiful gift"
        light
        description="Your presence is our present. Leave a little blessing for the life we’re building."
      >
        Bring your love.
        <br />
        <em>Leave a blessing.</em>
      </SectionHeading>
      <Reveal className="hw-blessing-options">
        {[
          ["Prosperity", Sprout],
          ["Happiness", Sparkles],
          ["Good Health", Flower2],
          ["Peace", PiFlowerLotusLight],
          ["Love", Heart],
        ].map(([label, Icon]) => (
          <button
            key={label}
            onClick={() => bless(label)}
            className={blessing === label ? "is-selected" : ""}
            aria-pressed={blessing === label}
          >
            <Icon size={25} />
            <span>{label}</span>
          </button>
        ))}
      </Reveal>
      <div className="hw-blessing-message" role="status">
        <AnimatePresence mode="wait">
          {blessing && (
            <motion.div
              key={bloom}
              initial={reduced ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <span className="hw-floating-flower" aria-hidden="true">
                ✿
              </span>
              May {blessing.toLowerCase()} fill every corner of this home.
              <small>A little wish, blooming on your screen.</small>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="hw-marquee" aria-hidden="true">
        <div>
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i}>
              love lives here <i>✧</i> new beginnings <i>✧</i> endless blessings{" "}
              <i>✧</i> welcome home <i>✧</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function RSVP() {
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState({
    name: "",
    guests: "1",
    phone: "",
    message: "",
  });
  const [error, setError] = useState("");
  const reduced = useReducedMotion();
  const message = `Housewarming RSVP — ${event.name}\n${event.dateLabel}, ${event.time}\nName: ${form.name.trim()}\nGuests: ${form.guests}\nPhone: ${form.phone.trim()}\nMessage: ${form.message.trim() || "Looking forward to celebrating with you!"}`;
  const submit = async (e) => {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !/^[+0-9 ()-]{7,20}$/u.test(form.phone) ||
      form.phone.replace(/\D/g, "").length < 7
    ) {
      setError("Please enter your name and a valid phone number.");
      return;
    }
    setError("");
    setReady(true);
    if (!reduced) {
      const { default: confetti } = await import("canvas-confetti");
      confetti({
        particleCount: 70,
        spread: 75,
        colors: ["#c4a365", "#284b3e", "#f3d7a1"],
        disableForReducedMotion: true,
      });
    }
  };
  return (
    <section className="hw-section hw-rsvp" id="rsvp">
      <Reveal className="hw-rsvp-intro">
        <PiHandsPrayingLight className="hw-rsvp-hands" size={48} />
        <p className="hw-eyebrow">There’s a place for you</p>
        <h2>
          Our home.
          <br />
          Your presence.
          <br />
          <em>A perfect beginning.</em>
        </h2>
        <p>
          It would mean the world to celebrate this beautiful milestone with
          you. Let us know you’re coming.
        </p>
        <span className="hw-family-signature">With love,</span>
        <h3>{event.family}</h3>
        <small>{event.address}</small>
      </Reveal>
      <Reveal className="hw-rsvp-card" delay={0.1}>
        {ready ? (
          <div
            className="hw-rsvp-success"
            role="status"
            tabIndex={-1}
            ref={(element) => element?.focus()}
          >
            {reduced ? (
              <Flower2 size={52} />
            ) : (
              <Suspense fallback={<Flower2 size={52} />}>
                <CelebrationMark />
              </Suspense>
            )}
            <p className="hw-eyebrow">One little step to go</p>
            <h3>
              We can’t wait
              <br />
              to welcome you.
            </h3>
            <p>
              Your RSVP for {form.guests}{" "}
              {Number(form.guests) === 1 ? "guest is" : "guests is"} ready. Tap
              below and send the message in WhatsApp to let us know.
            </p>
            <a
              className="hw-button hw-button-dark"
              href={`${event.whatsapp}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} /> Send RSVP on WhatsApp{" "}
              <ArrowUpRight size={16} />
            </a>
            <small>
              Your response is not sent until you press Send in WhatsApp.
            </small>
            <button className="hw-text-button" onClick={() => setReady(false)}>
              Edit my response
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p className="hw-eyebrow">Kindly RSVP</p>
            <h3>Will you join us?</h3>
            <p>A little yes. A lot of happiness.</p>
            <label>
              Your name
              <input
                name="name"
                autoComplete="name"
                placeholder="How shall we welcome you?"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                required
              />
            </label>
            <div className="hw-form-row">
              <label>
                Number of guests
                <select
                  name="guests"
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                >
                  {Array.from({ length: 20 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1} {i ? "guests" : "guest"}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Phone number
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder="Your mobile number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  pattern={String.raw`[+0-9 \(\)\-]{7,20}`}
                  title="Enter 7–20 characters using numbers, spaces, +, or hyphens"
                  maxLength={20}
                  required
                />
              </label>
            </div>
            <label>
              A little message <span>(optional)</span>
              <textarea
                name="message"
                rows="3"
                placeholder="A wish, a blessing, a little hello…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                maxLength={600}
              />
            </label>
            {error && <p role="alert">{error}</p>}
            <button className="hw-button hw-button-dark" type="submit">
              Count me in <Heart size={17} />
            </button>
            <p className="hw-form-note">
              Continue to WhatsApp to send your RSVP.
              <br />
              Your details stay on this device until you choose to send.
            </p>
          </form>
        )}
      </Reveal>
    </section>
  );
}

export default function Housewarming() {
  const [entered, setEntered] = useState(false);
  const [opening, setOpening] = useState(false);
  const [active, setActive] = useState("welcome");
  const [gamesReady, setGamesReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const { sound, toggle, ring } = useInvitationBell();
  const root = useRef(null);
  const doorway = useRef(null);
  const story = useRef(null);
  const gamesPlaceholder = useRef(null);
  const welcome = useRef(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (!opening) return;
    if (reduced) {
      setEntered(true);
      setOpening(false);
      return;
    }
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: () => {
          setEntered(true);
          setOpening(false);
          window.scrollTo(0, 0);
        },
      });
      timeline
        .fromTo(
          ".hw-door-overlay",
          { opacity: 0 },
          { opacity: 1, duration: 0.35 },
        )
        .to(".hw-door-left", {
          rotateY: -105,
          duration: 1.25,
          ease: "power2.inOut",
        })
        .to(
          ".hw-door-right",
          { rotateY: 105, duration: 1.25, ease: "power2.inOut" },
          "<",
        )
        .to(
          ".hw-door-frame",
          { scale: 2.2, opacity: 0, duration: 0.75 },
          "-=0.4",
        )
        .to(".hw-door-overlay", { opacity: 0, duration: 0.3 });
    }, doorway);
    return () => context.revert();
  }, [opening, reduced]);

  useEffect(() => {
    if (!entered) return;
    welcome.current?.focus({ preventScroll: true });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0 },
    );
    navigation.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    const gameObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGamesReady(true);
          gameObserver.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    if (gamesPlaceholder.current)
      gameObserver.observe(gamesPlaceholder.current);
    return () => {
      observer.disconnect();
      gameObserver.disconnect();
    };
  }, [entered]);

  const open = () => {
    if (sound) ring();
    setOpening(true);
  };
  const scroll = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
    setActive(id);
  };
  const tilt = (e) => {
    if (reduced || paused || e.pointerType !== "mouse") return;
    const bounds = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--tilt-x",
      `${((e.clientY - bounds.top - bounds.height / 2) / bounds.height) * -4}deg`,
    );
    e.currentTarget.style.setProperty(
      "--tilt-y",
      `${((e.clientX - bounds.left - bounds.width / 2) / bounds.width) * 4}deg`,
    );
  };

  return (
    <div
      className={`hw-experience ${paused ? "hw-motion-paused" : ""}`}
      ref={root}
    >
      <Helmet>
        <title>{event.name} · Housewarming | Ardhas Invitations</title>
        <meta
          name="description"
          content={`You are warmly invited to ${event.name}, ${event.address}, on 20 September 2026 at 10 AM. Step inside our housewarming celebration.`}
        />
        <meta name="theme-color" content="#f7f4eb" />
      </Helmet>
      <header className="hw-header">
        <Link to="/" className="hw-brand" aria-label="Ardhas Invitations home">
          ardhas<span>INVITATIONS</span>
          <i>✳</i>
        </Link>
        <span className="hw-header-note">
          A NEW HOME. A BEAUTIFUL BEGINNING.
        </span>
        <div className="hw-header-actions">
          <button
            className="hw-sound-toggle"
            onClick={toggle}
            aria-label={
              sound ? "Mute invitation sounds" : "Enable invitation sounds"
            }
            aria-pressed={sound}
          >
            {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>Sound {sound ? "on" : "off"}</span>
          </button>
          <button
            className="hw-pause-toggle"
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? "Resume ambience" : "Pause ambience"}
          </button>
        </div>
      </header>
      {entered && (
        <>
          <motion.div
            className="hw-scroll-progress"
            style={{ scaleX: reduced ? scrollYProgress : progress }}
          />
          <nav className="hw-floating-nav" aria-label="Housewarming sections">
            {navigation.map(([id, label, Icon]) => (
              <button
                key={id}
                onClick={() => scroll(id)}
                className={active === id ? "active" : ""}
                aria-current={active === id ? "location" : undefined}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </>
      )}
      {!entered ? (
        <main className="hw-landing" id="main-content">
          <Petals />
          <Rangoli className="hw-landing-rangoli" />
          <div className="hw-landing-copy">
            <motion.p
              className="hw-eyebrow"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span /> GRIHAPRAVESHAM <span />
            </motion.p>
            <h1>
              <BlurText text="Vazhappalli" />
              <em>
                <BlurText text="Thekkathil" delay={100} />
              </em>
            </h1>
            <div className="hw-landing-house-name">
              <PiHouseLine size={21} />
              <span>A new home. A beautiful beginning.</span>
              <PiHouseLine size={21} />
            </div>
            <p className="hw-landing-quote">
              <BlurText
                text="With the blessings of God and the love of our family, we warmly invite you to celebrate the beginning of our new home."
                delay={22}
              />
            </p>
          </div>
          <div className="hw-landing-art">
            <img
              src={event.image}
              width="1536"
              height="1024"
              alt="Illustration of a Kerala home with a welcoming teak doorway, brass lamps, and tropical gardens in golden light"
              fetchPriority="high"
            />
            <div className="hw-sunlight" />
            <div className="hw-landing-cta">
              <button
                className="hw-button hw-button-dark hw-open-button"
                disabled={opening}
                onClick={open}
              >
                {opening ? "Opening our home…" : "Open Invitation"}
                <ArrowUpRight size={19} />
              </button>
              <span>A little love awaits on the other side.</span>
            </div>
            <span className="hw-art-caption">
              A home imagined. A celebration made for you.
            </span>
          </div>
          <div className="hw-landing-bottom">
            <span>
              <CalendarDays size={14} /> 20 SEPTEMBER 2026
            </span>
            <span className="hw-landing-flower">✧</span>
            <span>
              <MapPin size={14} /> SASTHAMCOTTA, KOLLAM
            </span>
          </div>
        </main>
      ) : (
        <main id="main-content">
          <section className="hw-welcome" id="welcome">
            <Petals />
            <div className="hw-welcome-intro">
              <div className="hw-lamp hw-lamp-left" aria-hidden="true">
                ♧<span>♨</span>
              </div>
              <div className="hw-lamp hw-lamp-right" aria-hidden="true">
                ♧<span>♨</span>
              </div>
              <PiFlowerLotusLight size={42} className="hw-welcome-lotus" />
              <p className="hw-eyebrow">OM SHREE GANESHAYA NAMAHA</p>
              <h1 ref={welcome} tabIndex={-1}>
                <BlurText text="A new home." />
                <em>
                  <BlurText text="A lifetime of memories." />
                </em>
              </h1>
              <p>With grateful hearts and open doors, we invite you to our</p>
              <span className="hw-script">Grihapravesham</span>
            </div>
            <Reveal className="hw-house-card-wrap">
              <div
                className="hw-house-card"
                onPointerMove={tilt}
                onPointerLeave={(e) => {
                  e.currentTarget.style.setProperty("--tilt-x", "0deg");
                  e.currentTarget.style.setProperty("--tilt-y", "0deg");
                }}
              >
                <img
                  src={event.image}
                  alt="Golden-hour illustration of our Kerala home"
                  width="1536"
                  height="1024"
                />
                <span className="hw-house-image-tag">
                  <span /> A BEAUTIFUL BEGINNING
                </span>
                <span className="hw-house-image-caption">
                  Where our story comes home.
                </span>
              </div>
              <div className="hw-house-seal">
                <PiHouseLine size={27} />
                <span>
                  WITH LOVE
                  <br />& BLESSINGS
                </span>
              </div>
            </Reveal>
            <Reveal className="hw-house-title">
              <p className="hw-eyebrow">WELCOME TO</p>
              <h2>{event.name}</h2>
              <p>The {event.family} family</p>
              <div className="hw-house-meta">
                <span>
                  <CalendarDays size={17} /> {event.dateLabel}
                </span>
                <i />
                <span>
                  <Clock3 size={17} /> {event.time}
                </span>
                <i />
                <span>
                  <MapPin size={17} /> Sasthamcotta, Kollam
                </span>
              </div>
              <button
                className="hw-scroll-hint"
                onClick={() => scroll("invitation")}
                aria-label="Discover the invitation"
              >
                <ArrowDown size={19} />
              </button>
            </Reveal>
          </section>
          <section className="hw-section hw-invitation" id="invitation">
            <SectionHeading
              eyebrow="You are warmly invited"
              description="A sacred beginning, a shared meal, and the people who make our world a little more beautiful."
            >
              Let’s fill this home
              <br />
              <em>with your blessings.</em>
            </SectionHeading>
            <div className="hw-ceremony-grid">
              {ceremony.map((item, index) => {
                const Icon = iconMap[item.icon];
                return (
                  <Reveal key={item.title} delay={index * 0.06}>
                    <div className="hw-ceremony-card">
                      <span className="hw-ceremony-number">0{index + 1}</span>
                      <Icon size={27} />
                      <p className="hw-eyebrow">{item.time}</p>
                      <h3>{item.title}</h3>
                      <p>{item.subtitle}</p>
                      <span className="hw-card-flower">✧</span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <p className="hw-small-note">
              Ceremony begins at 10 AM. The remaining programme is a suggested
              schedule.
            </p>
            <Reveal>
              <Countdown />
            </Reveal>
          </section>
          <section className="hw-family-section" id="family">
            <div className="hw-section">
              <SectionHeading
                eyebrow="The hearts behind the home"
                description="Different generations. One beautiful bond. A home built on the love we share."
              >
                One family.
                <br />
                <em>A thousand little joys.</em>
              </SectionHeading>
              <Reveal className="hw-family-intro">
                <Rangoli />
                <div>
                  <p className="hw-eyebrow">WITH LOVE, FROM ALL OF US</p>
                  <h3>{event.family}</h3>
                  <p>
                    “Our greatest blessing has always been each other.
                    <br />
                    Our new home is simply where that love will grow.”
                  </p>
                </div>
              </Reveal>
              <div className="hw-family-grid">
                {[
                  ["Our elders", "The roots of our story", PiHandsPrayingLight],
                  ["Our family", "The heart of our home", Heart],
                  ["Our little ones", "The joy in every corner", Sparkles],
                ].map(([title, subtitle, Icon], index) => (
                  <Reveal delay={index * 0.08} key={title}>
                    <div className="hw-family-card">
                      <div className="hw-family-avatar">
                        <Icon size={32} />
                      </div>
                      <h3>{title}</h3>
                      <p>{subtitle}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
          <section className="hw-section hw-story">
            <div className="hw-story-heading">
              <SectionHeading eyebrow="Brick by brick, blessing by blessing">
                Every home begins
                <br />
                <em>with a little dream.</em>
              </SectionHeading>
              <div className="hw-story-controls">
                <button
                  aria-label="Previous story chapter"
                  onClick={() =>
                    story.current?.scrollBy({
                      left: -330,
                      behavior: reduced ? "instant" : "smooth",
                    })
                  }
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  aria-label="Next story chapter"
                  onClick={() =>
                    story.current?.scrollBy({
                      left: 330,
                      behavior: reduced ? "instant" : "smooth",
                    })
                  }
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
            <div
              className="hw-story-track"
              ref={story}
              tabIndex={0}
              role="region"
              aria-label="Our home story. Swipe or use the arrow buttons to explore."
            >
              {homeStory.map((item, index) => {
                const Icon = iconMap[item.icon];
                return (
                  <div className="hw-story-card" key={item.stage}>
                    <span className="hw-story-step">
                      0{index + 1}
                      <i />
                    </span>
                    <Icon size={32} />
                    <p className="hw-eyebrow">{item.stage}</p>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                );
              })}
            </div>
          </section>
          <HouseGallery />
          <Location />
          <div ref={gamesPlaceholder} id="games">
            {gamesReady ? (
              <Suspense
                fallback={
                  <div className="hw-games-loading" role="status">
                    Preparing a little playtime…
                  </div>
                }
              >
                <Games houseImage={event.image} soundEnabled={sound} />
              </Suspense>
            ) : (
              <div className="hw-games-loading">
                <Puzzle size={30} />
                <h2>Play before you enter our home</h2>
                <button
                  className="hw-button hw-button-dark"
                  onClick={() => setGamesReady(true)}
                >
                  Let’s play <ArrowRight size={17} />
                </button>
              </div>
            )}
          </div>
          <Blessings />
          <RSVP />
          <footer className="hw-footer">
            <img
              src={event.image}
              className="hw-footer-house"
              alt=""
              loading="lazy"
              width="1536"
              height="1024"
            />
            <Petals night />
            <div className="hw-footer-content">
              <PiHouseLine size={36} />
              <p>
                A house is built with walls.
                <br />
                <em>A home is built with love.</em>
              </p>
              <span>We look forward to welcoming you.</span>
              <h3>{event.name}</h3>
              <a href={event.mapUrl} target="_blank" rel="noreferrer">
                {event.address} <ArrowUpRight size={14} />
              </a>
              <div className="hw-footer-bottom">
                <Link to="/" className="hw-brand">
                  ardhas<span>INVITATIONS</span>
                  <i>✳</i>
                </Link>
                <small>Thoughtfully made for unforgettable beginnings.</small>
                <div>
                  <a
                    href={event.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Ardhas Instagram"
                  >
                    <Instagram size={18} />
                  </a>
                  <a
                    href={event.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Contact Ardhas on WhatsApp"
                  >
                    <MessageCircle size={18} />
                  </a>
                </div>
              </div>
            </div>
          </footer>
          <button className="hw-mobile-rsvp" onClick={() => scroll("rsvp")}>
            <Heart size={16} /> Join our celebration <ArrowUpRight size={16} />
          </button>
        </main>
      )}
      {opening && (
        <div ref={doorway}>
          <div
            className="hw-door-overlay"
            role="status"
            aria-label="Opening the doors to our home"
          >
            <div className="hw-door-glow" />
            <div className="hw-door-frame">
              <div className="hw-door-panel hw-door-left">
                <span />
                <i />
              </div>
              <div className="hw-door-panel hw-door-right">
                <span />
                <i />
              </div>
            </div>
            <p>Welcome home.</p>
          </div>
        </div>
      )}
    </div>
  );
}
