import { useState } from "react";
import {
  AlertCircle,
  CheckCheck,
  Download,
  FileDown,
  FileText,
  ImagePlus,
  Lightbulb,
  Loader2,
  Printer,
  Sparkles,
} from "lucide-react";
import { validateProjectId } from "../data/mediaSlots.js";
import {
  downloadClientJson,
  downloadMediaChecklist,
  downloadRenamedImages,
  downloadClientPdf,
} from "../utils/clientExport.js";
import "../styles/customizer.css";

/**
 * Reusable Client Handoff Panel component.
 * Used on both Customizer and Preview pages to provide client data collection and export tools.
 */
export default function ClientHandoffPanel({
  config,
  updateConfig,
  showProjectIdInput = true,
  title = "Client handoff files",
  className = "",
}) {
  const [exportError, setExportError] = useState("");
  const [exportSuccess, setExportSuccess] = useState("");
  const [isPdfBusy, setIsPdfBusy] = useState(false);

  const validation = validateProjectId(config?.projectId);
  const projectId = config?.projectId?.trim() || "";

  const handleProjectIdChange = (value) => {
    setExportError("");
    setExportSuccess("");
    if (updateConfig) {
      updateConfig({ projectId: value.toLowerCase().trim() });
    }
  };

  const handleDownloadPdf = async () => {
    setExportError("");
    setExportSuccess("");
    try {
      setIsPdfBusy(true);
      const res = await downloadClientPdf(config);
      setExportSuccess(`Downloaded ${res}`);
    } catch (err) {
      setExportError(err.message);
    } finally {
      setIsPdfBusy(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    setExportError("");
    setExportSuccess("");
    try {
      downloadClientJson(config);
      setExportSuccess(`Downloaded client-details-${projectId}.json`);
    } catch (err) {
      setExportError(err.message);
    }
  };

  const handleDownloadChecklist = () => {
    setExportError("");
    setExportSuccess("");
    try {
      downloadMediaChecklist(config);
      setExportSuccess("Downloaded media checklist (.txt)");
    } catch (err) {
      setExportError(err.message);
    }
  };

  const handleDownloadImages = () => {
    setExportError("");
    setExportSuccess("");
    try {
      const res = downloadRenamedImages(config);
      if (res.downloadedCount === 0) {
        setExportSuccess(
          "No locally uploaded photos in preview to download. Upload preview photos in the customizer to download renamed files.",
        );
      } else {
        setExportSuccess(
          `Downloaded ${res.downloadedCount} pre-named photo file(s). Send videos separately to Ardhas.`,
        );
      }
    } catch (err) {
      setExportError(err.message);
    }
  };

  return (
    <div className={`client-handoff-panel ${className}`.trim()}>
      {showProjectIdInput && (
        <div className="client-handoff-project-id-section">
          {updateConfig ? (
            <label className="editor-field client-handoff-project-field">
              Project ID
              <input
                type="text"
                value={config?.projectId || ""}
                onChange={(e) => handleProjectIdChange(e.target.value)}
                placeholder="e.g. nikhil-weds-anjali"
                aria-label="Project ID"
              />
            </label>
          ) : (
            <div className="client-handoff-project-display">
              <span className="editor-subhead">Project ID</span>
              <span className="client-handoff-project-value">
                {projectId || "(Not assigned)"}
              </span>
            </div>
          )}
          <p className="editor-hint">
            Assigned by Ardhas to the client. (3 to 40 characters: lowercase
            letters, numbers, and hyphens only; no spaces).
          </p>

          {projectId ? (
            validation.valid ? (
              <p className="project-id-badge valid">
                <CheckCheck size={13} /> Valid Project ID:{" "}
                <strong>{projectId}</strong>
              </p>
            ) : (
              <p className="project-id-badge invalid" role="alert">
                <AlertCircle size={13} /> {validation.error}
              </p>
            )
          ) : (
            <p className="project-id-badge empty">
              <Sparkles size={13} /> Demo mode (no Project ID). Enter assigned
              ID to enable exports.
            </p>
          )}
        </div>
      )}

      <div className="customizer-export-stack">
        {title && <span className="editor-subhead">{title}</span>}

        {/* Primary Direct PDF Download Button */}
        <button
          type="button"
          className="export-action-button primary"
          onClick={handleDownloadPdf}
          disabled={isPdfBusy}
          title="Directly download invitation PDF with Ardhas Order Sheet"
        >
          {isPdfBusy ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Download size={14} />
          )}
          <span>{isPdfBusy ? "Generating PDF..." : "Download PDF"}</span>
        </button>

        {/* Fallback Print / Save as PDF Button */}
        <button
          type="button"
          className="export-action-button"
          onClick={handlePrint}
          title="Open browser print dialog to save as PDF"
        >
          <Printer size={14} />
          <span>Print / Save as PDF</span>
        </button>

        {/* High-fidelity print tip */}
        <div className="pdf-print-tip">
          <Lightbulb size={13} className="pdf-print-tip-icon" />
          <span>
            <strong>Tip:</strong> In the print dialog, choose{" "}
            <strong>"Save as PDF"</strong> as the destination and tick{" "}
            <strong>"Background graphics"</strong> to preserve colors and fonts.
          </span>
        </div>

        {/* JSON Export */}
        <button
          type="button"
          className="export-action-button"
          onClick={handleDownloadJson}
          title="Download machine-readable client details JSON for Ardhas"
        >
          <FileDown size={14} />
          <span>Download client details (JSON)</span>
        </button>

        {/* Media Checklist */}
        <button
          type="button"
          className="export-action-button"
          onClick={handleDownloadChecklist}
          title="Download text checklist of required media slots"
        >
          <FileText size={14} />
          <span>Download media checklist</span>
        </button>

        {/* Download Images */}
        <button
          type="button"
          className="export-action-button"
          onClick={handleDownloadImages}
          title="Download locally uploaded photos renamed to match slots"
        >
          <ImagePlus size={14} />
          <span>Download my images</span>
        </button>

        {/* Disclaimers & Notes */}
        <div className="client-handoff-notes">
          <p className="editor-hint export-hint">
            <strong>Source of truth:</strong> This JSON file is for sending to
            Ardhas only. Videos are not downloaded this way; please send original
            video files separately to Ardhas.
          </p>
          <p className="editor-hint export-hint">
            <strong>Local session only:</strong> Photos and videos selected in
            the browser preview are stored in your browser session only and have{" "}
            <strong>NOT</strong> been sent to Ardhas.
          </p>
        </div>

        {/* Feedback Messages */}
        {exportError && (
          <p className="editor-error" role="alert">
            <AlertCircle size={13} /> {exportError}
          </p>
        )}
        {exportSuccess && (
          <p className="editor-success" role="status">
            <CheckCheck size={13} /> {exportSuccess}
          </p>
        )}
      </div>
    </div>
  );
}
