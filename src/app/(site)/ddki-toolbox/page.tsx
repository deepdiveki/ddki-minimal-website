import AboutSection from "@/components/About/AboutSection";
import Team from "@/components/About/Team";
import Breadcrumb from "@/components/Breadcrumb";
import CallToAction from "@/components/CallToAction";
import Features from "@/components/DDKI-Toolbox/Tools";
import { Metadata } from "next";
import Clients from "@/components/About/Kunden";
import Uebersicht from "@/components/DDKI-Toolbox/Uebersicht";
import Pricing from "@/components/DDKI-Toolbox/Pricing";
import DDKICHAT from "@/components/DDKI-Toolbox/DDKICHAT";
import Produktvorschau from "@/components/About/Produktvorschau";

export const metadata: Metadata = {
  title: "DeepDiveKI bietet Schulen innovative KI-Tools (DeepChat, Schul-Chatbot) und Fortbildungen für Lehrkräfte. Entdecken Sie jetzt, wie KI Ihren Schulalltag bereichern kann!",
  description: "DeepChat ist Ihr All-in-One KI-Chat für Unterricht und schulische Organisation. Planen Sie Unterricht, erstellen Sie Material und nutzen Sie KI-Unterstützung - alles in einem Chat! Jetzt ausprobieren.",
  // other metadata
};

const ddki_toolbox = () => {
  return (
    <>
      <DDKICHAT />
      <Produktvorschau />
      <Features />
      <Pricing />
      <CallToAction />
    </>
  );
};

export default ddki_toolbox;
