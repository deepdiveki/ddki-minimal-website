import AboutSection from "@/components/About/AboutSection";
import Pricing from "@/components/Chatbot-fuer-ihre-schule/Pricing";
import Breadcrumb from "@/components/Breadcrumb";
import CallToAction from "@/components/CallToAction";
import Chatbot from "@/components/Chatbot-fuer-ihre-schule/Chatbot";
import Features from "@/components/Chatbot-fuer-ihre-schule/Chatbot";
import HeroChatbot from "@/components/Chatbot-fuer-ihre-schule/Hero";
import Hero from "@/components/Home/Hero";
import { Metadata } from "next";
import Usecases from "@/components/Chatbot-fuer-ihre-schule/Usecases";

export const metadata: Metadata = {
  title: "KI-Chatbot für Schulwebsites | DeepDiveKI",
  description: "Unser KI-Chatbot für Schulwebsites beantwortet Fragen rund um Schule und Organisation (z.B. Termine, Anmeldungen). Entlasten Sie Ihr SchulbÃ¼ro und bieten Ihrer Schulgemeinschaft einen modernen Service.",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb pageTitle="KI-Schulbüro" />
      <HeroChatbot />
      <Usecases />
      <Chatbot />
      <Pricing />
      <CallToAction />
    </>
  );
};

export default AboutPage;
