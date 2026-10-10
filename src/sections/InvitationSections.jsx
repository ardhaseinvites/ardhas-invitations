import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Pagination, Keyboard } from "swiper/modules";
import {
  CalendarDays,
  Clock3,
  MapPin,
  ArrowUpRight,
  Heart,
  Play,
  X,
  Check,
  Gift,
  Phone,
  Shirt,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

function Reveal({ children, className = "", id }) {
  const reducedMotion = useReducedMotion();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  return (
    <motion.section
      id={id}
      ref={ref}
      className={`invite-section ${className}`}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={inView || reducedMotion ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reducedMotion ? 0 : 0.6 }}
    >
      {children}
    </motion.section>
  );
}
function Title({ eyebrow, children }) {
  return (
    <header className="invite-section-title">
      <p>{eyebrow}</p>
      <h3>{children}</h3>
      <span aria-hidden="true">✧</span>
    </header>
  );
}
function safeLink(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}
function videoSource(value) {
  if (!value) return null;
  if (value.startsWith("blob:")) {
    return { type: "file", src: value };
  }
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    if (/\.(mp4|webm)$/i.test(url.pathname))
      return { type: "file", src: url.href };
    const host = url.hostname.replace(/^www\./, "");
    let id;
    if (host === "youtu.be") id = url.pathname.slice(1);
    else if (
      ["youtube.com", "youtube-nocookie.com", "m.youtube.com"].includes(host)
    )
      id =
        url.searchParams.get("v") ||
        url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1];
    return /^[\w-]{11}$/.test(id || "")
      ? {
          type: "youtube",
          src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`,
        }
      : null;
  } catch {
    return null;
  }
}

export default function InvitationSections({ config }) {
  const reducedMotion = useReducedMotion();
  const [galleryView, setGalleryView] = useState("grid");
  const [lightboxId, setLightboxId] = useState(null);
  const [video, setVideo] = useState(false);
  const [rsvp, setRsvp] = useState(false);
  const [registry, setRegistry] = useState("");
  const closeRef = useRef(null);
  const copy = config.copy || {};
  const pictures = (config.gallery || []).filter((item) => item.src);
  const selectedIndex = pictures.findIndex((item) => item.id === lightboxId);
  const selected = pictures[selectedIndex];
  const galleryRef = useRef(pictures);
  galleryRef.current = pictures;
  const open = Boolean(selected && config.sections?.gallery !== false);
  const enabled = (section) => config.sections?.[section] !== false;
  const navigate = (direction) =>
    setLightboxId((id) => {
      const list = galleryRef.current;
      if (!list.length) return null;
      const current = list.findIndex((item) => item.id === id);
      return list[(current + direction + list.length) % list.length].id;
    });
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement;
    closeRef.current?.focus();
    const handleKey = (event) => {
      if (event.key === "Escape") setLightboxId(null);
      if (event.key === "ArrowRight") navigate(1);
      if (event.key === "ArrowLeft") navigate(-1);
      if (event.key === "Tab") {
        const buttons = [
          ...document.querySelectorAll(".invite-lightbox button"),
        ];
        const first = buttons[0],
          last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [open]);
  const renderPhoto = (photo, index) => (
    <button
      key={photo.id}
      onClick={() => setLightboxId(photo.id)}
      aria-label={`${copy.galleryTitle}: ${photo.alt || index + 1}`}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        width="600"
        height={index % 2 ? 540 : 750}
      />
      <span>
        {copy.galleryTitle}
        <ArrowUpRight size={15} />
      </span>
    </button>
  );
  const eventDate = new Date(`${config.date}T${config.time || "10:00"}:00`);
  const date = Number.isFinite(eventDate.getTime())
    ? eventDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";
  const time = Number.isFinite(eventDate.getTime())
    ? eventDate.toLocaleTimeString("en-GB", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : config.time;
  const map =
    safeLink(config.mapUrl) ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.mapQuery || config.address || config.venue)}`;
  const source = videoSource(config.videoUrl);
  return (
    <div className="invite-body">
      {enabled("story") && (
        <Reveal id="invite-story">
          <Title eyebrow={copy.storyEyebrow}>{copy.storyTitle}</Title>
          <p className="invite-story-text">{config.story}</p>
          <div className="invite-memory-timeline">
            {(config.memories || []).map((item, index) => (
              <div key={item.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      )}
      {enabled("details") && (
        <Reveal id="invite-details" className="invite-details">
          <Title eyebrow={copy.detailsEyebrow}>{copy.detailsTitle}</Title>
          <div className="invite-detail-grid">
            {[
              [CalendarDays, copy.dayLabel, date],
              [Clock3, copy.timeLabel, time],
              [MapPin, copy.venueLabel, config.venue],
              [Shirt, copy.dressLabel, config.dressCode],
            ].map(([Icon, label, text], index) => (
              <div key={index}>
                <Icon size={23} />
                <h4>{label}</h4>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <a className="invite-map" href={map} target="_blank" rel="noreferrer">
            <div className="invite-map-grid">
              <MapPin size={32} />
            </div>
            <div>
              <strong>{copy.mapTitle}</strong>
              <p>{config.address || config.venue}</p>
            </div>
            <span>
              {copy.mapLabel}
              <ArrowUpRight size={17} />
            </span>
          </a>
        </Reveal>
      )}
      {enabled("schedule") && (
        <Reveal id="invite-schedule">
          <Title eyebrow={copy.scheduleEyebrow}>{copy.scheduleTitle}</Title>
          <div className="invite-schedule">
            {(config.schedule || []).map((item) => (
              <div key={item.id}>
                <time>{item.time}</time>
                <span />
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      )}
      {enabled("gallery") && (
        <Reveal id="invite-gallery">
          <Title eyebrow={copy.galleryEyebrow}>{copy.galleryTitle}</Title>
          {pictures.length > 0 && (
            <>
              <div
                className="invite-gallery-controls"
                role="group"
                aria-label="Gallery layout"
              >
                <button
                  aria-pressed={galleryView === "grid"}
                  onClick={() => setGalleryView("grid")}
                >
                  {copy.galleryGridLabel}
                </button>
                <button
                  aria-pressed={galleryView === "slider"}
                  onClick={() => setGalleryView("slider")}
                >
                  {copy.gallerySliderLabel}
                </button>
              </div>
              {galleryView === "grid" ? (
                <div className="invite-gallery invite-gallery-masonry">
                  {pictures.map(renderPhoto)}
                </div>
              ) : (
                <Swiper
                  key={pictures.map((item) => item.id).join("|")}
                  modules={[A11y, Pagination, Keyboard]}
                  keyboard={{ enabled: true, onlyInViewport: true }}
                  pagination={{ clickable: true }}
                  breakpointsBase="container"
                  spaceBetween={14}
                  slidesPerView={Math.min(pictures.length, 1.25)}
                  breakpoints={{
                    640: { slidesPerView: Math.min(pictures.length, 2.4) },
                    1000: { slidesPerView: Math.min(pictures.length, 3) },
                  }}
                  className="invite-gallery"
                >
                  {pictures.map((picture, index) => (
                    <SwiperSlide key={picture.id}>
                      {renderPhoto(picture, index)}
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </>
          )}
          <p className="invite-demo-caption">{copy.galleryCaption}</p>
        </Reveal>
      )}
      {enabled("video") && (
        <Reveal id="invite-video">
          <div className="invite-video">
            {video && source ? (
              source.type === "youtube" ? (
                <iframe
                  key={source.src}
                  src={source.src}
                  title={copy.videoTitle}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  key={source.src}
                  controls
                  autoPlay
                  playsInline
                  src={source.src}
                  poster={config.videoPoster || undefined}
                />
              )
            ) : (
              <button
                onClick={() => source && setVideo(true)}
                disabled={!source}
              >
                {config.videoPoster && (
                  <img
                    src={config.videoPoster}
                    alt={copy.videoTitle}
                    loading="lazy"
                    width="1200"
                    height="650"
                  />
                )}
                <span>
                  <i>
                    <Play size={25} fill="currentColor" />
                  </i>
                  <strong>{copy.videoTitle}</strong>
                  <small>{copy.videoPlayLabel}</small>
                </span>
              </button>
            )}
          </div>
          <p className="invite-demo-caption">{copy.videoCaption}</p>
        </Reveal>
      )}
      {enabled("rsvp") && (
        <Reveal id="invite-rsvp" className="invite-rsvp">
          <Title eyebrow={copy.rsvpEyebrow}>{copy.rsvpTitle}</Title>
          <AnimatePresence mode="wait">
            {rsvp ? (
              <motion.div
                key="success"
                className="invite-rsvp-success"
                initial={reducedMotion ? false : { scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                role="status"
              >
                <Check size={35} />
                <h4>{copy.rsvpSuccessTitle}</h4>
                <p>{copy.rsvpSuccessText}</p>
                <button onClick={() => setRsvp(false)}>
                  {copy.rsvpAgainLabel}
                </button>
                <div className="invite-confetti" aria-hidden="true">
                  {Array.from({ length: 18 }, (_, index) => (
                    <i key={index} style={{ "--i": index }} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={(event) => {
                  event.preventDefault();
                  setRsvp(true);
                }}
                className="invite-rsvp-form"
              >
                <label>
                  {copy.rsvpNameLabel}
                  <input required autoComplete="name" maxLength={100} />
                </label>
                <label>
                  {copy.rsvpEmailLabel}
                  <input required type="email" autoComplete="email" />
                </label>
                <label>
                  {copy.rsvpAttendanceLabel}
                  <select defaultValue="yes">
                    <option value="yes">{copy.rsvpAcceptLabel}</option>
                    <option value="no">{copy.rsvpDeclineLabel}</option>
                  </select>
                </label>
                <label>
                  {copy.rsvpGuestsLabel}
                  <select defaultValue="1">
                    {[1, 2, 3, 4, 5].map((number) => (
                      <option key={number}>{number}</option>
                    ))}
                  </select>
                </label>
                <label className="invite-full-field">
                  {copy.rsvpNoteLabel}
                  <textarea rows="3" maxLength={500} />
                </label>
                <button className="invite-submit" type="submit">
                  {copy.rsvpSubmitLabel}
                  <Heart size={16} />
                </button>
                <p className="invite-demo-caption">{copy.rsvpDemoText}</p>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      )}
      {enabled("wishes") && (
        <Reveal id="invite-wishes">
          <Title eyebrow={copy.wishesEyebrow}>{copy.wishesTitle}</Title>
          {config.wishes?.length > 0 && (
            <Swiper
              key={config.wishes.map((item) => item.id).join("|")}
              modules={[Pagination, A11y]}
              pagination={{ clickable: true }}
              className="invite-wishes"
            >
              {config.wishes.map((item) => (
                <SwiperSlide key={item.id}>
                  <Heart size={21} />
                  <blockquote>“{item.quote}”</blockquote>
                  <p>— {item.author}</p>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <p className="invite-demo-caption">{copy.wishesCaption}</p>
        </Reveal>
      )}
      {enabled("registry") && (
        <Reveal id="invite-registry">
          <Title eyebrow={copy.registryEyebrow}>{copy.registryTitle}</Title>
          <p className="invite-story-text">{copy.registryText}</p>
          <div className="invite-registry">
            {(config.registry || []).map((item) => {
              const href = safeLink(item.url);
              const contents = (
                <>
                  <Gift size={23} />
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                  <span>
                    {copy.registryLinkLabel}
                    <ArrowUpRight size={14} />
                  </span>
                </>
              );
              return href ? (
                <a key={item.id} href={href} target="_blank" rel="noreferrer">
                  {contents}
                </a>
              ) : (
                <button key={item.id} onClick={() => setRegistry(item.id)}>
                  {contents}
                </button>
              );
            })}
          </div>
          {registry && (
            <p className="invite-registry-message" role="status">
              {copy.registryDemoText}
            </p>
          )}
        </Reveal>
      )}
      {enabled("contacts") && (
        <Reveal id="invite-contacts" className="invite-family">
          <Title eyebrow={copy.contactsEyebrow}>{copy.contactsTitle}</Title>
          <div className="invite-family-grid">
            {(config.contacts || []).map((item) => (
              <div key={item.id}>
                <Phone size={21} />
                <h4>{item.name}</h4>
                <p>{item.role}</p>
                {item.phone && (
                  <a href={`tel:${item.phone.replace(/[^\d+]/g, "")}`}>
                    {item.phone}
                  </a>
                )}
                {item.email && (
                  <a href={`mailto:${encodeURIComponent(item.email)}`}>
                    {item.email}
                  </a>
                )}
              </div>
            ))}
          </div>
          <a
            className="invite-contact-map"
            href={map}
            target="_blank"
            rel="noreferrer"
          >
            {copy.contactMapLabel}
            <ArrowUpRight size={14} />
          </a>
          <div className="invite-signoff">
            <Heart size={24} />
            <h3>{config.names}</h3>
            <p>{copy.signoffText}</p>
          </div>
        </Reveal>
      )}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="invite-lightbox"
              role="dialog"
              aria-modal="true"
              aria-label="Photo gallery"
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: reducedMotion ? 1 : 0 }}
              onClick={() => setLightboxId(null)}
            >
              <button
                ref={closeRef}
                className="invite-lightbox-close"
                aria-label="Close photo"
                onClick={() => setLightboxId(null)}
              >
                <X />
              </button>
              <button
                aria-label="Previous photo"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(-1);
                }}
              >
                <ChevronLeft />
              </button>
              <img
                src={selected.src}
                alt={selected.alt}
                onClick={(event) => event.stopPropagation()}
              />
              <button
                aria-label="Next photo"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(1);
                }}
              >
                <ChevronRight />
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}
