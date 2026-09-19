import { Link } from "react-router-dom";
import { ArrowLeft, SlidersHorizontal, Printer } from "lucide-react";
import { Helmet } from "react-helmet";
import { useInvitation } from "../context/InvitationContext";
import Invitation from "../templates/Invitation";
export default function Preview() {
  const { config } = useInvitation();
  return (
    <>
      <Helmet>
        <title>
          {config.names} · {config.eventType} invitation | Ardhas
        </title>
      </Helmet>
      <div className="preview-toolbar">
        <Link to="/">
          <ArrowLeft size={16} /> Ardhas
        </Link>
        <span>YOUR LIVE INVITATION · DEMO</span>
        <div>
          <button onClick={() => window.print()}>
            <Printer size={16} /> Save PDF
          </button>
          <Link to="/customizer">
            <SlidersHorizontal size={16} /> Customize
          </Link>
        </div>
      </div>
      <main id="main-content">
        <Invitation config={config} />
      </main>
    </>
  );
}
