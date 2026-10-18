import { Helmet } from "react-helmet";
import { useInvitation } from "../context/InvitationContext";
import Invitation from "../templates/Invitation";
import EnvelopeOpening from "../components/preview/EnvelopeOpening";

export default function Preview() {
  const { config } = useInvitation();

  return (
    <>
      <Helmet>
        <title>
          {config.names} · {config.eventType} invitation | Ardhas
        </title>
      </Helmet>
      <main id="main-content" className="preview-main">
        <EnvelopeOpening config={config}>
          <Invitation config={config} showToolbar={false} />
        </EnvelopeOpening>
      </main>
    </>
  );
}
