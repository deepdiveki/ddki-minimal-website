import SectionTitle from "../../Common/SectionTitle";
import SinglePricing from "./SInglePricing"; // Korrigierter Import

// Beispiel für lokale Preisdaten mit individuellen Links
const pricingData = [
  {
    title: "KI-Schulbüro",
    price: "150,00 €",
    features: [
      "Individuelles KI-Schulbüro",
      "Tägliches DB Update",
      "Sprachmodelle: GPT-4o",
      "Unbegrenzte Unterhaltungen",
      "Kundensupport",
    ],
    link: "/kontakt-chat-bot", // Link zur Bestellung
  },
  {
    title: "KI-Schulbüro Premium",
    price: "250,00 €",
    features: [
      "KI-Schulbüro mit Kuration",
      "Für 35 Sprachen",
      "Sprachmodelle: GPT-4o",
      "Unbegrenzte Unterhaltungen",
      "Priorisierter Kundensupport",
    ],
    link: "kontakt-chat-bot",
  },
];

const PricingGrids = () => {
  return (
    <div>
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <SectionTitle
          subTitle="Jetzt anfragen"
          title="Preise"
          paragraph="Entdecken Sie unser KI-Schulbüro – so individuell wie Ihr Bedarf! Neben Schulen bieten wir auch maßgeschneiderte Lösungen für Schulträger, Medienzentren, Bundesländer und Hochschulen an."
        />
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {pricingData.map((price, index) => (
            <SinglePricing price={price} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingGrids;