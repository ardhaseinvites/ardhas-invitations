import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ArrowUpRight,
  Check,
  CheckCheck,
  ChevronDown,
  ImagePlus,
  Monitor,
  Plus,
  RotateCcw,
  Search,
  Smartphone,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useInvitation } from "../context/InvitationContext";
import { eventTypes, getEventTemplates } from "../data/content";
import Invitation from "../templates/Invitation";
import "../styles/customizer.css";

const fonts = ["Serif", "Minimal", "Modern", "Royal", "Handwritten"];
const backgrounds = [
  "Plain",
  "Gradient",
  "Floral",
  "Marble",
  "Glass",
  "Traditional Pattern",
  "Custom Image",
];
const decorations = [
  "Flowers",
  "Leaves",
  "Sparkles",
  "Lanterns",
  "Butterflies",
  "Hearts",
  "Temple Pattern",
];
const swatches = [
  "#C8A96A",
  "#B8777F",
  "#7C907C",
  "#7B3349",
  "#25665B",
  "#405A91",
];
const editorTabs = ["Content", "Design", "Sections"];
const readable = (value) =>
  value
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());
const newId = () => crypto.randomUUID();

function ControlGroup({ title, number, children }) {
  return (
    <section className="customizer-group">
      <h2>
        <span>{number}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Accordion({ title, hint, children, open = false }) {
  return (
    <details className="editor-accordion" open={open || undefined}>
      <summary>
        {title}
        <ChevronDown size={14} />
      </summary>
      <div className="editor-accordion-body">
        {hint && <p className="editor-hint">{hint}</p>}
        {children}
      </div>
    </details>
  );
}

function TextField({
  label,
  value,
  onChange,
  multiline = false,
  type = "text",
  ...props
}) {
  const control = {
    value: value ?? "",
    onChange: (event) => onChange(event.target.value),
    ...props,
  };
  return (
    <label className="editor-field">
      {label}
      {multiline ? (
        <textarea rows={3} {...control} />
      ) : (
        <input type={type} {...control} />
      )}
    </label>
  );
}

function ImageField({ label, value, onChange }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const sequence = useRef(0);
  const fileInput = useRef(null);
  const latestChange = useRef(onChange);
  latestChange.current = onChange;
  useEffect(
    () => () => {
      sequence.current++;
    },
    [],
  );
  const change = (next) => {
    sequence.current++;
    setBusy(false);
    setError("");
    onChange(next);
  };
  const upload = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const ticket = ++sequence.current;
    setBusy(false);
    setError("");
    if (
      !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
        file.type,
      )
    ) {
      setError("Choose a JPG, PNG, WebP or GIF image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Choose an image no larger than 5 MB.");
      return;
    }
    setBusy(true);
    const reader = new FileReader();
    reader.onload = () => {
      if (ticket !== sequence.current) return;
      const check = new Image();
      check.onload = () => {
        if (ticket !== sequence.current) return;
        latestChange.current(reader.result);
        setBusy(false);
      };
      check.onerror = () => {
        if (ticket !== sequence.current) return;
        setError("This file could not be opened as an image.");
        setBusy(false);
      };
      check.src = reader.result;
    };
    reader.onerror = () => {
      if (ticket !== sequence.current) return;
      setError("We could not read this image. Please try another.");
      setBusy(false);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="editor-image-field">
      <TextField
        label={label + " URL"}
        value={value?.startsWith("data:") ? "" : value}
        onChange={change}
        placeholder={
          value?.startsWith("data:")
            ? "Local image selected · paste a URL to replace"
            : "https://…"
        }
      />
      {value && <img src={value} alt={label + " thumbnail"} loading="lazy" />}
      <div className="editor-image-actions">
        <button
          type="button"
          className="editor-small-button"
          onClick={() => fileInput.current?.click()}
        >
          <ImagePlus size={14} />
          {busy ? "Reading image…" : value ? "Replace image" : "Upload image"}
        </button>
        {value && (
          <button
            type="button"
            className="editor-small-button"
            onClick={() => change("")}
          >
            <Trash2 size={13} />
            Remove
          </button>
        )}
      </div>
      <input
        ref={fileInput}
        className="editor-file-input"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        aria-label={"Upload " + label.toLowerCase()}
        onChange={upload}
      />
      <p className="editor-hint">
        JPG, PNG, WebP or GIF · up to 5 MB. Images stay in this session.
      </p>
      {error && (
        <p className="editor-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function Repeater({ label, items = [], fields, onChange, image = false }) {
  const edit = (id, key, value) =>
    onChange(
      items.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    );
  const move = (index, direction) => {
    const reordered = [...items];
    [reordered[index], reordered[index + direction]] = [
      reordered[index + direction],
      reordered[index],
    ];
    onChange(reordered);
  };
  return (
    <div className="editor-repeater">
      {items.map((item, index) => (
        <div className="editor-repeat-card" key={item.id}>
          <div className="editor-repeat-heading">
            <strong>
              {label} {index + 1}
            </strong>
            <div>
              <button
                type="button"
                disabled={index === 0}
                onClick={() => move(index, -1)}
                aria-label={
                  "Move " + label.toLowerCase() + " " + (index + 1) + " up"
                }
              >
                <ArrowUp size={13} />
              </button>
              <button
                type="button"
                disabled={index === items.length - 1}
                onClick={() => move(index, 1)}
                aria-label={
                  "Move " + label.toLowerCase() + " " + (index + 1) + " down"
                }
              >
                <ArrowDown size={13} />
              </button>
              <button
                type="button"
                onClick={() =>
                  onChange(items.filter((entry) => entry.id !== item.id))
                }
                aria-label={"Remove " + label.toLowerCase() + " " + (index + 1)}
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
          {image && (
            <ImageField
              label="Gallery image"
              value={item.src}
              onChange={(value) => edit(item.id, "src", value)}
            />
          )}
          {fields.map(({ key, label: fieldLabel, ...options }) => (
            <TextField
              key={key}
              label={fieldLabel}
              value={item[key]}
              onChange={(value) => edit(item.id, key, value)}
              {...options}
            />
          ))}
        </div>
      ))}
      {!items.length && (
        <p className="editor-hint">
          Your collection is empty. Add your first {label.toLowerCase()} below.
        </p>
      )}
      <button
        className="editor-add-button"
        type="button"
        onClick={() =>
          onChange([
            ...items,
            {
              id: newId(),
              ...(image ? { src: "" } : {}),
              ...Object.fromEntries(fields.map(({ key }) => [key, ""])),
            },
          ])
        }
      >
        <Plus size={14} />
        Add {label.toLowerCase()}
      </button>
    </div>
  );
}

export default function Customizer() {
  const { config, updateConfig, applyTemplate, resetConfig, selectEvent } =
    useInvitation();
  const [params] = useSearchParams();
  const [device, setDevice] = useState("desktop");
  const [tab, setTab] = useState("Content");
  const [copySearch, setCopySearch] = useState("");
  const [activeCopyKey, setActiveCopyKey] = useState(null);
  const tabButtons = useRef([]);
  const [showReset, setShowReset] = useState(false);
  const [uploadGeneration, setUploadGeneration] = useState(0);
  const initialSelection = useRef({
    event: params.get("event"),
    theme: params.get("theme"),
  });
  useEffect(() => {
    const { event, theme } = initialSelection.current;
    if (
      event &&
      eventTypes.some(
        (item) => (typeof item === "string" ? item : item.value) === event,
      )
    )
      selectEvent(event);
    if (theme) applyTemplate(theme);
    // Apply the gallery link once. Later edits belong to the client.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const field = (key) => ({
    value: config[key] || "",
    onChange: (value) => updateConfig({ [key]: value }),
  });
  const collection = (key) => ({
    items: config[key] || [],
    onChange: (items) => updateConfig({ [key]: items }),
  });
  const templates = getEventTemplates(config.eventType);
  const editKey = config.eventType + "-" + uploadGeneration;
  const navigateTabs = (event, index) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % editorTabs.length;
    else if (event.key === "ArrowLeft")
      next = (index + editorTabs.length - 1) % editorTabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = editorTabs.length - 1;
    else return;
    event.preventDefault();
    setTab(editorTabs[next]);
    tabButtons.current[next]?.focus();
  };

  return (
    <main className="customizer" id="main-content">
      <header className="customizer-topbar">
        <Link to="/" className="customizer-brand">
          <ArrowLeft size={17} />
          <span>
            Ardhas<span className="brand-period">.</span>
          </span>
          <span className="studio-label">DESIGN STUDIO</span>
        </Link>
        <div className="customizer-top-actions">
          <span className="session-label">
            <CheckCheck size={15} />
            Changes saved in this session
          </span>
          <Link className="customizer-preview-link" to="/preview">
            Open invitation <ArrowUpRight size={16} />
          </Link>
        </div>
      </header>
      <div className="customizer-workspace">
        <aside
          className="customizer-sidebar"
          aria-label="Invitation customization"
        >
          <div className="customizer-intro">
            <span className="studio-eyebrow">YOUR CELEBRATION, YOUR WAY</span>
            <h1>A little more you.</h1>
            <p>
              Every occasion deserves its own design. Make every word and image
              yours.
            </p>
          </div>
          <ControlGroup number="01" title="Start with your occasion">
            <label className="editor-field">
              Event type
              <div className="customizer-select">
                <select
                  value={config.eventType}
                  onChange={(event) => {
                    selectEvent(event.target.value);
                    setShowReset(false);
                  }}
                >
                  {eventTypes.map((event) => (
                    <option
                      key={typeof event === "string" ? event : event.value}
                      value={typeof event === "string" ? event : event.value}
                    >
                      {typeof event === "string" ? event : event.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} />
              </div>
            </label>
            <p className="editor-hint">
              Each occasion has its own templates and content. Your edits are
              remembered when you switch events in this session.
            </p>
            <div className="customizer-theme-grid">
              {templates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  className={
                    "customizer-theme " +
                    (config.template === template.id ? "selected" : "")
                  }
                  onClick={() => applyTemplate(template.id)}
                  aria-pressed={config.template === template.id}
                  title={template.description}
                >
                  <span
                    className={"theme-color theme-color-" + template.style}
                    style={{ backgroundColor: template.color }}
                  >
                    <span>
                      {template.layout === "birthday"
                        ? "Make a wish"
                        : config.eventType}
                    </span>
                    {config.template === template.id && <Check size={13} />}
                  </span>
                  <span>{template.name}</span>
                </button>
              ))}
            </div>
          </ControlGroup>
          <div
            className="editor-tabs"
            role="tablist"
            aria-label="Customization category"
          >
            {editorTabs.map((name, index) => (
              <button
                key={name}
                ref={(node) => {
                  tabButtons.current[index] = node;
                }}
                type="button"
                role="tab"
                id={"editor-tab-" + name}
                aria-controls="editor-panel"
                aria-selected={tab === name}
                tabIndex={tab === name ? 0 : -1}
                onKeyDown={(event) => navigateTabs(event, index)}
                onClick={() => setTab(name)}
              >
                {name}
              </button>
            ))}
          </div>
          <section
            key={editKey}
            className="customizer-group editor-tab-panel"
            role="tabpanel"
            id="editor-panel"
            aria-labelledby={"editor-tab-" + tab}
            tabIndex={0}
          >
            {tab === "Content" && (
              <>
                <Accordion title="Names, date & story" open>
                  <TextField
                    label="Names / family / host"
                    {...field("names")}
                  />
                  {config.eventType === "Birthday" && (
                    <TextField
                      label="Age / birthday number"
                      {...field("age")}
                    />
                  )}
                  {config.eventType === "Anniversary" && (
                    <TextField
                      label="Anniversary milestone"
                      {...field("milestone")}
                    />
                  )}
                  <div className="customizer-field-pair">
                    <TextField
                      label="Event date"
                      type="date"
                      {...field("date")}
                    />
                    <TextField
                      label="Event time"
                      type="time"
                      {...field("time")}
                    />
                  </div>
                  <TextField
                    label="Time zone (UTC offset, e.g. +05:30)"
                    {...field("timezone")}
                    placeholder="+05:30"
                    pattern="[+-](0[0-9]|1[0-4]):[0-5][0-9]"
                  />
                  <TextField
                    label="Your story / occasion introduction"
                    multiline
                    {...field("story")}
                  />
                </Accordion>
                <Accordion title="Venue & directions">
                  <TextField label="Venue name" {...field("venue")} />
                  <TextField
                    label="Full address"
                    multiline
                    {...field("address")}
                  />
                  <TextField
                    label="Google Maps search / coordinates"
                    {...field("mapQuery")}
                    placeholder="Venue, city or latitude, longitude"
                  />
                  <TextField
                    label="Directions link (optional)"
                    {...field("mapUrl")}
                    placeholder="https://maps.google.com/…"
                  />
                  <p className="editor-hint">
                    A directions link takes priority. Otherwise the map searches
                    for your location.
                  </p>
                  <TextField label="Dress code" {...field("dressCode")} />
                </Accordion>
                <Accordion title="Photos & video">
                  <ImageField label="Welcome image" {...field("heroImage")} />
                  <TextField
                    label="Welcome video URL (optional MP4)"
                    {...field("heroVideoUrl")}
                    placeholder="https://…/film.mp4"
                  />
                  <ImageField label="Video cover" {...field("videoPoster")} />
                  <TextField
                    label="Video URL (YouTube or MP4)"
                    {...field("videoUrl")}
                    placeholder="https://www.youtube.com/watch?v=…"
                  />
                  <p className="editor-hint">
                    Use publicly accessible image and video links. Uploaded
                    photos are previews stored in memory.
                  </p>
                </Accordion>
                <Accordion
                  title={
                    "Gallery · " + (config.gallery?.length || 0) + " photos"
                  }
                  hint="Replace photos, add captions and arrange your gallery."
                >
                  <Repeater
                    label="Photo"
                    image
                    {...collection("gallery")}
                    fields={[
                      {
                        key: "alt",
                        label: "Photo description / accessibility text",
                      },
                    ]}
                  />
                </Accordion>
                <Accordion title="Story memories">
                  <Repeater
                    label="Memory"
                    {...collection("memories")}
                    fields={[
                      { key: "title", label: "Title / date" },
                      { key: "text", label: "Memory", multiline: true },
                    ]}
                  />
                </Accordion>
                <Accordion title="Schedule">
                  <Repeater
                    label="Activity"
                    {...collection("schedule")}
                    fields={[
                      { key: "time", label: "Display time" },
                      { key: "title", label: "Activity title" },
                      { key: "text", label: "Details", multiline: true },
                    ]}
                  />
                </Accordion>
                <Accordion title="Guest wishes">
                  <Repeater
                    label="Wish"
                    {...collection("wishes")}
                    fields={[
                      { key: "quote", label: "Message", multiline: true },
                      { key: "author", label: "Guest name" },
                    ]}
                  />
                </Accordion>
                <Accordion title="Gift registry">
                  <Repeater
                    label="Gift option"
                    {...collection("registry")}
                    fields={[
                      { key: "title", label: "Title" },
                      {
                        key: "description",
                        label: "Description",
                        multiline: true,
                      },
                      { key: "url", label: "Website link" },
                    ]}
                  />
                </Accordion>
                <Accordion title="Family & contact details">
                  <Repeater
                    label="Contact"
                    {...collection("contacts")}
                    fields={[
                      { key: "name", label: "Name" },
                      { key: "role", label: "Relationship / role" },
                      {
                        key: "phone",
                        label: "Phone with country code",
                        type: "tel",
                      },
                      { key: "email", label: "Email", type: "email" },
                    ]}
                  />
                </Accordion>
                <Accordion
                  title="All invitation text"
                  hint="Edit every heading, button, label and message in your invitation. Clear a field to leave that text blank."
                >
                  <label className="editor-copy-search">
                    <Search size={14} />
                    <input
                      type="search"
                      aria-label="Find invitation text"
                      placeholder="Find a heading, label or phrase…"
                      value={copySearch}
                      onChange={(event) => {
                        setCopySearch(event.target.value);
                        setActiveCopyKey(null);
                      }}
                    />
                  </label>
                  {Object.entries(config.copy || {})
                    .filter(
                      ([key, value]) =>
                        key === activeCopyKey ||
                        (readable(key) + " " + value)
                          .toLowerCase()
                          .includes(copySearch.toLowerCase()),
                    )
                    .map(([key, value]) => (
                      <TextField
                        key={key}
                        label={readable(key)}
                        value={value}
                        multiline
                        rows={2}
                        onFocus={() => setActiveCopyKey(key)}
                        onBlur={() => setActiveCopyKey(null)}
                        onChange={(text) =>
                          updateConfig({
                            copy: { ...config.copy, [key]: text },
                          })
                        }
                      />
                    ))}
                  {Object.entries(config.copy || {}).every(
                    ([key, value]) =>
                      key !== activeCopyKey &&
                      !(readable(key) + " " + value)
                        .toLowerCase()
                        .includes(copySearch.toLowerCase()),
                  ) && (
                    <p className="editor-hint">
                      No matching text. Try another word.
                    </p>
                  )}
                </Accordion>
              </>
            )}
            {tab === "Design" && (
              <>
                <label className="editor-field" htmlFor="primary-color">
                  Signature color
                </label>
                <div className="customizer-swatches">
                  {swatches.map((color) => (
                    <button
                      key={color}
                      type="button"
                      style={{ backgroundColor: color }}
                      onClick={() => updateConfig({ color })}
                      aria-label={"Use color " + color}
                      aria-pressed={
                        config.color?.toLowerCase() === color.toLowerCase()
                      }
                    >
                      {config.color?.toLowerCase() === color.toLowerCase() && (
                        <Check size={15} />
                      )}
                    </button>
                  ))}
                  <input
                    id="primary-color"
                    type="color"
                    value={config.color || "#C8A96A"}
                    onChange={(event) =>
                      updateConfig({ color: event.target.value })
                    }
                    aria-label="Choose any signature color"
                  />
                </div>
                {[
                  { key: "font", title: "Font style", options: fonts },
                  {
                    key: "background",
                    title: "Background style",
                    options: backgrounds,
                  },
                ].map(({ key, title, options }) => (
                  <label className="editor-field" key={key}>
                    {title}
                    <div className="customizer-select">
                      <select
                        value={config[key]}
                        onChange={(event) =>
                          updateConfig({ [key]: event.target.value })
                        }
                      >
                        {options.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} />
                    </div>
                  </label>
                ))}
                <Accordion
                  title="Your background image"
                  open={config.background === "Custom Image"}
                >
                  <ImageField
                    label="Background image"
                    value={config.image}
                    onChange={(image) =>
                      updateConfig({
                        image,
                        ...(image ? { background: "Custom Image" } : {}),
                      })
                    }
                  />
                </Accordion>
                <p className="customizer-control-label">Finishing touches</p>
                <div className="customizer-decoration-grid">
                  {decorations.map((key) => (
                    <label key={key} className="customizer-toggle">
                      <input
                        type="checkbox"
                        checked={Boolean(config.decorations?.[key])}
                        onChange={(event) =>
                          updateConfig({
                            decorations: {
                              ...config.decorations,
                              [key]: event.target.checked,
                            },
                          })
                        }
                      />
                      <span className="toggle-track" />
                      <span>{key}</span>
                    </label>
                  ))}
                </div>
              </>
            )}
            {tab === "Sections" && (
              <>
                <p className="editor-hint">
                  Choose what your guests see. Hidden sections keep their
                  content, ready whenever you need them.
                </p>
                <div className="editor-section-list">
                  {Object.entries(config.sections || {}).map(
                    ([key, enabled]) => (
                      <label key={key} className="customizer-toggle">
                        <input
                          type="checkbox"
                          checked={Boolean(enabled)}
                          onChange={(event) =>
                            updateConfig({
                              sections: {
                                ...config.sections,
                                [key]: event.target.checked,
                              },
                            })
                          }
                        />
                        <span className="toggle-track" />
                        <span>{readable(key)}</span>
                      </label>
                    ),
                  )}
                </div>
              </>
            )}
          </section>
          <div className="customizer-reset">
            {showReset ? (
              <div>
                <p>Restore this event’s demo? Its edits will be replaced.</p>
                <button
                  type="button"
                  onClick={() => {
                    setUploadGeneration((value) => value + 1);
                    resetConfig();
                    setShowReset(false);
                  }}
                >
                  Yes, reset
                </button>
                <button type="button" onClick={() => setShowReset(false)}>
                  Keep my design
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => setShowReset(true)}>
                <RotateCcw size={14} />
                Reset this event to demo
              </button>
            )}
          </div>
        </aside>
        <section
          className="customizer-stage"
          id="live-editor-preview"
          aria-label="Live invitation preview"
        >
          <div className="customizer-stage-toolbar">
            <span>
              <span className="live-dot" />
              LIVE PREVIEW
            </span>
            <div className="customizer-devices" aria-label="Preview size">
              <button
                type="button"
                className={device === "desktop" ? "active" : ""}
                aria-pressed={device === "desktop"}
                aria-label="Desktop preview"
                onClick={() => setDevice("desktop")}
              >
                <Monitor size={17} />
              </button>
              <button
                type="button"
                className={device === "mobile" ? "active" : ""}
                aria-pressed={device === "mobile"}
                aria-label="Mobile preview"
                onClick={() => setDevice("mobile")}
              >
                <Smartphone size={17} />
              </button>
            </div>
            <span className="customizer-preview-hint">
              Made to feel like you
            </span>
          </div>
          <div className={"customizer-preview-frame " + device}>
            <div className="customizer-browser-chrome">
              <span />
              <span />
              <span />
              <p>your-celebration.ardhas</p>
              <Sparkles size={12} />
            </div>
            <div className="customizer-preview-scroll">
              <Invitation config={config} />
            </div>
          </div>
          <p className="customizer-stage-note">
            <Sparkles size={13} />
            Every detail updates as you create. A little magic, in real time.
          </p>
        </section>
      </div>
      <a className="editor-mobile-preview" href="#live-editor-preview">
        <Monitor size={15} />
        See live preview
        <ArrowUp size={14} />
      </a>
    </main>
  );
}
