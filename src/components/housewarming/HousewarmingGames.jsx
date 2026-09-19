import { useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Bell,
  Check,
  Download,
  Flame,
  RotateCcw,
  Sparkles,
  Timer,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";
import { toPng } from "html-to-image";
import Reveal from "../Reveal";
import "../../styles/housewarming-games.css";

const decorations = [
  { id: "rangoli", label: "Rangoli", symbol: "🏵️" },
  { id: "diya", label: "Diya", symbol: "🪔" },
  { id: "banana", label: "Banana leaves", symbol: "🌿" },
  { id: "mango", label: "Mango leaves", symbol: "🍃" },
  { id: "flowers", label: "Flowers", symbol: "🌼" },
  { id: "coconut", label: "Coconut", symbol: "🥥" },
  { id: "deepam", label: "Deepam", symbol: "🕯️" },
];

function shuffledPieces() {
  const pieces = Array.from({ length: 9 }, (_, i) => i);
  for (let i = pieces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
  }
  if (pieces.every((piece, index) => piece === index))
    [pieces[0], pieces[1]] = [pieces[1], pieces[0]];
  return pieces;
}

function celebrate() {
  confetti({
    particleCount: 110,
    spread: 85,
    origin: { y: 0.65 },
    colors: ["#c8a96a", "#e4bc77", "#9aa985", "#fff8e9"],
    disableForReducedMotion: true,
  });
}

function PuzzlePiece({
  piece,
  index,
  selected,
  image,
  complete,
  onSelect,
  onSwap,
}) {
  const [{ dragging }, drag] = useDrag(
    () => ({
      type: "house-piece",
      item: { index },
      canDrag: !complete,
      collect: (monitor) => ({ dragging: monitor.isDragging() }),
    }),
    [index, complete],
  );
  const [{ over }, drop] = useDrop(
    () => ({
      accept: "house-piece",
      drop: (item) => onSwap(item.index, index),
      canDrop: (item) => !complete && item.index !== index,
      collect: (monitor) => ({ over: monitor.isOver() && monitor.canDrop() }),
    }),
    [index, complete, onSwap],
  );
  return (
    <button
      ref={(node) => {
        drag(drop(node));
      }}
      type="button"
      className={`hwg-piece${selected ? " is-selected" : ""}${over ? " is-over" : ""}`}
      style={{
        backgroundImage: `url("${image}")`,
        backgroundPosition: `${(piece % 3) * 50}% ${Math.floor(piece / 3) * 50}%`,
        opacity: dragging ? 0.35 : 1,
      }}
      aria-label={`Piece ${piece + 1}, position ${index + 1}${piece === index ? ", in place" : ""}`}
      aria-pressed={selected}
      disabled={complete}
      onClick={() => onSelect(index)}
    >
      <span>{piece + 1}</span>
    </button>
  );
}

function HousePuzzle({ houseImage }) {
  const [pieces, setPieces] = useState(shuffledPieces);
  const [selected, setSelected] = useState(null);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(null);
  const [announcement, setAnnouncement] = useState("");
  const complete = pieces.every((piece, index) => piece === index);
  useEffect(() => {
    if (!started || complete) return undefined;
    const interval = window.setInterval(
      () => setSeconds(Math.floor((Date.now() - started) / 1000)),
      1000,
    );
    return () => window.clearInterval(interval);
  }, [started, complete]);
  useEffect(() => {
    if (complete) celebrate();
  }, [complete]);
  function swap(first, second) {
    if (complete || first === second) return;
    if (!started) setStarted(Date.now());
    setPieces((current) => {
      const next = [...current];
      [next[first], next[second]] = [next[second], next[first]];
      return next;
    });
    setMoves((value) => value + 1);
    setSelected(null);
    setAnnouncement(`Swapped positions ${first + 1} and ${second + 1}.`);
  }
  function select(index) {
    if (selected === null) setSelected(index);
    else if (selected === index) setSelected(null);
    else swap(selected, index);
  }
  function reset() {
    setPieces(shuffledPieces());
    setSelected(null);
    setMoves(0);
    setSeconds(0);
    setStarted(null);
    setAnnouncement("A new puzzle is ready.");
  }
  return (
    <article className="hwg-card hwg-puzzle-card">
      <div className="hwg-card-heading">
        <div>
          <span className="hwg-eyebrow">01 / A LITTLE DISCOVERY</span>
          <h3>Piece together our dream.</h3>
        </div>
        <Sparkles size={23} aria-hidden="true" />
      </div>
      <p>
        Drag two pieces to swap them. On your phone, tap one piece, then
        another. Numbers run from left to right.
      </p>
      <div className="hwg-puzzle-layout">
        <div
          className="hwg-board"
          aria-label="House puzzle, nine pieces"
          role="group"
        >
          {pieces.map((piece, index) => (
            <PuzzlePiece
              key={index}
              piece={piece}
              index={index}
              selected={selected === index}
              image={houseImage}
              complete={complete}
              onSelect={select}
              onSwap={swap}
            />
          ))}
        </div>
        <div className={`hwg-puzzle-guide${complete ? " is-complete" : ""}`}>
          <img
            src={houseImage}
            alt={
              complete
                ? "Our home, unlocked by completing the puzzle"
                : "A blurred glimpse of the house to unlock"
            }
            loading="lazy"
          />
          <span>
            {complete
              ? "Our home, revealed"
              : "Complete the puzzle to reveal our home"}
          </span>
          <div className="hwg-stats">
            <span>
              <Timer size={15} aria-hidden="true" /> {Math.floor(seconds / 60)}:
              {String(seconds % 60).padStart(2, "0")}
            </span>
            <span>{moves} moves</span>
          </div>
          <div className="hwg-progress">
            <span
              style={{
                width: `${(pieces.filter((piece, index) => piece === index).length / 9) * 100}%`,
              }}
            />
          </div>
          <small>
            {pieces.filter((piece, index) => piece === index).length} of 9
            pieces in place
          </small>
          <button type="button" className="hwg-text-button" onClick={reset}>
            <RotateCcw size={14} /> Start fresh
          </button>
        </div>
      </div>
      <div className="hwg-sr-only" role="status">
        {announcement}
      </div>
      {complete && (
        <div className="hwg-success" role="status">
          <Check size={24} />
          <h4>You unlocked our new home!</h4>
          <p>A little patience, a little love. That’s how every home begins.</p>
          <a href="#blessings" className="hwg-button">
            Continue celebration <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}
    </article>
  );
}

function DecorationItem({ decoration, selected, onSelect }) {
  const [, drag] = useDrag(
    () => ({ type: "house-decoration", item: { id: decoration.id } }),
    [decoration.id],
  );
  return (
    <button
      ref={(node) => {
        drag(node);
      }}
      type="button"
      className={`hwg-decoration-item${selected ? " is-selected" : ""}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span aria-hidden="true">{decoration.symbol}</span>
      <small>{decoration.label}</small>
    </button>
  );
}

function DecorateHouse({ houseImage }) {
  const [selected, setSelected] = useState("rangoli");
  const [items, setItems] = useState([]);
  const [finished, setFinished] = useState(false);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const stage = useRef(null);
  const serial = useRef(0);
  function add(id, x = 50, y = 77) {
    setItems((current) => [
      ...current.slice(-39),
      {
        id,
        key: serial.current++,
        x: Math.max(6, Math.min(94, x)),
        y: Math.max(8, Math.min(90, y)),
      },
    ]);
    setFinished(false);
    setStatus(
      `${decorations.find((item) => item.id === id).label} added to the entrance.`,
    );
  }
  const [{ over }, drop] = useDrop(
    () => ({
      accept: "house-decoration",
      drop: (item, monitor) => {
        const point = monitor.getClientOffset();
        const rect = stage.current?.getBoundingClientRect();
        if (point && rect)
          add(
            item.id,
            ((point.x - rect.left) / rect.width) * 100,
            ((point.y - rect.top) / rect.height) * 100,
          );
      },
      collect: (monitor) => ({ over: monitor.isOver() }),
    }),
    [],
  );
  async function download() {
    if (saving || !stage.current) return;
    setSaving(true);
    setStatus("Preparing your entrance image…");
    try {
      const url = await toPng(stage.current, {
        pixelRatio: 2,
        filter: (node) => node.dataset?.exportHide !== "true",
      });
      const link = document.createElement("a");
      link.download = "our-welcoming-home.png";
      link.href = url;
      link.click();
      setStatus("Your decorated entrance image is ready.");
    } catch {
      setStatus(
        "This browser could not export the image. Please try again, or take a screenshot.",
      );
    } finally {
      setSaving(false);
    }
  }
  return (
    <article className="hwg-card">
      <div className="hwg-card-heading">
        <div>
          <span className="hwg-eyebrow">02 / MAKE YOURSELF AT HOME</span>
          <h3>An entrance full of joy.</h3>
        </div>
        <Flame size={23} aria-hidden="true" />
      </div>
      <p>
        Choose a little tradition, then tap the entrance to place it. You can
        also drag decorations into the scene.
      </p>
      <div
        className={`hwg-decor-stage${over ? " is-over" : ""}${finished ? " is-finished" : ""}`}
        ref={(node) => {
          stage.current = node;
          drop(node);
        }}
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          add(
            selected,
            ((event.clientX - rect.left) / rect.width) * 100,
            ((event.clientY - rect.top) / rect.height) * 100,
          );
        }}
      >
        <img
          src={houseImage}
          alt="Our house entrance, ready for your decorations"
          loading="lazy"
        />
        <span className="hwg-scene-label">
          Vazhappalli Thekkathil <small>WITH LOVE, FROM YOU</small>
        </span>
        {items.map((item) => (
          <button
            type="button"
            key={item.key}
            className="hwg-placed-item"
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            aria-label={`Remove ${decorations.find((entry) => entry.id === item.id).label}`}
            onClick={(event) => {
              event.stopPropagation();
              setItems((current) =>
                current.filter((entry) => entry.key !== item.key),
              );
              setFinished(false);
            }}
          >
            <span>
              {decorations.find((entry) => entry.id === item.id).symbol}
            </span>
            <i data-export-hide="true">
              <X size={10} />
            </i>
          </button>
        ))}
      </div>
      <div className="hwg-decoration-tray" aria-label="Choose decorations">
        {decorations.map((item) => (
          <DecorationItem
            key={item.id}
            decoration={item}
            selected={selected === item.id}
            onSelect={() => setSelected(item.id)}
          />
        ))}
      </div>
      <div className="hwg-actions">
        <button
          type="button"
          className="hwg-text-button"
          onClick={() => add(selected)}
        >
          Add selected decoration
        </button>
        <button
          type="button"
          className="hwg-text-button"
          disabled={!items.length}
          onClick={() => {
            setItems([]);
            setFinished(false);
            setStatus("Entrance cleared.");
          }}
        >
          <RotateCcw size={14} /> Clear
        </button>
      </div>
      <div className="hwg-actions">
        <button
          type="button"
          className="hwg-button"
          disabled={!items.length}
          onClick={() => {
            setFinished(true);
            celebrate();
          }}
        >
          Finish decorating <Sparkles size={16} />
        </button>
        <button
          type="button"
          className="hwg-text-button"
          onClick={download}
          disabled={saving}
        >
          <Download size={16} /> {saving ? "Preparing…" : "Save image"}
        </button>
      </div>
      {finished && (
        <p className="hwg-finished" role="status">
          Beautiful! Welcome Home!
        </p>
      )}
      <p className="hwg-hint">
        Tap a placed decoration to remove it. Up to 40 decorations.
      </p>
      <p className="hwg-status" role="status">
        {status}
      </p>
    </article>
  );
}

function LittleRituals({ soundEnabled }) {
  const [lit, setLit] = useState(false);
  const [rings, setRings] = useState(0);
  const audio = useRef(null);
  useEffect(
    () => () => {
      audio.current?.close().catch(() => {});
    },
    [],
  );
  useEffect(() => {
    if (!soundEnabled) audio.current?.suspend().catch(() => {});
  }, [soundEnabled]);
  function ringBell() {
    setRings((value) => value + 1);
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const context = audio.current || new AudioContext();
      audio.current = context;
      context.resume().catch(() => {});
      [523.25, 1046.5, 1569.75].forEach((frequency, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0.045 / (index + 1), context.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          context.currentTime + 1.8,
        );
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start();
        oscillator.stop(context.currentTime + 1.9);
        oscillator.onended = () => {
          oscillator.disconnect();
          gain.disconnect();
        };
      });
    } catch {
      /* The visual bell remains available when audio is unsupported. */
    }
  }
  return (
    <div className="hwg-rituals">
      <button type="button" className="hwg-ritual" onClick={ringBell}>
        <Bell key={rings} className={rings ? "hwg-ringing" : ""} size={27} />
        <span>
          Ring the welcome bell
          <small>
            {rings
              ? "May this home echo with happiness."
              : soundEnabled
                ? "A gentle chime to begin. Sound on tap."
                : "A quiet welcome. Enable sound to hear the chime."}
          </small>
        </span>
      </button>
      <button
        type="button"
        className={`hwg-ritual${lit ? " is-lit" : ""}`}
        aria-pressed={lit}
        onClick={() => setLit((value) => !value)}
      >
        <Flame size={29} />
        <span>
          {lit ? "A light for new beginnings" : "Light a little lamp"}
          <small>
            {lit
              ? "May warmth and peace always find their way here."
              : "Leave a little warmth at our doorstep."}
          </small>
        </span>
      </button>
    </div>
  );
}

export default function HousewarmingGames({
  houseImage,
  soundEnabled = false,
}) {
  return (
    <section className="hwg-section">
      <Reveal>
        <div className="hwg-section-heading">
          <span className="hwg-eyebrow">A LITTLE PLAY. A LOT OF LOVE.</span>
          <h2>Play before you enter our home.</h2>
          <p>Every good gathering begins with a smile. Here’s yours.</p>
        </div>
      </Reveal>
      <DndProvider backend={HTML5Backend}>
        <div className="hwg-games-grid">
          <Reveal>
            <HousePuzzle houseImage={houseImage} />
          </Reveal>
          <Reveal delay={0.1}>
            <DecorateHouse houseImage={houseImage} />
          </Reveal>
        </div>
      </DndProvider>
      <Reveal>
        <LittleRituals soundEnabled={soundEnabled} />
      </Reveal>
    </section>
  );
}
