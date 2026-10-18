import { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Sparkles,
  ArrowUpRight,
  Send,
  Heart,
  ChevronDown,
  ChevronUp,
  Phone,
  Gift,
} from "lucide-react";

export default function ChateauRose({ config, compact = false }) {
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(2);
  const [attending, setAttending] = useState(true);
  const [guestName, setGuestName] = useState("");
  const [rsvpSent, setRsvpSent] = useState(false);

  const rawNames = config.names || "Hélène & Charles";
  const dateObj = new Date(config.date || "2026-05-30");

  // Countdown timer calculation
  const [remaining, setRemaining] = useState({
    days: "48",
    hours: "12",
    minutes: "30",
    seconds: "15",
  });

  useEffect(() => {
    const target = new Date("2026-05-30T15:30:00").getTime();
    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setRemaining({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    const phone = config.contactPhone || "+91 9048503717";
    const cleanPhone = phone.replace(/[^\d]/g, "");
    const msg = encodeURIComponent(
      `🌸 Wedding RSVP for ${rawNames}\nGuest: ${guestName || "Guest"}\nAttending: ${attending ? "Yes, joyfully!" : "Regretfully cannot attend"}\nGuests: ${guestCount}\nSee you at the Orangerie!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, "_blank");
    setRsvpSent(true);
  };

  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    config.address || config.venue || "Orangerie du Château, Versailles, France"
  )}`;

  return (
    <article className="pinterest-mobile-card chateau-rose-card">
      {/* Background Floating Petals Accent */}
      <div className="rose-petals-ambient" />

      {/* 1. Header with Soft Watercolor Blush Rose Spray */}
      <header className="chateau-header">
        <div className="chateau-watercolor-spray top-right">
          <svg viewBox="0 0 160 120" fill="none" className="rose-bouquet-svg">
            {/* Rose 1 */}
            <circle cx="100" cy="40" r="28" fill="#F4DDD4" opacity="0.8" />
            <circle cx="102" cy="40" r="20" fill="#E8B8AA" opacity="0.85" />
            <circle cx="103" cy="38" r="12" fill="#D49A8B" opacity="0.9" />
            {/* Rose 2 */}
            <circle cx="130" cy="65" r="22" fill="#F8E5DF" opacity="0.8" />
            <circle cx="132" cy="65" r="15" fill="#E8B8AA" opacity="0.85" />
            {/* Leaves */}
            <path d="M70 45 C60 30, 75 15, 90 25 C85 40, 75 45, 70 45 Z" fill="#9CA894" opacity="0.75" />
            <path d="M120 20 C130 5, 145 15, 135 30 C125 30, 120 25, 120 20 Z" fill="#9CA894" opacity="0.75" />
          </svg>
        </div>

        <p className="chateau-kicker">WITH JOYFUL HEARTS</p>
        <h1 className="chateau-couple-title">{rawNames}</h1>
        <p className="chateau-date-label">MAY 30, 2026</p>
        <span className="chateau-gold-heart">♥</span>

        <p className="chateau-intro-quote">
          {config.story ||
            "Hélène and Charles request the pleasure of your company at a classic spring wedding, where roses and laughter fill the warm spring air."}
        </p>
      </header>

      {/* 2. Framed Date & Time Box */}
      <section className="chateau-date-box-section">
        <div className="chateau-rounded-date-box">
          <span className="box-day-name">SATURDAY</span>
          <div className="box-day-num-wrap">
            <span className="box-month">MAY</span>
            <span className="box-big-num">30</span>
            <span className="box-year">2026</span>
          </div>
          <span className="box-at-time">AT {config.time || "15:30"}</span>
        </div>

        {/* Mini Calendar */}
        <div className="chateau-calendar-wrap">
          <p className="cal-title">May 2026</p>
          <div className="chateau-cal-table">
            {["MO", "TU", "WE", "TH", "FR", "SA", "SU"].map((d) => (
              <span key={d} className="cal-th">{d}</span>
            ))}
            {Array.from({ length: 29 }, (_, i) => i + 1).map((n) => (
              <span key={n} className="cal-td">{n}</span>
            ))}
            <div className="cal-circled-td">
              <span className="circle-ring" />
              <span className="circle-num">30</span>
            </div>
            <span className="cal-td">31</span>
          </div>
        </div>
      </section>

      {/* 3. The Venue */}
      <section className="chateau-venue-section">
        <span className="chateau-sec-kicker">THE VENUE</span>
        <h2 className="chateau-venue-title">{config.venue || "Orangerie du Château"}</h2>
        <p className="chateau-venue-sub">{config.address || "Versailles, France"}</p>

        {!compact ? (
          <a href={mapLink} target="_blank" rel="noopener noreferrer" className="chateau-pill-map-btn">
            <MapPin size={13} />
            <span>OPEN IN MAPS</span>
          </a>
        ) : (
          <span className="chateau-pill-map-btn">
            <MapPin size={13} />
            <span>OPEN IN MAPS</span>
          </span>
        )}
      </section>

      {/* 4. The Countdown with Frosted Glass Badges & Roses */}
      <section className="chateau-countdown-section">
        <span className="chateau-sec-kicker">THE COUNTDOWN</span>
        <div className="chateau-countdown-row">
          <div className="chateau-frosted-circle">
            <span className="count-num">{remaining.days}</span>
            <span className="count-unit">DAYS</span>
          </div>
          <div className="chateau-frosted-circle">
            <span className="count-num">{remaining.hours}</span>
            <span className="count-unit">HOURS</span>
          </div>
          <div className="chateau-frosted-circle">
            <span className="count-num">{remaining.minutes}</span>
            <span className="count-unit">MIN</span>
          </div>
          <div className="chateau-frosted-circle">
            <span className="count-num">{remaining.seconds}</span>
            <span className="count-unit">SEC</span>
          </div>
        </div>

        {/* Bottom Rose Spray */}
        <div className="chateau-roses-footer-art">
          <svg viewBox="0 0 320 60" fill="none" className="roses-banner-svg">
            <circle cx="80" cy="30" r="22" fill="#F4DDD4" opacity="0.8" />
            <circle cx="160" cy="25" r="26" fill="#F8E5DF" opacity="0.9" />
            <circle cx="240" cy="30" r="22" fill="#F4DDD4" opacity="0.8" />
            <path d="M120 30 C130 15, 150 20, 140 35 Z" fill="#9CA894" opacity="0.7" />
            <path d="M180 30 C190 15, 210 20, 200 35 Z" fill="#9CA894" opacity="0.7" />
          </svg>
        </div>
      </section>

      {/* 5. The Day Program Cards */}
      <section className="chateau-program-section">
        <div className="chateau-hosted-by">
          <span>HOSTED BY</span>
          <p>Together with their families</p>
          <span className="gold-dot">♥</span>
        </div>

        <span className="chateau-sec-kicker">THE DAY</span>

        <div className="chateau-timeline-cards">
          <div className="chateau-time-card">
            <div className="time-icon rings">💍</div>
            <div className="time-info">
              <span className="event-time">15:30</span>
              <h4 className="event-name">Ceremony</h4>
              <p className="event-sub">Orangerie Courtyard</p>
            </div>
          </div>

          <div className="chateau-time-card">
            <div className="time-icon cocktail">🍸</div>
            <div className="time-info">
              <span className="event-time">17:00</span>
              <h4 className="event-name">Garden Cocktails</h4>
              <p className="event-sub">Parterre & Fountains</p>
            </div>
          </div>

          <div className="chateau-time-card">
            <div className="time-icon dinner">🍽️</div>
            <div className="time-info">
              <span className="event-time">19:30</span>
              <h4 className="event-name">Dinner & Waltz</h4>
              <p className="event-sub">Grand Salon de Bal</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Dress Code */}
      <section className="chateau-dress-section">
        <span className="chateau-sec-kicker">DRESS CODE</span>
        <h3 className="chateau-dress-title">Formal & Festive Elegance</h3>
        <p className="chateau-dress-desc">
          {config.dress || "Spring pastels, classic evening attire, and warm metallic accents."}
        </p>

        <div className="chateau-swatches-row">
          {[
            { hex: "#C59B7E", name: "Warm Mocha" },
            { hex: "#2E241F", name: "Espresso" },
            { hex: "#F3EDE6", name: "Alabaster" },
            { hex: "#FFFFFF", name: "Ivory White" },
          ].map((s) => (
            <span
              key={s.name}
              className="chateau-swatch"
              style={{ backgroundColor: s.hex }}
              title={s.name}
            />
          ))}
        </div>
      </section>

      {/* 7. Wishlist Accordion */}
      <section className="chateau-wishlist-section">
        <span className="chateau-sec-kicker">WISHLIST</span>
        <button
          type="button"
          className="chateau-wishlist-accordion-btn"
          onClick={() => setWishlistOpen(!wishlistOpen)}
          aria-expanded={wishlistOpen}
        >
          <Gift size={14} color="#a67c68" />
          <span>Open Wishlist · 2 Ideas</span>
          {wishlistOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {wishlistOpen && (
          <div className="chateau-wishlist-content">
            <div className="wish-item">
              <h4>1. Honeymoon Adventure Fund</h4>
              <p>Contributions to our upcoming Mediterranean voyage.</p>
            </div>
            <div className="wish-item">
              <h4>2. Home Botanical Garden</h4>
              <p>Plants and perennials for our family garden.</p>
            </div>
          </div>
        )}
      </section>

      {/* 8. Contacts */}
      <section className="chateau-contacts-section">
        <span className="chateau-sec-kicker">CONTACTS</span>
        <div className="chateau-planner-card">
          <div className="planner-details">
            <h4>Claire — Wedding Coordinator</h4>
            <p>+1 555 011 7234</p>
          </div>
          <Phone size={14} className="planner-phone-icon" />
        </div>
      </section>

      {/* 9. Wishes from Guests */}
      <section className="chateau-wishes-section">
        <span className="chateau-sec-kicker">WISHES FROM GUESTS</span>
        <div className="chateau-quote-card">
          <p>“We can’t wait to celebrate with you — see you on the dance floor!”</p>
          <small>— MARGOT & THÉO</small>
        </div>
        <div className="chateau-quote-card">
          <p>“Wishing you a lifetime of endless laughter and beautiful adventures.”</p>
          <small>— THE HENDERSONS</small>
        </div>
      </section>

      {/* 10. Dark Pill RSVP Button */}
      <section className="chateau-rsvp-section">
        <small className="crafted-tag">CRAFTED WITH ELEGANCE</small>

        <form onSubmit={handleRsvpSubmit} className="chateau-rsvp-box">
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Your full name"
            required
            className="chateau-input"
          />

          <div className="chateau-count-select">
            <span>Guests attending:</span>
            <div className="chateau-stepper">
              <button
                type="button"
                onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
              >
                –
              </button>
              <span>{guestCount}</span>
              <button
                type="button"
                onClick={() => setGuestCount(Math.min(8, guestCount + 1))}
              >
                +
              </button>
            </div>
          </div>

          <button type="submit" className="chateau-dark-rsvp-btn">
            RSVP · CONFIRM ATTENDANCE
          </button>

          {rsvpSent && (
            <p className="chateau-rsvp-confirm">
              ✨ Opening WhatsApp to confirm your RSVP!
            </p>
          )}
        </form>

        <p className="chateau-brand-footer">WWW.ARDHAS.COM</p>
      </section>
    </article>
  );
}
