import WeddingUnifiedTemplate from "./WeddingUnifiedTemplate";

export default function ClassicTraditional({ config, compact = false }) {
  const classicSwatches = [
    { color: "#923C35", title: "Kanjivaram Maroon" },
    { color: "#C5A059", title: "Antique Kasavu Gold" },
    { color: "#FCF9F2", title: "Temple Ivory" },
    { color: "#2E5C43", title: "Emerald Silk" },
    { color: "#D97724", title: "Marigold Ochre" },
  ];

  const classicCrest = (
    <div className="classic-temple-crest" aria-label="Auspicious Wedding Crest">
      || शुभ विवाह ||
    </div>
  );

  return (
    <WeddingUnifiedTemplate
      config={config}
      compact={compact}
      themeClass="classic-template"
      heroCrest={classicCrest}
      photoArchClass="classic-temple-arch"
      primaryBtnClass="classic-btn-primary"
      sprigIcon="𐀔 𐀔 𐀔"
      quoteText="United by sacred mantras and cherished by our families, we joyfully invite you to grace our wedding."
      ceremonyTitle="MUHURTHAM & SACRED PHERAS"
      receptionTitle="GRAND SADHYA FEAST & RECEPTION"
      itineraryTitle="AUSPICIOUS DAY CRONOGRAMA"
      dressCodeTitle="TRADITIONAL SILKS & FESTIVE ATTIRE"
      dressCodeSwatches={classicSwatches}
      registryTitle="YOUR BLESSINGS ARE OUR GREATEST GIFT"
      registryText="Your presence and blessings are our greatest gifts. For those who wish to extend a token of love, our registry is available."
      signoffHeader="WITH BLESSINGS & LOVE"
      signoffSub="FROM OUR FAMILIES TO YOURS"
    />
  );
}
