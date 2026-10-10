import WeddingUnifiedTemplate from "./WeddingUnifiedTemplate";

export default function HeritageVelvet({ config, compact = false }) {
  const rawNames = config.names || "Aarav & Diya";
  const names = rawNames.split(/&|and|\+/i);
  const initial1 = names[0]?.trim()?.charAt(0)?.toUpperCase() || "A";
  const initial2 = names[1]?.trim()?.charAt(0)?.toUpperCase() || "D";

  const heritageSwatches = [
    { color: "#8A2B3D", title: "Velvet Burgundy" },
    { color: "#A38243", title: "Imperial Darbar Gold" },
    { color: "#F7F3EB", title: "Royal Silk Ivory" },
    { color: "#1B4D3E", title: "Royal Emerald" },
    { color: "#1F1816", title: "Onyx Brocade" },
  ];

  const heritageCrest = (
    <div className="heritage-monogram-shield" aria-label="Imperial Monogram Shield">
      <span>
        {initial1}✦{initial2}
      </span>
    </div>
  );

  return (
    <WeddingUnifiedTemplate
      config={config}
      compact={compact}
      themeClass="heritage-template"
      heroCrest={heritageCrest}
      photoArchClass="heritage-jharokha-arch"
      primaryBtnClass="heritage-btn-primary"
      sprigIcon="❖ ❖ ❖"
      quoteText="In the grand presence of our traditions and loved ones, we request the honour of your presence."
      ceremonyTitle="ROYAL VARMALA & SACRED PHERAS"
      receptionTitle="SHAHI DAWAT & ROYAL BANQUET"
      itineraryTitle="ROYAL CEREMONIAL ITINERARY"
      dressCodeTitle="ROYAL INDIAN FESTIVE ATTIRE"
      dressCodeSwatches={heritageSwatches}
      registryTitle="YOUR PRESENCE IS OUR HONOUR"
      registryText="Your gracious presence and heartfelt blessings are the greatest honour for our new beginning."
      signoffHeader="UNDER THE PATRONAGE OF OUR FAMILIES"
      signoffSub="WITH REGAL AFFECTION & GRATITUDE"
    />
  );
}
