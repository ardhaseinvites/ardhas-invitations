import { useState } from "react";
import {
  MapPin,
  Clock,
  Sparkles,
  ArrowUpRight,
  Send,
  Heart,
  Check,
} from "lucide-react";

export default function AtelierTriptych({ config, compact = false }) {
  const [attending, setAttending] = useState(true);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [drinks, setDrinks] = useState({
    redWine: false,
    whiteWine: true,
    champagne: true,
    whiskey: false,
    nonAlcoholic: false,
  });
  const [rsvpSent, setRsvpSent] = useState(false);

  const rawNames = config.names || "Danil & Elena";
  const dateObj = new Date(config.date || "2026-06-21");
  const dayStr = String(dateObj.getDate()).padStart(2, "0") || "21";
  const monthStr = String(dateObj.getMonth() + 1).padStart(2, "0") || "06";
  const yearStr = String(dateObj.getFullYear()).slice(-2) || "26";

  const triptychPhotos = [
    "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
  ];

  const handleToggleDrink = (key) => {
    setDrinks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    const phone = config.contactPhone || "+91 9048503717";
    const cleanPhone = phone.replace(/[^\d]/g, "");
    const selectedDrinks = Object.entries(drinks)
      .filter(([_, val]) => val)
      .map(([k]) => k.replace(/([A-Z])/g, " $1").toLowerCase())
      .join(", ");

    const msg = encodeURIComponent(
      `💍 Wedding RSVP for ${rawNames}\nGuest: ${guestName || "Guest"}\nPhone: ${guestPhone || "N/A"}\nAttending: ${attending ? "Yes, joyfully!" : "Regretfully cannot attend"}\nBeverage preferences: ${selectedDrinks || "Any"}\nLooking forward to the celebration!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, "_blank");
    setRsvpSent(true);
  };

  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    config.address || config.venue || "Kollam, Kerala"
  )}`;

  return (
    <article className="pinterest-mobile-card atelier-triptych-card">
      {/* 1. Save The Date Callout */}
      <header className="atelier-header">
        <h2 className="atelier-script-kicker">Save The Date</h2>

        {/* 3-Photo Triptych Date Strip with Numerals */}
        <div className="atelier-triptych-strip">
          <div className="triptych-pane pane-1">
            <img src={triptychPhotos[0]} alt="Day" loading="eager" />
            <span className="triptych-num">{dayStr}</span>
          </div>
          <div className="triptych-pane pane-2">
            <img src={triptychPhotos[1]} alt="Month" loading="eager" />
            <span className="triptych-num">{monthStr}</span>
          </div>
          <div className="triptych-pane pane-3">
            <img src={triptychPhotos[2]} alt="Year" loading="eager" />
            <span className="triptych-num">{yearStr}</span>
          </div>
        </div>

        {/* Couple Names */}
        <h1 className="atelier-couple-names">{rawNames}</h1>
        <p className="atelier-sub-married">ARE GETTING MARRIED</p>
      </header>

      {/* 2. Dear Guests Letter */}
      <section className="atelier-letter-block">
        <h3 className="atelier-block-heading">Dear Family & Friends!</h3>
        <p className="atelier-letter-body">
          {config.story ||
            "One special day this year belongs to our love, and we want to spend it surrounded by our dearest family and friends. With immense joy, we invite you to share our happiness and celebrate with us!"}
        </p>

        {/* Mini Calendar Month */}
        <div className="atelier-mini-calendar">
          <p className="mini-cal-month">June 2026</p>
          <div className="mini-cal-grid">
            {["MO", "TU", "WE", "TH", "FR", "SA", "SU"].map((d) => (
              <span key={d} className="mini-cal-th">{d}</span>
            ))}
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"].map((n) => (
              <span key={n} className="mini-cal-td">{n}</span>
            ))}
            <div className="mini-cal-heart-cell">
              <span className="cal-ring-heart">♡</span>
              <span className="cal-num-bold">21</span>
            </div>
            {["22", "23", "24", "25", "26", "27", "28", "29", "30"].map((n) => (
              <span key={n} className="mini-cal-td">{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Ceremony Card with Line-Art Rings */}
      <section className="atelier-event-card">
        <div className="atelier-lineart-icon">
          <svg viewBox="0 0 48 48" fill="none" className="lineart-rings-svg">
            {/* Intertwined Wedding Rings */}
            <circle cx="20" cy="26" r="12" stroke="#8C8275" strokeWidth="1.8" />
            <circle cx="28" cy="22" r="12" stroke="#8C8275" strokeWidth="1.8" />
            <path d="M28 10 L30 8 L32 10 L30 12 Z" fill="#8C8275" />
          </svg>
        </div>

        <h3 className="atelier-card-title">Ceremony</h3>
        <div className="atelier-card-datetime">
          <span>{dayStr}.{monthStr}</span>
          <span className="bar">|</span>
          <span>{config.time || "13:30"}</span>
        </div>
        <p className="atelier-card-address">{config.address || "St. Michael's Chapel · Waterfront Avenue, 18A"}</p>

        {!compact ? (
          <a href={mapLink} target="_blank" rel="noopener noreferrer" className="atelier-sage-pill">
            VIEW ON MAP
          </a>
        ) : (
          <span className="atelier-sage-pill">VIEW ON MAP</span>
        )}
      </section>

      {/* 4. Banquet Card with Line-Art Champagne Flutes */}
      <section className="atelier-event-card">
        <div className="atelier-lineart-icon">
          <svg viewBox="0 0 48 48" fill="none" className="lineart-flutes-svg">
            {/* Left Flute */}
            <path d="M16 8 Q16 22 20 25 L20 38 L14 40 L26 40 L20 38" stroke="#8C8275" strokeWidth="1.8" strokeLinecap="round" />
            {/* Right Flute Clinking */}
            <path d="M32 8 Q32 22 28 25 L28 38 L22 40 L34 40 L28 38" stroke="#8C8275" strokeWidth="1.8" strokeLinecap="round" />
            {/* Clink Sparkles */}
            <circle cx="24" cy="14" r="1.5" fill="#8C8275" />
            <circle cx="22" cy="10" r="1" fill="#8C8275" />
            <circle cx="26" cy="18" r="1" fill="#8C8275" />
          </svg>
        </div>

        <h3 className="atelier-card-title">Banquet & Celebration</h3>
        <div className="atelier-card-datetime">
          <span>{dayStr}.{monthStr}</span>
          <span className="bar">|</span>
          <span>17:00</span>
        </div>
        <p className="atelier-card-venue">{config.venue || "The Grand Loft Pavilion"}</p>
        <p className="atelier-card-address">{config.address || "Riverside Promenade, 26"}</p>

        {!compact ? (
          <a href={mapLink} target="_blank" rel="noopener noreferrer" className="atelier-sage-pill">
            VIEW ON MAP
          </a>
        ) : (
          <span className="atelier-sage-pill">VIEW ON MAP</span>
        )}
      </section>

      {/* 5. Dress Code Card with Line-Art Couple & Nude Swatches */}
      <section className="atelier-dress-card">
        <div className="atelier-lineart-icon">
          <svg viewBox="0 0 48 48" fill="none" className="lineart-couple-svg">
            {/* Groom Line */}
            <circle cx="20" cy="12" r="4" stroke="#8C8275" strokeWidth="1.5" />
            <path d="M16 22 L16 38 M24 22 L24 38 M16 22 L24 22" stroke="#8C8275" strokeWidth="1.5" />
            {/* Bride Line */}
            <circle cx="30" cy="14" r="3.8" stroke="#8C8275" strokeWidth="1.5" />
            <path d="M26 22 Q30 30 36 38 L26 38 Q29 30 26 22" stroke="#8C8275" strokeWidth="1.5" fill="#F4EFEB" />
          </svg>
        </div>

        <h3 className="atelier-card-title">Dress Code</h3>
        <p className="atelier-dress-text">
          {config.dress || "We would be so glad if your celebratory outfits match our evening's neutral color palette."}
        </p>

        {/* 6 Circular Gradient Nude/Neutral Dots */}
        <div className="atelier-swatch-row">
          {[
            { hex: "#F3EDE6", name: "Alabaster" },
            { hex: "#E4D7C8", name: "Champagne Nude" },
            { hex: "#CEBEAE", name: "Warm Linen" },
            { hex: "#AB9987", name: "Taupe Stone" },
            { hex: "#7E6E5E", name: "Cocoa Mocha" },
            { hex: "#433830", name: "Dark Espresso" },
          ].map((s) => (
            <span
              key={s.name}
              className="atelier-swatch-dot"
              style={{ backgroundColor: s.hex }}
              title={s.name}
            />
          ))}
        </div>
      </section>

      {/* 6. Details / "Instead of Flowers" Gift Note */}
      <section className="atelier-details-card">
        <div className="atelier-lineart-icon">
          <svg viewBox="0 0 48 30" fill="none" className="lineart-infinity-svg">
            <path
              d="M14 15 C8 7, 2 15, 8 21 C14 27, 24 15, 24 15 C24 15, 34 3, 40 9 C46 15, 40 23, 34 15 C28 7, 14 15, 14 15 Z"
              stroke="#8C8275"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <h3 className="atelier-card-title">Details & Wishes</h3>
        <p className="atelier-details-text">
          We do not wish to burden you with gifts. If you would like to congratulate us, your contributions to our young family's future adventures or a favorite bottle of wine for our cellar will be a wonderful compliment.
        </p>
      </section>

      {/* 7. Guest RSVP Questionnaire with Drink Preferences */}
      <section className="atelier-rsvp-card">
        <h3 className="atelier-card-title">Guest Questionnaire</h3>
        <p className="atelier-rsvp-deadline">Kindly confirm your presence by June 1, 2026</p>

        <form onSubmit={handleRsvpSubmit} className="atelier-rsvp-form">
          <div className="atelier-field">
            <label>Full Name</label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>

          <div className="atelier-field">
            <label>Phone Number</label>
            <input
              type="tel"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              placeholder="+91 90485 03717"
            />
          </div>

          <div className="atelier-field">
            <label>Will you be attending?</label>
            <div className="atelier-radio-group">
              <button
                type="button"
                className={`atelier-choice-btn ${attending ? "selected" : ""}`}
                onClick={() => setAttending(true)}
              >
                {attending && <Check size={13} />} Yes, with pleasure
              </button>
              <button
                type="button"
                className={`atelier-choice-btn ${!attending ? "selected" : ""}`}
                onClick={() => setAttending(false)}
              >
                {!attending && <Check size={13} />} Regretfully cannot
              </button>
            </div>
          </div>

          <div className="atelier-field">
            <label>Your Beverage Preferences</label>
            <div className="atelier-drinks-grid">
              {[
                ["redWine", "Red Wine"],
                ["whiteWine", "White Wine"],
                ["champagne", "Champagne"],
                ["whiskey", "Whiskey / Cognac"],
                ["nonAlcoholic", "Non-alcoholic drinks"],
              ].map(([key, label]) => (
                <label key={key} className="drink-check-label">
                  <input
                    type="checkbox"
                    checked={drinks[key]}
                    onChange={() => handleToggleDrink(key)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="atelier-submit-btn">
            <Send size={14} />
            <span>SUBMIT RSVP VIA WHATSAPP</span>
          </button>

          {rsvpSent && (
            <p className="atelier-confirm-text">
              ✨ Opening WhatsApp to transmit your response!
            </p>
          )}
        </form>

        <div className="atelier-closing-sign">
          <p className="closing-wait">We are waiting for you with love!</p>
          <p className="closing-script-names">{rawNames}</p>
        </div>
      </section>
    </article>
  );
}
