import { useState } from "react";
import {
  MapPin,
  Clock,
  Sparkles,
  ArrowUpRight,
  Send,
  Heart,
  Phone,
  Mail,
  Check,
} from "lucide-react";
import { parseYouTubeUrl } from "../utils/media.js";

export default function ChocolatIvoire({ config, compact = false }) {
  const [guestCount, setGuestCount] = useState(1);
  const [needTransport, setNeedTransport] = useState("no");
  const [guestName, setGuestName] = useState("");
  const [rsvpSent, setRsvpSent] = useState(false);

  const rawNames = config.names || "Jason & Melani";
  const nameParts = rawNames.split(/&|and|\+/i);
  const name1 = nameParts[0]?.trim() || "Jason";
  const name2 = nameParts[1]?.trim() || "Melani";

  const heroImage =
    config.heroImage ||
    "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=85";
  const ytData = parseYouTubeUrl(heroImage);

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    const phone = config.contactPhone || "+91 9048503717";
    const cleanPhone = phone.replace(/[^\d]/g, "");
    const msg = encodeURIComponent(
      `🤎 Wedding RSVP for ${rawNames}\nGuest: ${guestName || "Guest"}\nAttending with ${guestCount} person(s)\nTransportation required: ${needTransport === "yes" ? "Yes" : "No"}\nCan't wait to celebrate with you!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, "_blank");
    setRsvpSent(true);
  };

  return (
    <article className="pinterest-mobile-card chocolat-ivoire-card">
      {/* 1. Ivory Script Masthead */}
      <header className="chocolat-header">
        <h1 className="chocolat-script-names">{rawNames}</h1>
        <div className="chocolat-divider-motif">
          <span className="motif-line" />
          <span className="motif-diamond">✦</span>
          <span className="motif-heart">♥</span>
          <span className="motif-diamond">✦</span>
          <span className="motif-line" />
        </div>
        <p className="chocolat-sub-label">WEDDING INVITATION</p>
      </header>

      {/* 2. Portrait Photo Frame with Ivory Matting */}
      <div className="chocolat-photo-frame">
        {ytData.isYouTube ? (
          <div className="chocolat-yt-wrap">
            <iframe
              src={`https://www.youtube.com/embed/${ytData.videoId}?autoplay=1&mute=1&loop=1&playlist=${ytData.videoId}`}
              title="Couple Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <img
            src={heroImage}
            alt={rawNames}
            className="chocolat-hero-image"
            loading="eager"
          />
        )}
      </div>

      {/* 3. Wedding Day Date Box & Continuous Line Heart */}
      <section className="chocolat-date-section">
        <p className="chocolat-kicker">WEDDING DAY</p>
        <div className="chocolat-date-box">
          <span className="box-label">date</span>
          <span className="box-day">{config.date ? config.date.slice(5) : "24 May"}</span>
          <span className="box-time">{config.time || "11:00"}</span>
        </div>

        {/* Hand-drawn continuous line flourish */}
        <div className="chocolat-flourish-wrap">
          <svg viewBox="0 0 300 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="chocolat-flourish-svg">
            <path
              d="M10 20 C60 20, 110 38, 140 22 C146 17, 150 10, 154 16 C158 22, 149 32, 142 25 C137 19, 143 8, 150 6 C157 4, 163 12, 156 22 C165 24, 210 20, 290 20"
              stroke="#8C6747"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </section>

      {/* 4. Greeting Letter */}
      <section className="chocolat-letter-section">
        <h2 className="chocolat-letter-title">DEAR FAMILY AND FRIENDS!</h2>
        <p className="chocolat-letter-text">
          {config.story ||
            "We are so happy to invite you to share this meaningful day with us. Your presence will make our wedding even more special."}
        </p>
        <p className="chocolat-letter-signoff">
          <span>With love,</span>
          <span className="script-sign">{rawNames}</span>
        </p>
        <span className="chocolat-mini-heart">♥</span>
      </section>

      {/* 5. Calendar Strip with Heart Milestone */}
      <section className="chocolat-calendar-section">
        <h3 className="chocolat-cal-title">MAY 2026</h3>
        <div className="chocolat-cal-grid">
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
            <span key={d} className="cal-day-name">{d}</span>
          ))}
          {["18", "19", "20", "21", "22", "23"].map((n) => (
            <span key={n} className="cal-day-num">{n}</span>
          ))}
          <div className="cal-heart-day">
            <span className="heart-shape">♥</span>
            <span className="heart-num">24</span>
          </div>
        </div>
      </section>

      {/* 6. Serpentine Curvy Timeline Itinerary */}
      <section className="chocolat-itinerary-section">
        <div className="chocolat-serpentine-wrap">
          {/* Curvy Path SVG */}
          <svg className="chocolat-serpentine-svg" viewBox="0 0 280 480" fill="none">
            <path
              d="M 230 10 C 230 40, 60 40, 60 70 C 60 110, 220 110, 220 150 C 220 190, 60 190, 60 230 C 60 270, 220 270, 220 310 C 220 350, 140 370, 140 410 C 140 435, 120 445, 130 455 C 137 462, 145 450, 140 442 C 135 435, 126 444, 134 458"
              stroke="#8C6747"
              strokeWidth="1.4"
              strokeDasharray="4 3"
            />
            {/* Milestone Stop Nodes */}
            <circle cx="60" cy="70" r="4.5" fill="#2D1E18" />
            <circle cx="220" cy="150" r="4.5" fill="#2D1E18" />
            <circle cx="60" cy="230" r="4.5" fill="#2D1E18" />
            <circle cx="220" cy="310" r="4.5" fill="#2D1E18" />
            <circle cx="140" cy="410" r="4.5" fill="#2D1E18" />
          </svg>

          {/* Stops Content */}
          <div className="chocolat-stop stop-1">
            <span className="stop-time">11:00</span>
            <span className="stop-title">GUEST ARRIVAL</span>
          </div>
          <div className="chocolat-stop stop-2">
            <span className="stop-time">13:00</span>
            <span className="stop-title">LUNCH</span>
          </div>
          <div className="chocolat-stop stop-3">
            <span className="stop-time">15:00</span>
            <span className="stop-title">CELEBRATION</span>
          </div>
          <div className="chocolat-stop stop-4">
            <span className="stop-time">18:00</span>
            <span className="stop-title">DINNER</span>
          </div>
          <div className="chocolat-stop stop-5">
            <span className="stop-time">19:00</span>
            <span className="stop-title">END OF THE EVENING</span>
          </div>
        </div>
      </section>

      {/* 7. Where Everything Will Happen: Estate Engraving */}
      <section className="chocolat-venue-section">
        <h2 className="chocolat-section-title">WHERE EVERYTHING WILL HAPPEN</h2>
        <span className="chocolat-dot-motif">♥</span>
        <h3 className="chocolat-estate-name">{config.venue || "Maplewood Estate"}</h3>
        <p className="chocolat-estate-address">
          {config.address || "123 Willow Lane, Greenfield, NY 12345"}
        </p>

        {/* Estate Architectural Illustration */}
        <div className="chocolat-estate-sketch">
          <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="estate-sketch-svg">
            {/* Manor Roof & Walls */}
            <path d="M20 70 L100 20 L180 70 L180 110 L20 110 Z" stroke="#684D3B" strokeWidth="1.2" fill="#FAF6F0" />
            {/* Upper Windows & Dormer */}
            <polygon points="90,40 100,32 110,40 110,55 90,55" stroke="#684D3B" strokeWidth="1" fill="#FFFFFF" />
            <rect x="94" y="42" width="12" height="10" stroke="#684D3B" strokeWidth="0.8" />
            {/* Columns & Porch */}
            <rect x="50" y="70" width="100" height="40" stroke="#684D3B" strokeWidth="1" fill="#FFFFFF" />
            <line x1="65" y1="70" x2="65" y2="110" stroke="#684D3B" strokeWidth="1.2" />
            <line x1="90" y1="70" x2="90" y2="110" stroke="#684D3B" strokeWidth="1.2" />
            <line x1="110" y1="70" x2="110" y2="110" stroke="#684D3B" strokeWidth="1.2" />
            <line x1="135" y1="70" x2="135" y2="110" stroke="#684D3B" strokeWidth="1.2" />
            {/* Door */}
            <rect x="92" y="80" width="16" height="30" stroke="#684D3B" strokeWidth="1" />
            {/* Trees & Shrubbery */}
            <path d="M12 110 C8 95, 10 85, 20 80 C26 78, 30 88, 30 110" stroke="#8C6747" strokeWidth="1" fill="none" />
            <path d="M170 110 C170 85, 175 75, 185 80 C192 84, 194 95, 190 110" stroke="#8C6747" strokeWidth="1" fill="none" />
          </svg>
        </div>

        {!compact ? (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              config.address || config.venue || "Maplewood Estate"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="chocolat-map-btn"
          >
            OPEN MAP
          </a>
        ) : (
          <span className="chocolat-map-btn">OPEN MAP</span>
        )}
      </section>

      {/* 8. Dress Code: Hanging Satin Ribbons on a Line */}
      <section className="chocolat-dress-section">
        <h2 className="chocolat-section-title">DRESS CODE</h2>
        <p className="chocolat-dress-sub">
          {config.dress || "We kindly ask you to support the aesthetic of our wedding with your outfit in neutral colors."}
        </p>

        {/* Satin Bow Ribbons Row */}
        <div className="chocolat-ribbons-container">
          <div className="ribbon-string-line" />
          <div className="ribbons-row">
            {[
              { color: "#4A3528", label: "Mocha Espresso" },
              { color: "#7A5943", label: "Warm Chestnut" },
              { color: "#9E7B5C", label: "Antique Caramel" },
              { color: "#C4A88E", label: "Soft Latte" },
              { color: "#E8DED2", label: "Ivory Silk" },
            ].map((ribbon) => (
              <div key={ribbon.label} className="ribbon-node">
                <div
                  className="ribbon-bow-svg-wrap"
                  title={ribbon.label}
                  style={{ "--ribbon-color": ribbon.color }}
                >
                  <svg viewBox="0 0 36 44" fill="none" className="ribbon-svg">
                    {/* Left Loop */}
                    <path
                      d="M18 12 C10 4, 2 8, 8 16 C12 20, 16 14, 18 12 Z"
                      fill={ribbon.color}
                      opacity="0.95"
                    />
                    {/* Right Loop */}
                    <path
                      d="M18 12 C26 4, 34 8, 28 16 C24 20, 20 14, 18 12 Z"
                      fill={ribbon.color}
                      opacity="0.95"
                    />
                    {/* Center Knot */}
                    <circle cx="18" cy="12" r="3.2" fill={ribbon.color} />
                    {/* Left Tail */}
                    <path
                      d="M16 14 Q10 24 6 38 Q12 34 16 22 Z"
                      fill={ribbon.color}
                      opacity="0.9"
                    />
                    {/* Right Tail */}
                    <path
                      d="M20 14 Q26 24 30 38 Q24 34 20 22 Z"
                      fill={ribbon.color}
                      opacity="0.9"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Wishes & Gifts */}
      <section className="chocolat-wishes-section">
        <h2 className="chocolat-section-title">WISHES</h2>
        <div className="chocolat-wish-card">
          <h4>GIFTS</h4>
          <p>
            Your presence is the greatest gift for us. If you wish to give a gift, monetary gifts or contributions are welcome and appreciated.
          </p>
        </div>
        <div className="chocolat-wish-card">
          <h4>A WISH</h4>
          <p>
            We wish you love, joy and many beautiful moments. Thank you for being a part of our story.
          </p>
        </div>
        <div className="chocolat-flourish-wrap mini">
          <span className="motif-heart">♥</span>
        </div>
      </section>

      {/* 10. With Care For You (Contacts) */}
      <section className="chocolat-care-section">
        <h2 className="chocolat-section-title">WITH CARE FOR YOU</h2>
        <p className="chocolat-care-intro">
          If you have any questions about the wedding, our coordinator will be happy to help.
        </p>

        <div className="chocolat-contact-card">
          <Phone size={14} />
          <div>
            <span className="contact-num">{config.contactPhone || "+1 (555) 987-6543"}</span>
            <span className="contact-mail">wedding@jasonmelani.com</span>
          </div>
        </div>

        <p className="chocolat-planner-label">For organizational inquiries, please contact our planner.</p>
        <div className="chocolat-contact-card planner">
          <Mail size={14} />
          <div>
            <span className="contact-num">+1 (555) 321-0987</span>
            <span className="contact-mail">planner@maplewoodestate.com</span>
          </div>
        </div>
      </section>

      {/* 11. Dark Chocolate Espresso RSVP Card */}
      <section className="chocolat-rsvp-section">
        <div className="chocolat-espresso-ticket">
          <span className="espresso-brand">AreOne</span>
          <h3 className="espresso-title">PLEASE COMPLETE THE FORM</h3>
          <div className="espresso-divider">♥</div>

          <form onSubmit={handleRsvpSubmit} className="espresso-form">
            <div className="espresso-input-group">
              <label>First and last name</label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="espresso-stepper-group">
              <label>Number of guests</label>
              <div className="espresso-stepper">
                <button
                  type="button"
                  onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                >
                  –
                </button>
                <span className="stepper-val">{guestCount}</span>
                <button
                  type="button"
                  onClick={() => setGuestCount(Math.min(6, guestCount + 1))}
                >
                  +
                </button>
              </div>
            </div>

            <div className="espresso-radio-group">
              <label>Do you require a seat on transportation or another service?</label>
              <div className="espresso-radio-options">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="transport"
                    value="yes"
                    checked={needTransport === "yes"}
                    onChange={() => setNeedTransport("yes")}
                  />
                  <span>Yes</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="transport"
                    value="no"
                    checked={needTransport === "no"}
                    onChange={() => setNeedTransport("no")}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            <button type="submit" className="espresso-send-btn">
              <span>SEND</span>
            </button>
          </form>

          {rsvpSent && (
            <p className="espresso-sent-note">
              ✓ Opening WhatsApp to complete your RSVP!
            </p>
          )}

          {/* Scalloped Wavy Transition */}
          <div className="espresso-wave-footer">
            <svg viewBox="0 0 320 30" fill="none" preserveAspectRatio="none">
              <path
                d="M0 0 C80 25, 240 25, 320 0 L320 30 L0 30 Z"
                fill="#FDFBF7"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* 12. Warm Closing Portrait Photo */}
      <footer className="chocolat-closing-footer">
        <span className="closing-heart">♥</span>
        <h3 className="closing-callout">WE ARE WAITING FOR YOU, DEAR ONES!</h3>
        <div className="closing-photo-wrap">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
            alt={rawNames}
            className="closing-photo"
            loading="lazy"
          />
        </div>
      </footer>
    </article>
  );
}
