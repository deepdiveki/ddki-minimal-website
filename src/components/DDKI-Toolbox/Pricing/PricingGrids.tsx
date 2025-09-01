import SectionTitle from "../../Common/SectionTitle";
import SinglePricing from "./SInglePricing"; // Korrigierter Import

const pricingData = [
  {
    title: "Einzellizenz DeepChat",
    price: "4,99 €",
    features: [
      "All-in-One KI-Chat",
      "Die besten Sprachmodelle",
      "Planung von Unterrichtseinheiten",
      "Stetig neue Funktionalitäten",
      "Datenschutzkonforme KI-Nutzung",
      "Priorisierter Kundensupport"
    ],
    link: "https://buy.stripe.com/4gw03IfBz8SF0xifYZ",
    patch: "basic",
  },
  {
    title: "Schullizenz DeepChat",
    price: "99,99 €",
    features: [
      "Zugang für 30 Lizenzenznehmende",
      "Die besten Sprachmodelle", 
      "Exklusives Feature-Development",
      "Feedback- und Feature-Umfragen",
      "Onboarding durch unser Team",
      "Premium-Support"
    ],
    link: "https://www.deepdive-ki.de/kontakt",
    patch: "school",
  },
];

const PricingGrids = () => {
  return (
    <div>
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <SectionTitle
          subTitle="Jetzt anfragen"
          title="Preise"
          paragraph="Entdecken Sie den DeepChat – Ihre intelligente, funktionsreiche und datenschutzkonforme KI-Anwendung. Mit einer Vielzahl an Funktionalitäten, perfekt für den Unterricht oder als administrative Unterstützung und garantiert mit höchsten Datenschutzstandards. Ob für Schulen, Schulträger, Medienzentren, Bundesländer oder Hochschulen – profitieren Sie von einem maßgeschneiderten DeepChat, die flexibel und sicher sind."
        />
        <div className="flex justify-center items-start gap-6 flex-wrap">
          {pricingData.map((price, index) => (
            <SinglePricing key={index} price={price} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingGrids;