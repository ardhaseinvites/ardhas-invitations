import { useEffect, useRef, useState } from "react";
import { Music2, VolumeX, Printer, Download } from "lucide-react";
import InvitationSections from "../sections/InvitationSections";
import { downloadClientPdf } from "../utils/clientExport.js";
import "../styles/invitation.css";
import "../styles/event-invitations.css";
import ArdhasOrderSheet from "../components/ArdhasOrderSheet";
import MinimalLuxury from "./MinimalLuxury";
import ClassicTraditional from "./ClassicTraditional";
import ModernRomantic from "./ModernRomantic";
import FloralElegant from "./FloralElegant";
import RoyalPremium from "./RoyalPremium";
import Contemporary from "./Contemporary";
import CustomTheme from "./CustomTheme";
import CelestialMidnight from "./CelestialMidnight";
import HeritageVelvet from "./HeritageVelvet";
import BohoTerracotta from "./BohoTerracotta";
import GlassmorphicNoir from "./GlassmorphicNoir";
import DeckleRomance from "./DeckleRomance";
import VelureMinimal from "./VelureMinimal";
import PolaroidStory from "./PolaroidStory";
import EstateStory from "./EstateStory";

const templates = {
  minimal: MinimalLuxury,
  classic: ClassicTraditional,
  romantic: ModernRomantic,
  floral: FloralElegant,
  royal: RoyalPremium,
  modern: Contemporary,
  custom: CustomTheme,
  celestial: CelestialMidnight,
  heritage: HeritageVelvet,
  boho: BohoTerracotta,
  glassmorphic: GlassmorphicNoir,
  deckle: DeckleRomance,
  velure: VelureMinimal,
  polaroid: PolaroidStory,
  estate: EstateStory,
};

function MusicButton({ copy }) {
  const [playing, setPlaying] = useState(false);
  const audio = useRef(null);
  const timer = useRef(null);
  function stop() {
    clearInterval(timer.current);
    audio.current?.close();
    audio.current = null;
  }
  useEffect(() => () => stop(), []);
  function toggle() {
    if (playing) {
      stop();
      setPlaying(false);
      return;
    }
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    const ctx = new Audio();
    audio.current = ctx;
    let note = 0;
    const notes = [261.63, 329.63, 392, 523.25, 440, 392, 329.63, 293.66];
    const play = () => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = notes[note++ % notes.length];
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.075, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 1.5);
    };
    ctx.resume();
    play();
    timer.current = setInterval(play, 650);
    setPlaying(true);
  }
  return (
    <button
      onClick={toggle}
      className="invite-music"
      aria-pressed={playing}
      title="Original instrumental demo melody"
    >
      {playing ? <VolumeX size={16} /> : <Music2 size={16} />}
      {playing ? copy.musicPauseLabel : copy.musicPlayLabel}
    </button>
  );
}

function PdfDownloadButton({ config }) {
  const [busy, setBusy] = useState(false);
  const handleDownload = async () => {
    try {
      setBusy(true);
      await downloadClientPdf(config);
    } catch (err) {
      alert(err.message || "Failed to download PDF. Please use the Print fallback button.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <>
      <button
        onClick={() => window.print()}
        title="Print or Save as PDF (in dialog choose 'Save as PDF' & tick 'Background graphics')"
      >
        <Printer size={16} /> Print / Save PDF
      </button>
      <button
        onClick={handleDownload}
        disabled={busy}
        title="Download quick client-side preview PDF with Ardhas Order Sheet"
      >
        <Download size={16} /> {busy ? "Generating..." : "Quick preview PDF"}
      </button>
    </>
  );
}

export default function Invitation({ config, compact = false }) {
  const currentKey = config.style || config.template;
  const isPinterestTemplate =
    ["deckle", "velure", "polaroid", "estate"].includes(currentKey) ||
    ["deckle", "velure", "polaroid", "estate"].includes(config.layout);

  const Template =
    templates[currentKey] ||
    (isPinterestTemplate ? templates[config.layout] : null) ||
    MinimalLuxury;
  const channels = (
    config.color.match(/[a-f\d]{2}/gi) || ["00", "00", "00"]
  ).map((value) => {
    const channel = parseInt(value, 16) / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  const onAccent =
    channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722 > 0.179
      ? "#000000"
      : "#ffffff";
  const fonts = {
    Serif: '"Cormorant Garamond", Georgia, serif',
    Minimal: '"DM Sans", sans-serif',
    Modern: "system-ui, sans-serif",
    Royal: "Georgia, serif",
    Handwritten: '"Italianno", cursive',
  };
  return (
    <article
      className={`invitation invitation-${config.style || config.template} invitation-event-${config.eventType.toLowerCase().replaceAll(" ", "-")} invitation-layout-${config.layout || "editorial"} ${compact ? "invitation-compact" : ""} invitation-bg-${(config.background || "Plain").toLowerCase().replaceAll(" ", "-")}`}
      style={{
        "--invite-accent": config.color,
        "--invite-on-accent": onAccent,
        "--invite-font": fonts[config.font] || fonts.Serif,
      }}
    >
      <Template config={config} compact={compact} />
      {!compact && (
        <>
          <div className="invite-toolbar">
            {config.sections?.music !== false && (
              <MusicButton copy={config.copy} />
            )}
            <PdfDownloadButton config={config} />
          </div>
          {!isPinterestTemplate && (
            <InvitationSections key={config.eventType} config={config} />
          )}
          <ArdhasOrderSheet config={config} />
        </>
      )}
    </article>
  );
}
