import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  SlidersHorizontal,
  Printer,
  Download,
  Loader2,
  FileDown,
  FileText,
  ImagePlus,
  AlertCircle,
  CheckCheck,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { useInvitation } from "../context/InvitationContext";
import {
  downloadClientJson,
  downloadMediaChecklist,
  downloadRenamedImages,
  downloadClientPdf,
} from "../utils/clientExport.js";
import ClientHandoffPanel from "../components/ClientHandoffPanel";
import Invitation from "../templates/Invitation";
import EnvelopeOpening from "../components/preview/EnvelopeOpening";
import TemplateSwitcherDock from "../components/preview/TemplateSwitcherDock";

export default function Preview() {
  const { config, updateConfig } = useInvitation();
  const [exportMessage, setExportMessage] = useState({ text: "", isError: false });
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  const handleExportJson = () => {
    try {
      downloadClientJson(config);
      setExportMessage({
        text: `Exported client-details-${config.projectId}.json`,
        isError: false,
      });
    } catch (err) {
      setExportMessage({ text: err.message, isError: true });
    }
  };

  const handleExportChecklist = () => {
    try {
      downloadMediaChecklist(config);
      setExportMessage({
        text: "Downloaded media checklist (.txt)",
        isError: false,
      });
    } catch (err) {
      setExportMessage({ text: err.message, isError: true });
    }
  };

  const handleExportImages = () => {
    try {
      const res = downloadRenamedImages(config);
      if (res.downloadedCount === 0) {
        setExportMessage({
          text: "No locally uploaded photos in preview to download. Add local photos in the customizer.",
          isError: false,
        });
      } else {
        setExportMessage({
          text: `Downloaded ${res.downloadedCount} pre-named photo file(s). Send videos separately to Ardhas.`,
          isError: false,
        });
      }
    } catch (err) {
      setExportMessage({ text: err.message, isError: true });
    }
  };

  const handleDownloadPdf = async () => {
    try {
      setIsPdfGenerating(true);
      const res = await downloadClientPdf(config);
      setExportMessage({
        text: `Downloaded ${res}`,
        isError: false,
      });
    } catch (err) {
      setExportMessage({ text: err.message, isError: true });
    } finally {
      setIsPdfGenerating(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {config.names} · {config.eventType} invitation | Ardhas
        </title>
      </Helmet>
      <div className="preview-toolbar">
        <Link to="/" className="preview-brand-link">
          <ArrowLeft size={16} /> Ardhas
        </Link>
        <div className="preview-project-indicator">
          <span>{config.projectId ? `PROJECT: ${config.projectId}` : "LIVE PREVIEW · DEMO"}</span>
        </div>
        <div className="preview-actions">
          <button
            type="button"
            className="preview-action-btn"
            title="Download client details JSON"
            onClick={handleExportJson}
          >
            <FileDown size={15} /> <span>JSON</span>
          </button>
          <button
            type="button"
            className="preview-action-btn"
            title="Download media checklist"
            onClick={handleExportChecklist}
          >
            <FileText size={15} /> <span>Checklist</span>
          </button>
          <button
            type="button"
            className="preview-action-btn"
            title="Download uploaded images renamed with slot IDs"
            onClick={handleExportImages}
          >
            <ImagePlus size={15} /> <span>Images</span>
          </button>
          <button
            type="button"
            className="preview-action-btn primary"
            title="Print or Save as PDF with browser print dialog (recommended for vector fonts & page breaks)"
            onClick={() => window.print()}
          >
            <Printer size={15} /> <span>Print / Save PDF</span>
          </button>
          <button
            type="button"
            className="preview-action-btn"
            title="Download quick client-side preview PDF with Ardhas Order Sheet"
            onClick={handleDownloadPdf}
            disabled={isPdfGenerating}
          >
            {isPdfGenerating ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Download size={15} />
            )}
            <span>{isPdfGenerating ? "PDF..." : "Quick preview PDF"}</span>
          </button>
          <Link to="/customizer" className="preview-action-btn">
            <SlidersHorizontal size={15} /> <span>Customize</span>
          </Link>
        </div>
      </div>
      {exportMessage.text && (
        <div
          className={`preview-export-banner ${exportMessage.isError ? "error" : "success"}`}
          role={exportMessage.isError ? "alert" : "status"}
        >
          {exportMessage.isError ? <AlertCircle size={15} /> : <CheckCheck size={15} />}
          <span>{exportMessage.text}</span>
          <button
            type="button"
            className="preview-banner-close"
            onClick={() => setExportMessage({ text: "", isError: false })}
          >
            ×
          </button>
        </div>
      )}
      <div className="preview-handoff-wrapper no-print">
        <ClientHandoffPanel
          config={config}
          updateConfig={updateConfig}
          title="Client handoff files"
        />
      </div>
      <main id="main-content">
        <EnvelopeOpening config={config}>
          <Invitation config={config} />
        </EnvelopeOpening>
      </main>
      <TemplateSwitcherDock />
    </>
  );
}
