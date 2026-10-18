import { useState } from "react";
import {
  Sparkles,
  MapPin,
  Clock,
  Heart,
  Music2,
  VolumeX,
  Send,
  ArrowUpRight,
  Sun,
  Check,
} from "lucide-react";
import { parseYouTubeUrl } from "../utils/media.js";

export default function PichwaiVrindavan({ config, compact = false }) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [blessingText, setBlessingText] = useState("");
  const [blessingsList, setBlessingsList] = useState([
    { name: "Family & Elders", text: "May your union be blessed with eternal love, prosperity and joy." },
  ]);
  const [guestCount, setGuestCount] = useState(2);
  const [attending, setAttending] = useState(true);

  const rawNames = config.names || "Aarav & Diya";
  const names = rawNames.split(/&|and|\+/i);
  const name1 = names[0]?.trim() || "Aarav";
  const name2 = names[1]?.trim() || "Diya";

  const heroImage =
    config.heroImage ||
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=85";
  const ytData = parseYouTubeUrl(heroImage);

  const handleAddBlessing = (e) => {
    e.preventDefault();
    if (!blessingText.trim()) return;
    setBlessingsList((prev) => [
      { name: "Beloved Guest", text: blessingText.trim() },
      ...prev,
    ]);
    setBlessingText("");
  };

  const handleRsvp = (e) => {
    e.preventDefault();
    const phone = config.contactPhone || "+91 9048503717";
    const cleanPhone = phone.replace(/[^\d]/g, "");
    const msg = encodeURIComponent(
      `|| ॐ ||\nRSVP for ${config.names}'s Royal Wedding.\nAttending: ${attending ? "Yes, joyfully" : "Regretfully Unable"}\nGuests: ${guestCount}\nBlessings: Best wishes on your auspicious journey!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, "_blank");
  };

  return (
    <article className="pinterest-mobile-card pichwai-template-card">
      {/* 1. Auspicious Shloka & Surya Crest */}
      <header className="pichwai-header">
        <div className="pichwai-crest">
          <span className="pichwai-om">|| श्री गणेशाय नमः ||</span>
          <div className="pichwai-surya-medallion">
            <Sun size={28} className="pichwai-sun-icon" />
          </div>
          <p className="pichwai-invocation-sub">
            AUSPICIOUS CELEBRATION OF SACRED UNION
          </p>
        </div>

        {/* Couple Names */}
        <div className="pichwai-names-wrap">
          <span className="pichwai-name-top">{name1}</span>
          <span className="pichwai-sangam">✦ संग ✦</span>
          <span className="pichwai-name-bottom">{name2}</span>
        </div>

        <p className="pichwai-event-date">
          {config.date || "Sunday, 24 October 2026"}
        </p>

        {/* 2. Pichwai Floral Archway around Couple Portrait */}
        <div className="pichwai-arch-frame">
          <div className="pichwai-arch-border">
            {ytData.isYouTube ? (
              <div className="pichwai-yt-wrap">
                <iframe
                  src={`https://www.youtube.com/embed/${ytData.videoId}?autoplay=1&mute=1&loop=1&playlist=${ytData.videoId}`}
                  title="Hero Pichwai Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={heroImage}
                alt={config.names}
                className="pichwai-arch-image"
                loading="eager"
              />
            )}
          </div>
          {/* Decorative Corner Lotus Sprigs */}
          <span className="pichwai-lotus-corner top-left">🪷</span>
          <span className="pichwai-lotus-corner top-right">🪷</span>
          <span className="pichwai-lotus-corner bottom-left">🪷</span>
          <span className="pichwai-lotus-corner bottom-right">🪷</span>
        </div>
      </header>

      {/* 3. Sacred Invocation Verse */}
      <section className="pichwai-verse-section">
        <div className="pichwai-shloka-box">
          <p className="pichwai-sanskrit">
            “यथा त्वं सर्वलोकानां पालकः सर्वदा प्रभुः।<br />
            तथैव पालय प्रीत्या दम्पती सर्वदा शुभम्॥”
          </p>
          <p className="pichwai-shloka-trans">
            {config.story ||
              "Bound by sacred mantras and the timeless grace of our families, we joyfully invite you to witness our wedding and shower your auspicious blessings."}
          </p>
        </div>
      </section>

      {/* 4. Auspicious Day Chronogram / Schedule */}
      <section className="pichwai-schedule-section">
        <div className="pichwai-section-badge">
          <span>॥ शुभ कार्यक्रम ॥</span>
        </div>
        <h2 className="pichwai-section-title">The Auspicious Program</h2>

        <div className="pichwai-events-timeline">
          {(config.schedule && config.schedule.length > 0
            ? config.schedule
            : [
                { time: "09:30 AM", title: "Baraat & Swagatam" },
                { time: "10:15 AM", title: "Muhurtham & Sacred Pheras" },
                { time: "01:00 PM", title: "Grand Royal Feast & Sangeet" },
              ]
          ).map((item, idx) => {
            const time = Array.isArray(item) ? item[0] : (item.time || "");
            const label = Array.isArray(item) ? item[1] : (item.title || item.label || "");
            return (
              <div key={idx} className="pichwai-event-item">
                <div className="pichwai-time-pillar">
                  <Clock size={12} />
                  <span>{time}</span>
                </div>
                <div className="pichwai-event-body">
                  <h3>{label}</h3>
                  <p>
                    {idx === 0
                      ? "Welcoming the groom with royal dhol & rose petals."
                      : idx === 1
                        ? "Seven sacred vows around the holy agni."
                        : "Traditional feast, soulful melodies and blessings."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Venue & Temple Portal */}
      <section className="pichwai-venue-section">
        <div className="pichwai-section-badge">
          <span>॥ स्थान निर्देश ॥</span>
        </div>
        <h2 className="pichwai-section-title">{config.venue || "The Heritage Palace"}</h2>
        <p className="pichwai-address-text">
          {config.address || "Kollam, Kerala · Mandapam Pavillion"}
        </p>

        {!compact ? (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              config.address || config.venue || "Kollam, Kerala"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="pichwai-venue-btn"
          >
            <MapPin size={14} />
            <span>OPEN GOOGLE MAPS NAVIGATION</span>
            <ArrowUpRight size={14} />
          </a>
        ) : (
          <span className="pichwai-venue-btn">
            <MapPin size={14} />
            <span>GOOGLE MAPS NAVIGATION</span>
          </span>
        )}
      </section>

      {/* 6. Traditional Silk & Velvet Dress Code */}
      <section className="pichwai-dress-section">
        <div className="pichwai-section-badge">
          <span>॥ परिधान ॥</span>
        </div>
        <h2 className="pichwai-section-title">Royal Silks & Zari Attire</h2>
        <p className="pichwai-dress-desc">
          {config.dress || "Rich Kanjivaram silks, royal velvets, and festive jewel tones."}
        </p>

        <div className="pichwai-palette-row">
          {[
            { color: "#12192C", name: "Midnight Indigo" },
            { color: "#0C3B43", name: "Peacock Teal" },
            { color: "#E5C158", name: "Antique Zari" },
            { color: "#7A1C2E", name: "Royal Crimson" },
            { color: "#1F4E3B", name: "Emerald Brocade" },
          ].map((item) => (
            <div key={item.name} className="pichwai-swatch-box">
              <span
                className="pichwai-swatch-circle"
                style={{ backgroundColor: item.color }}
              />
              <span className="pichwai-swatch-name">{item.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Aashirwad Patra (Interactive Blessings Wall) */}
      <section className="pichwai-blessings-section">
        <div className="pichwai-section-badge">
          <span>॥ आशीर्वाद पत्र ॥</span>
        </div>
        <h2 className="pichwai-section-title">Shower Your Blessings</h2>

        <form onSubmit={handleAddBlessing} className="pichwai-blessing-form">
          <input
            type="text"
            value={blessingText}
            onChange={(e) => setBlessingText(e.target.value)}
            placeholder="Write a warm prayer or blessing for the couple..."
          />
          <button type="submit">
            <Heart size={14} />
            <span>Bless</span>
          </button>
        </form>

        <div className="pichwai-blessings-list">
          {blessingsList.map((item, idx) => (
            <div key={idx} className="pichwai-blessing-card">
              <span className="pichwai-lotus-glyph">🪷</span>
              <p>“{item.text}”</p>
              <small>— {item.name}</small>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Royal RSVP Card */}
      <section className="pichwai-rsvp-section">
        <div className="pichwai-rsvp-card">
          <h3 className="pichwai-rsvp-title">॥ उपस्थिती सूचना ॥</h3>
          <p className="pichwai-rsvp-sub">Please Confirm Your Gracious Presence</p>

          <form onSubmit={handleRsvp} className="pichwai-rsvp-form">
            <div className="pichwai-btn-toggle">
              <button
                type="button"
                className={attending ? "selected" : ""}
                onClick={() => setAttending(true)}
              >
                {attending && <Check size={13} />} उपस्थित (Attending)
              </button>
              <button
                type="button"
                className={!attending ? "selected" : ""}
                onClick={() => setAttending(false)}
              >
                {!attending && <Check size={13} />} क्षमाप्रार्थी (Unable)
              </button>
            </div>

            {attending && (
              <div className="pichwai-counter">
                <span>अतिथि संख्या (Guests):</span>
                <div className="pichwai-counter-btns">
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                  >
                    –
                  </button>
                  <strong>{guestCount}</strong>
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <button type="submit" className="pichwai-rsvp-send">
              <Send size={14} />
              <span>CONFIRM VIA WHATSAPP</span>
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="pichwai-footer">
        <p className="pichwai-namaste">॥ सस्नेह निमंत्रण ॥</p>
        <p className="pichwai-family-signoff">From our families to yours</p>
        <small className="pichwai-trademark">ARDHAS ROYAL STATIONERY</small>
      </footer>
    </article>
  );
}
