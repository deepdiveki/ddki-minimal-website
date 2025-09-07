import AboutSection from "@/components/Fortbildungen-Neu/Uebersicht";
import Breadcrumb from "@/components/Breadcrumb";
import CallToAction from "@/components/CallToAction";
import { Metadata } from "next";
import FeaturesList from "@/components/Fortbildungen-Neu/Module";
import HeroStatic from "@/components/HeroStatic";

export const metadata: Metadata = {
  title: "KI-Fortbildungen für Lehrkräfte | DeepDiveKI",
  description: "Lehrkräfte stärken in unseren KI-Fortbildungen ihre KI-Kompetenz für den Unterricht. Praxisnah und sofort anwendbar - vom Crashkurs bis zum Deep-Dive-Modulen.",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <HeroStatic />
      <AboutSection />
      <FeaturesList />
      <CallToAction />
    </>
  );
};

export default AboutPage;