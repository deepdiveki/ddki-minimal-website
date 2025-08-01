"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import ConnectorAnimation from "@/components/ConnectorAnimation";
import Image from "next/image";
import Link from "next/link";
import ChatbotToolAnimation from "@/components/ChatbotToolAnimation";
import ChatbotAnimation from "@/components/ChatbotAnimation";
import FortbildungAnimation from "@/components/FortbildungAnimation";

const Hero = () => {
  const [hoveredBoxIndex, setHoveredBoxIndex] = useState<number | null>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const boxRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const features = [
    {
      title: "DeepChat",
      subtitle: "KI-Chat",
      text: "KI-Chat für Lehrkräfte und Schüler",
      link: "/ddki-toolbox",
      buttonLabel: "DeepChat",
      animationClass: "animate__fadeIn",
      animationComponent: <ChatbotToolAnimation />,
      titleClass: "text-[1.375rem]",
    },
    {
      title: "KI-Schulbüro",
      subtitle: "Schulbüro 3.0",
      text: "Der KI-Chatbot für Ihre Schulwebsite",
      link: "/chatbot-fuer-ihre-schule",
      buttonLabel: "KI-Schulbüro",
      animationClass: "animate__zoomIn",
      animationComponent: <ChatbotAnimation />,
      titleClass: "text-[1.375rem]",
    },
    {
      title: "Fortbildungen",
      subtitle: "Workshops",
      text: "KI - Fortbildungen für Lehrkräfte und Schulen",
      link: "/fortbildungen",
      buttonLabel: "Fortbildungen",
      animationClass: "animate__slideInLeft",
      animationComponent: <FortbildungAnimation />,
      titleClass: "text-[1.375rem]",
    },
  ];

  useEffect(() => {
    const letters = document.querySelectorAll(".animated-title span");

    const tl = gsap.timeline({ delay: 0.6 });

    tl.fromTo(
      letters,
      {
        y: 0,
        rotationX: 0,
        opacity: 1,
      },
      {
        y: -30,
        rotationX: 90,
        duration: 0.1,
        opacity: 0.8,
        ease: "power1.in",
        stagger: {
          each: 0.015,
          from: "center",
        },
      }
    ).to(
      letters,
      {
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 0.15,
        ease: "back.out(2)",
        stagger: {
          each: 0.015,
          from: "center",
        },
        onComplete: () => {
          gsap.fromTo(
            ".circled-path",
            {
              strokeDasharray: 1000,
              strokeDashoffset: 1000,
            },
            {
              strokeDashoffset: 0,
              duration: 1.2,
              ease: "power2.inOut",
            }
          );
          gsap.fromTo(
            ".circled-path-secondary",
            {
              strokeDasharray: 1000,
              strokeDashoffset: 1000,
            },
            {
              strokeDashoffset: 0,
              duration: 1.2,
              ease: "power2.inOut",
              delay: 1.4,
            }
          );
        },
      },
      ">0.05"
    );
  }, []);

  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden pt-35 md:pt-40 xl:pt-45"
      style={{ position: "relative", minHeight: "100vh" }}
    >
      <div className="mx-auto max-w-7xl" />

      <div className="relative z-1 mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0">
        <div className="text-center">
          <span className="hero-subtitle-gradient hover:hero-subtitle-hover relative mb-5 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
            <Image
              src="/images/hero/icon-title.svg"
              alt="icon"
              width={16}
              height={16}
            />
            <span className="hero-subtitle-text">Für die Zukunft mit KI</span>
          </span>
          <h1 className="mb-6 text-3xl font-extrabold text-white sm:text-5xl xl:text-heading-1 animated-title">
            <span style={{ position: "relative", display: "inline-block" }}>
              <div className="hidden sm:block" style={{ position: "absolute", top: "35px", left: "-40px", width: "120%", height: "60px", zIndex: -1 }}>
                <svg
                  viewBox="0 0 640 120"
                  style={{
                    width: "100%",
                    height: "100%",
                    stroke: "#f48c42",
                    fill: "none",
                  }}
                >
                  <path
                    className="circled-path"
                    d="M0,95 C80,100 160,110 240,100 C320,90 400,100 480,95 C540,92 600,90 640,92"
                    strokeWidth="3"
                    stroke="#f48c42"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ strokeOpacity: 0.9 }}
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    className="circled-path-secondary"
                    d="M640,92 C580,94 520,98 460,100 C400,102 340,98 280,95 C220,92 160,94 100,92 C60,90 20,90 0,91"
                    strokeWidth="3"
                    stroke="#f48c42"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ strokeOpacity: 0.9 }}
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
              {"DeepDiveKI".split("").map((char, i) => (
                <span key={i} style={{ display: "inline-block" }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
            {" – Ihr Partner für KI".split("").map((char, i) => (
              <span key={`slogan-${i}`} style={{ display: "inline-block" }}>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          <p className="mx-auto mb-9 max-w-[500px] font-medium md:text-lg">
            Wir bieten drei innovative KI-Produkte für Lehrende, Lernende und Schulen – perfekt aufeinander abgestimmt:
          </p>

          <Link
            ref={buttonRef}
            href="#kontakt"
            className="hero-button-gradient inline-flex rounded-lg px-7 py-3 font-medium text-white duration-300 ease-in hover:opacity-80"
          >
            Jetzt Kontakt aufnehmen
          </Link>
        </div>

        {/* Drei Feature-Boxen */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={boxRefs[index]}
              onMouseEnter={() => setHoveredBoxIndex(index)}
              onMouseLeave={() => setHoveredBoxIndex(null)}
              className={`glowable-box features-box-border relative rounded-3xl w-full h-auto animate__animated transition-all duration-300 ease-in-out ${feature.animationClass}`}
            >
              <div className="box-hover relative overflow-hidden rounded-3xl p-10 xl:p-15 flex flex-col items-center text-center">
                <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
                  <Image
                    src="/images/hero/icon-title.svg"
                    alt="icon"
                    width={16}
                    height={16}
                  />
                  <span className="hero-subtitle-text">{feature.subtitle}</span>
                </span>
                <h3 className={`mb-4.5 font-bold text-white ${feature.titleClass || "text-heading-4"}`}>
                  {feature.title}
                </h3>
                <p className="mb-10 font-medium max-w-[700px] min-h-[100px] text-white">
                  {feature.text}
                </p>
                <Link href={feature.link} target="_blank" rel="noopener noreferrer">
                  <div className="flex justify-center items-center mb-10 w-full cursor-pointer relative z-30">
                    <div>
                      {feature.animationComponent}
                    </div>
                  </div>
                </Link>
                <Link
                  href={feature.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="features-button-gradient relative z-30 inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm text-white duration-300 ease-in hover:shadow-button"
                >
                  {feature.buttonLabel}
                  <svg
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3992 5.60002L8.22422 0.350024C7.99922 0.125024 7.64922 0.125024 7.42422 0.350024C7.19922 0.575024 7.19922 0.925025 7.42422 1.15002L11.6242 5.42503H0.999219C0.699219 5.42503 0.449219 5.67502 0.449219 5.97502C0.449219 6.27502 0.699219 6.55003 0.999219 6.55003H11.6742L7.42422 10.875C7.19922 11.1 7.19922 11.45 7.42422 11.675C7.52422 11.775 7.67422 11.825 7.82422 11.825C7.97422 11.825 8.12422 11.775 8.22422 11.65L13.3992 6.40002C13.6242 6.17502 13.6242 5.82502 13.3992 5.60002Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Glow-Connector */}
      <div className="hidden sm:block">
        <ConnectorAnimation buttonRef={buttonRef} boxRefs={boxRefs} />
      </div>
    </section>
  );
};

export default Hero;