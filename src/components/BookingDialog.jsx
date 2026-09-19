import { useEffect, useRef, useState } from "react";
import { X, Check, ArrowUpRight } from "lucide-react";
export default function BookingDialog({ onClose }) {
  const ref = useRef(null);
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const el = ref.current;
    el.showModal();
    return () => el.close();
  }, []);
  return (
    <dialog
      aria-label="Website inquiry"
      className="booking-dialog"
      ref={ref}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <button
        className="dialog-close"
        onClick={onClose}
        aria-label="Close inquiry"
      >
        <X />
      </button>
      {sent ? (
        <div className="booking-success" role="status">
          <Check size={36} />
          <h2>A beautiful beginning.</h2>
          <p>
            Your demo inquiry is complete. No message has been sent or saved.
            Connect a business inbox before launch.
          </p>
          <button className="button primary" onClick={onClose}>
            Keep exploring
          </button>
        </div>
      ) : (
        <>
          <span className="eyebrow">LET'S MAKE IT PERSONAL</span>
          <h2>
            Your celebration,
            <br />
            <i>our next creation.</i>
          </h2>
          <p>
            Tell us a little about your special day. This is a demonstration form.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label>
              Your name
              <input
                autoFocus
                required
                name="name"
                autoComplete="name"
                placeholder="Your name"
                maxLength={100}
              />
            </label>
            <label>
              Email address
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>
            <label>
              Tell us about your event
              <textarea
                required
                name="message"
                rows={3}
                placeholder="A wedding in Kerala, an intimate birthday…"
                maxLength={2000}
              />
            </label>
            <button className="button primary" type="submit">
              Preview inquiry <ArrowUpRight size={16} />
            </button>
            <small>Demo only · No personal details are transmitted.</small>
          </form>
        </>
      )}
    </dialog>
  );
}
