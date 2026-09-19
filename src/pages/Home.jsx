import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  Play,
  Sparkles,
  Heart,
  Check,
  Smartphone,
  Palette,
  Globe,
  CalendarDays,
  Image,
  Video,
  MapPin,
  Mail,
  FileText,
  Clock,
  Users,
  Timer,
  Share2,
  MessageCircle,
  Instagram,
  Flower2,
  MoveUpRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Reveal from "../components/Reveal";
import BookingDialog from "../components/BookingDialog";
import {
  photos,
  templates,
  eventTypes,
  getEventTemplates,
  getEventDefaults,
} from "../data/content";
import { useInvitation } from "../context/InvitationContext";
import useHeroMotion from "../hooks/useHeroMotion";
const Invitation = lazy(() => import("../templates/Invitation"));
const whatsappUrl = "https://wa.me/919048503717";
const featureList = [
  [
    CalendarDays,
    "Every little detail",
    "Date, venue, and everything they need.",
  ],
  [Image, "Your favorite frames", "A gallery that tells your story."],
  [Video, "Moments in motion", "Bring your memories to life."],
  [MapPin, "A place to celebrate", "Directions, just one tap away."],
  [Mail, "A heartfelt yes", "A beautiful, effortless RSVP."],
  [FileText, "Something to keep", "A printable invitation PDF."],
  [Clock, "The day, beautifully planned", "A thoughtful event schedule."],
  [Users, "The people behind it", "Family details and contacts."],
  [Timer, "Count down to magic", "Every second brings you closer."],
  [Share2, "Made to be shared", "Your celebration, one simple link."],
  [MessageCircle, "One tap to connect", "WhatsApp, right at their fingertips."],
  [Heart, "Words to treasure", "A wall of love and good wishes."],
];
function TemplateCard({ template, index }) {
  const { config, applyTemplate } = useInvitation();
  const thumbnail = useRef(null);
  const [scale, setScale] = useState(0.5);
  useEffect(() => {
    const element = thumbnail.current;
    const observer = new ResizeObserver(([entry]) =>
      setScale(entry.contentRect.width / 640),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const destination =
    "/customizer?event=" +
    encodeURIComponent(template.eventType) +
    "&theme=" +
    template.id;
  return (
    <Reveal delay={(index % 3) * 0.07}>
      <article className="template-card">
        <Link
          className={"template-art event-template-art art-" + template.style}
          ref={thumbnail}
          to={destination}
          aria-label={
            "Customize " + template.name + " for " + template.eventType
          }
        >
          <span className="template-tag">{template.tag}</span>
          <div
            className="template-live-thumbnail"
            style={{ transform: `scale(${scale})` }}
            inert
          >
            <Suspense
              fallback={
                <div className="preview-placeholder">{template.name}</div>
              }
            >
              <Invitation
                config={getEventDefaults(template.eventType, template.id)}
                compact
              />
            </Suspense>
          </div>
          <span className="preview-hover">
            Explore this invitation <ArrowUpRight size={16} />
          </span>
        </Link>
        <div className="template-meta">
          <div>
            <h3>{template.name}</h3>
            <p>{template.description}</p>
          </div>
          <button
            aria-label={"Apply " + template.name}
            onClick={() => applyTemplate(template.id)}
            className={config.template === template.id ? "applied" : ""}
          >
            {config.template === template.id ? (
              <Check size={18} />
            ) : (
              <ArrowUpRight size={19} />
            )}
          </button>
        </div>
        <div className="template-actions">
          <Link to={"/preview"} onClick={() => applyTemplate(template.id)}>
            Live preview <ArrowUpRight size={13} />
          </Link>
          <Link to={destination}>
            Apply template <Palette size={13} />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}
export default function Home() {
  const { config, applyTemplate } = useInvitation();
  const eventDate = new Date(config.date + "T12:00:00");
  const [selectedEvent, setSelectedEvent] = useState(config.eventType);
  const [booking, setBooking] = useState(null);
  const hero = useRef(null);
  const reduced = useReducedMotion();
  useHeroMotion(hero);
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-copy > *", {
        y: 26,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
      });
      gsap.from(".hero-photo", {
        scale: 1.09,
        duration: 2.5,
        ease: "power2.out",
      });
    }, hero);
    return () => ctx.revert();
  }, [reduced]);
  function moveHero(e) {
    if (reduced || e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    gsap.to(".floating-invite", {
      x: (e.clientX - rect.left - rect.width / 2) * 0.018,
      y: (e.clientY - rect.top - rect.height / 2) * 0.015,
      duration: 0.8,
      overwrite: "auto",
    });
  }
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="hero" ref={hero} onPointerMove={moveHero}>
          <img
            className="hero-photo"
            src={photos.hero}
            alt="A candlelit wedding celebration framed by flowers and greenery"
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="hero-grain" />
          <div className="hero-cursor-glow" aria-hidden="true" />
          <div className="hero-particles" aria-hidden="true">
            {Array.from({ length: 12 }, (_, i) => (
              <span
                key={i}
                style={{
                  left: i * 8 + 3 + "%",
                  animationDelay: i * -0.7 + "s",
                  top: 15 + (i % 4) * 19 + "%",
                }}
              />
            ))}
          </div>
          <div className="hero-copy">
            <div className="hero-kicker">
              <span /> BEAUTIFUL BEGINNINGS START HERE
            </div>
            <h1>
              Your invitation,
              <br />
              now a beautiful
              <br />
              <em>website.</em>
              <span className="headline-sparkle">✧</span>
            </h1>
            <p>
              Turn your special moments into a personalized
              <br className="desktop-break" /> digital experience. Made to feel
              like you.
            </p>
            <div className="hero-buttons">
              <a className="button light" href="#templates">
                Explore templates <ArrowUpRight size={17} />
              </a>
              <Link className="button glass" to="/preview">
                <Play size={14} fill="currentColor" /> Experience live demo
              </Link>
            </div>
            <div className="hero-proof">
              <span className="proof-avatars">
                {[photos.couple, photos.flowers, photos.table].map((src, i) => (
                  <img key={src} src={src} alt="" style={{ zIndex: 3 - i }} />
                ))}
              </span>
              <div>
                <span className="proof-stars">★★★★★</span>
                <span>Made for moments that matter.</span>
              </div>
            </div>
          </div>
          <div className="hero-aside">
            <div className="floating-label">
              <span className="online-dot" /> YOUR FOREVER, BEAUTIFULLY ONLINE
            </div>
            <Link to="/preview" className="floating-invite">
              <div className="invite-topline">
                <Flower2 size={25} strokeWidth={1} />
                <small>{config.eventType.toUpperCase()} · YOU'RE INVITED</small>
              </div>
              <h2>{config.names}</h2>
              <div className="invite-rule" />
              <p>
                {Number.isFinite(eventDate.getTime())
                  ? eventDate.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Date to be announced"}
              </p>
              <span>{config.venue}</span>
              <div className="invite-seal">
                a<span>✧</span>
              </div>
            </Link>
            <span className="floating-caption">
              Not just an invite. <i>A feeling.</i>
            </span>
          </div>
          <div className="hero-bottom">
            <a href="#templates">
              <span className="scroll-pill">
                <ArrowDown size={15} />
              </span>{" "}
              SCROLL TO FALL IN LOVE
            </a>
            <span>PERSONAL. TIMELESS. UNFORGETTABLE.</span>
            <span className="hero-counter">
              12 <span>CELEBRATIONS</span>
            </span>
          </div>
        </section>
        <div className="value-strip">
          {[
            [Smartphone, "Beautiful on every screen"],
            [Palette, "Thoughtfully personalized"],
            [Globe, "One link. Endless memories."],
            [Heart, "Crafted with a little love"],
          ].map(([Icon, text]) => (
            <span key={text}>
              <Icon size={17} strokeWidth={1.4} />
              {text}
            </span>
          ))}
        </div>
        <section className="section templates-section" id="templates">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">
                <span /> THE COLLECTION
              </span>
              <h2>
                Different styles.
                <br />
                <i>The same kind of magic.</i>
              </h2>
            </div>
            <p>
              Find the one that feels like you.
              <br />
              Then make every little detail your own.
            </p>
          </Reveal>
          <div className="collection-toolbar">
            <div
              className="filters"
              role="group"
              aria-label="Choose event collection"
            >
              {eventTypes.map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedEvent(item)}
                  aria-pressed={selectedEvent === item}
                  className={selectedEvent === item ? "active" : ""}
                >
                  {item}
                </button>
              ))}
            </div>
            <span className="collection-note">
              36 SIGNATURE DESIGNS <Sparkles size={14} />
            </span>
          </div>
          <h3 className="event-collection-title" aria-live="polite">
            {selectedEvent} invitations{" "}
            <span>Three designs, made for this moment.</span>
          </h3>
          <div className="template-grid" key={selectedEvent}>
            {getEventTemplates(selectedEvent).map((template, index) => (
              <TemplateCard
                key={template.id}
                template={template}
                index={index}
              />
            ))}
          </div>
          <div className="collection-bottom">
            <span>Made for your story. Designed to be remembered.</span>
            <Link to="/customizer">
              Create something uniquely yours <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
        <section className="live-section" id="live-preview">
          <div className="section live-layout">
            <Reveal className="live-copy">
              <span className="eyebrow">
                A LITTLE PREVIEW. A LOT OF POSSIBILITY.
              </span>
              <h2>
                One story.
                <br />
                <i>Endless expressions.</i>
              </h2>
              <p>
                See your invitation come to life. Switch the style, change the
                mood, and discover the one that feels just right.
              </p>
              <div
                className="theme-swatches"
                role="group"
                aria-label="Live invitation theme"
              >
                {getEventTemplates(config.eventType).map((t) => (
                  <button
                    key={t.id}
                    title={t.name}
                    aria-label={"Switch to " + t.name}
                    aria-pressed={config.template === t.id}
                    style={{ "--swatch": t.color }}
                    onClick={() => applyTemplate(t.id)}
                  >
                    {config.template === t.id && <Check size={17} />}
                  </button>
                ))}
              </div>
              <div className="selected-style">
                {templates.find((t) => t.id === config.template)?.name}{" "}
                <span>· SELECTED STYLE</span>
              </div>
              <Link className="button primary" to="/customizer">
                Make it yours <ArrowUpRight size={16} />
              </Link>
              <small>
                <Check size={13} /> Instant preview <Check size={13} /> No
                sign-up needed
              </small>
            </Reveal>
            <Reveal className="live-stage">
              <div className="browser-chrome">
                <div>
                  <i />
                  <i />
                  <i />
                </div>
                <span>Ardhas / your celebration</span>
                <Globe size={12} />
              </div>
              <div className="live-window">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={config.template}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.25 }}
                  >
                    <Suspense
                      fallback={
                        <div className="preview-placeholder">
                          A beautiful invitation is on its way…
                        </div>
                      }
                    >
                      <Invitation config={config} compact />
                    </Suspense>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="preview-status">
                <span className="online-dot" /> LIVE PREVIEW{" "}
                <Link to="/preview">
                  Open full invitation <ArrowUpRight size={13} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
        <section className="section occasions">
          <Reveal className="center-heading">
            <span className="eyebrow">
              EVERY CHAPTER DESERVES TO BE CELEBRATED
            </span>
            <h2>
              Perfect for <i>your kind of special.</i>
            </h2>
            <p>Big milestones. Intimate gatherings. Everything in between.</p>
          </Reveal>
          <div className="occasion-list">
            {[
              "Weddings",
              "Engagements",
              "Birthdays",
              "Housewarming",
              "Baby Shower",
              "Anniversary",
              "Save the Date",
              "Reception",
              "Any Celebration",
            ].map((item, i) => (
              <Link
                key={item}
                to={
                  "/customizer?event=" +
                  encodeURIComponent(
                    {
                      Weddings: "Wedding",
                      Engagements: "Engagement",
                      Birthdays: "Birthday",
                      "Any Celebration": "Other",
                    }[item] || item,
                  )
                }
              >
                <span>{["♡", "✧", "❋", "⌂", "☼", "∞", "◇", "❈", "✦"][i]}</span>
                {item}
                <ArrowUpRight size={13} />
              </Link>
            ))}
          </div>
        </section>
        <section className="features-section" id="features">
          <div className="section">
            <Reveal className="section-heading">
              <div>
                <span className="eyebrow">MORE THAN AN INVITATION</span>
                <h2>
                  All the details.
                  <br />
                  <i>All the delight.</i>
                </h2>
              </div>
              <p>
                A thoughtfully designed home for everything
                <br />
                your guests need—and a few things they'll love.
              </p>
            </Reveal>
            <div className="features-grid">
              {featureList.map(([Icon, title, description], i) => (
                <Reveal key={title} delay={(i % 4) * 0.05}>
                  <article className="feature-card">
                    <Icon size={23} strokeWidth={1.3} />
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="section gallery-section" id="gallery">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">A MOOD. A MOMENT. A MEMORY.</span>
              <h2>
                Made for the <i>beautiful things.</i>
              </h2>
            </div>
            <Link to="/preview" className="text-link">
              Experience the gallery <ArrowUpRight size={16} />
            </Link>
          </Reveal>
          <div className="editorial-gallery">
            {[photos.couple, photos.table, photos.flowers].map((src, i) => (
              <Link
                to="/preview"
                key={src}
                className={"editorial-image editorial-" + i}
              >
                <img
                  src={src}
                  loading="lazy"
                  alt={
                    [
                      "A couple celebrating their love",
                      "An intimate celebration setting",
                      "Romantic wedding floral details",
                    ][i]
                  }
                />
                <span>
                  {
                    [
                      "The beginning of forever",
                      "Gathered with love",
                      "In the little details",
                    ][i]
                  }{" "}
                  <MoveUpRight size={18} />
                </span>
              </Link>
            ))}
          </div>
          <Reveal className="quote">
            <span>“</span>
            <blockquote>
              Before the first hello, the first dance, the first toast…
              <br />
              there's an invitation. <i>Make it unforgettable.</i>
            </blockquote>
            <p>THE ARDHAS PHILOSOPHY</p>
          </Reveal>
        </section>
        <section className="contact-section" id="contact">
          <div className="contact-orbit orbit-one" />
          <div className="contact-orbit orbit-two" />
          <Reveal>
            <span className="eyebrow">YOUR NEXT BEAUTIFUL BEGINNING</span>
            <h2>
              Create your personalized
              <br />
              <i>event website.</i>
            </h2>
            <p>
              Your story deserves more than a card.
              <br />
              Let's create something they'll remember.
            </p>
            <div className="cta-buttons">
              <button
                className="button light"
                onClick={() => setBooking("email")}
              >
                Book your website <ArrowUpRight size={17} />
              </button>
              <a
                className="button glass"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={17} /> WhatsApp us
              </a>
            </div>
            <a className="contact-more" href="#templates">
              View more templates <ArrowRight size={15} />
            </a>
          </Reveal>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-top">
          <div>
            <Link to="/" className="brand">
              Ardhas<span>✧</span>
            </Link>
            <p>Invitations, beautifully reimagined.</p>
          </div>
          <div className="footer-links">
            <a href="#templates">The collection</a>
            <Link to="/customizer">Make it yours</Link>
            <button onClick={() => setBooking("email")}>Let's connect</button>
          </div>
          <div className="social-links">
            <a
              href="https://www.instagram.com/ardhas_wedding_company?stkn=MXFlb3BnaDBxZzV3OA=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ardhas Wedding Company on Instagram"
            >
              <Instagram size={19} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact us on WhatsApp"
            >
              <MessageCircle size={19} />
            </a>
            <button
              onClick={() => setBooking("email")}
              aria-label="Email inquiry"
            >
              <Mail size={19} />
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Ardhas · Frontend demo</span>
          <span>
            Made with <Heart size={12} /> for unforgettable celebrations.
          </span>
          <span>DESIGNED TO FEEL DIFFERENT.</span>
        </div>
      </footer>
      <div className="mobile-bottom">
        <span>Your story starts here.</span>
        <Link to="/customizer">
          Create your invite <ArrowUpRight size={15} />
        </Link>
      </div>
      {booking && <BookingDialog onClose={() => setBooking(null)} />}
    </>
  );
}
