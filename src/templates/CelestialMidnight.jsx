import WeddingUnifiedTemplate from "./WeddingUnifiedTemplate";

export default function CelestialMidnight({ config, compact = false }) {
  const celestialSwatches = [
    { color: "#38527A", title: "Midnight Indigo" },
    { color: "#D8C187", title: "Star Dust Gold" },
    { color: "#1E293B", title: "Deep Slate" },
    { color: "#A5B4C8", title: "Cosmic Mist" },
    { color: "#F1F5F9", title: "Pure Starlight" },
  ];

  const celestialCrest = (
    <div className="celestial-crest" aria-label="Celestial Constellation Crest">
      ✧ WRITTEN IN THE STARS ✧
    </div>
  );

  return (
    <WeddingUnifiedTemplate
      config={config}
      compact={compact}
      themeClass="celestial-template"
      heroCrest={celestialCrest}
      photoArchClass="celestial-arch-photo"
      primaryBtnClass="celestial-btn-primary"
      sprigIcon="✧ ✧ ✧"
      quoteText="Like stars that cross the sky to find each other, our forever begins tonight."
      ceremonyTitle="TWILIGHT CEREMONY & VOWS"
      receptionTitle="STARLIT GALA & EVENING TOAST"
      itineraryTitle="STARLIT DAY CRONOGRAMA"
      dressCodeTitle="MIDNIGHT GLAMOUR & EVENING PASTELS"
      dressCodeSwatches={celestialSwatches}
      registryTitle="YOUR PRESENCE LIGHTS UP OUR UNIVERSE"
      registryText="Your presence and love light up our celebration. Should you wish to honor us with a gift, our registry is available."
      isDarkTheme={true}
      signoffHeader="TO THE MOON AND BEYOND"
      signoffSub="WITH INFINITE LOVE & GRATITUDE"
    />
  );
}
