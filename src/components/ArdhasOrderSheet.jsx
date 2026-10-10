import { getMediaSlots, getSlotStatus, getExpectedMediaFilename } from "../data/mediaSlots.js";
import { templates } from "../data/events.js";

export default function ArdhasOrderSheet({ config }) {
  if (!config) return null;

  const projectId = config.projectId || "(Not assigned / Demo)";
  const templateObj = templates.find((t) => t.id === config.template) || {
    id: config.template || "wedding-1",
    name: config.template || "Default Template",
  };
  const slots = getMediaSlots(config);
  const printDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="ardhas-order-sheet" aria-hidden="true">
      <header className="order-sheet-header">
        <div className="order-sheet-brand">
          <h2>Ardhas Digital Invitations</h2>
          <span className="order-sheet-tag">Client Order & Verification Sheet</span>
        </div>
        <p className="order-sheet-disclaimer">
          <strong>Review Notice:</strong> This PDF document is generated for client review,
          proofreading, and visual identification only. The exported <code>client-details-{projectId}.json</code> file
          is the official, machine-readable data source for publication by Ardhas.
        </p>
      </header>

      <div className="order-sheet-meta-grid">
        <div className="order-sheet-meta-item">
          <span className="meta-label">Project ID:</span>
          <strong className="meta-value">{projectId}</strong>
        </div>
        <div className="order-sheet-meta-item">
          <span className="meta-label">Event Type:</span>
          <span className="meta-value">{config.eventType}</span>
        </div>
        <div className="order-sheet-meta-item">
          <span className="meta-label">Template Design:</span>
          <span className="meta-value">{templateObj.name} ({templateObj.id})</span>
        </div>
        <div className="order-sheet-meta-item">
          <span className="meta-label">Schema Version:</span>
          <span className="meta-value">ardhas-client/1.0</span>
        </div>
        <div className="order-sheet-meta-item">
          <span className="meta-label">Export / Print Date:</span>
          <span className="meta-value">{printDate}</span>
        </div>
        <div className="order-sheet-meta-item">
          <span className="meta-label">Names / Couple:</span>
          <span className="meta-value">{config.names || "(Not specified)"}</span>
        </div>
      </div>

      <div className="order-sheet-section">
        <h3>Media Slots & Assets Checklist</h3>
        <p className="order-sheet-hint">
          Checklist of media slots required for this design. Browser preview assets are not transmitted; original files must be placed in <code>clients/{projectId}/media/</code>.
        </p>
        <table className="order-sheet-table">
          <thead>
            <tr>
              <th>Slot ID</th>
              <th>Asset Purpose</th>
              <th>Type</th>
              <th>Requirement</th>
              <th>Preview Status</th>
              <th>Expected Filename</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => {
              const status = getSlotStatus(slot, config);
              const ext = slot.type === "video" ? "mp4" : "jpg";
              const filename = getExpectedMediaFilename(projectId, slot.id, ext);
              const statusText =
                status === "provided_locally"
                  ? "Selected (Local)"
                  : status === "url"
                  ? "Remote URL"
                  : "Empty / Missing";

              return (
                <tr key={slot.id}>
                  <td><code>{slot.id}</code></td>
                  <td>{slot.label}</td>
                  <td>{slot.type.toUpperCase()}</td>
                  <td>{slot.required ? "Required" : "Optional"}</td>
                  <td><span className={`status-badge status-${status}`}>{statusText}</span></td>
                  <td><code>{filename}</code></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <footer className="order-sheet-footer">
        <p>Ardhas Wedding Company · WhatsApp: +91 9048503717 · Instagram: ardhas_wedding_company</p>
      </footer>
    </section>
  );
}

