import { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, MailOpen } from "lucide-react";
import { useReducedMotion } from "framer-motion";

export default function EnvelopeOpening({ config, onOpen, children }) {
  const reducedMotion = useReducedMotion();
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);

  // If user has reduced motion or already opened, show content directly
  if (reducedMotion || opened) {
    return <>{children}</>;
  }

  const triggerOpen = () => {
    if (opening) return;
    setOpening(true);

    // Play subtle audio chime
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.7);
      }
    } catch {}

    // Celebration burst
    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.55 },
      colors: ["#c4a365", "#e8d5b5", "#8a2b3d", "#25665b"],
      disableForReducedMotion: true,
    });

    setTimeout(() => {
      setOpened(true);
      setOpening(false);
      onOpen?.();
    }, 750);
  };

  return (
    <div className={`envelope-experience ${opening ? "is-opening" : ""}`}>
      <div className="envelope-stage">
        <div className="envelope-box">
          {/* Envelope flap */}
          <div className="envelope-flap" />

          {/* Envelope body */}
          <div className="envelope-pocket">
            <div className="envelope-liner" />

            {/* Peeking invitation card */}
            <div className="envelope-card-peek">
              <span className="peek-names">{config.names}</span>
              <small className="peek-tag">{config.eventType.toUpperCase()} · YOU'RE INVITED</small>
            </div>
          </div>

          {/* Wax seal */}
          <button
            className="envelope-wax-seal"
            onClick={triggerOpen}
            aria-label="Crack seal to open invitation"
            title="Click to open invitation"
          >
            <span className="seal-monogram">a✧</span>
            <span className="seal-ripple" />
          </button>
        </div>

        <div className="envelope-prompt">
          <p>You have received an invitation from</p>
          <h3>{config.names}</h3>
          <button className="envelope-open-action" onClick={triggerOpen}>
            <MailOpen size={16} />
            <span>Open Invitation</span>
            <Sparkles size={14} />
          </button>
          <button className="envelope-skip-btn" onClick={() => setOpened(true)}>
            Skip animation
          </button>
        </div>
      </div>
    </div>
  );
}
