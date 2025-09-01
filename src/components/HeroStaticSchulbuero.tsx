import Image from "next/image";

const HeroStaticSchulbuero = () => {
  return (
    <section
      id="home"
      className="relative z-10 overflow-visible pt-35 md:pt-40 xl:pt-45 pb-0"
      style={{ position: "relative" }}
    >
      <div className="relative z-1 mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0">
        <div className="text-center">
          <span className="hero-subtitle-gradient hover:hero-subtitle-hover relative mb-5 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
            <Image
              src="/images/hero/icon-title.svg"
              alt="icon"
              width={16}
              height={16}
            />
            <span className="hero-subtitle-text">KI-Schulbüro</span>
          </span>
          <h1 className="mb-6 text-3xl font-extrabold text-white sm:text-5xl xl:text-heading-1">
            KI-Schulbüro
          </h1>
          <p className="mx-auto mb-9 max-w-[600px] font-medium md:text-lg text-white">
          Die intelligente Hilfe für Ihr Schulbüro – und zugleich die verlässliche Unterstützung, auf die Ihre Verwaltung jederzeit zählen kann.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroStaticSchulbuero;


