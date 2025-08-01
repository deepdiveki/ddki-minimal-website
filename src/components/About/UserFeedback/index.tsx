"use client";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import SectionTitle from "@/components/Common/SectionTitle";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-white/10 bg-white/2.5 backdrop-blur-md p-4 transition duration-200 hover:shadow-[0_0_10px_#a855f7] dark:shadow-none",
        className,
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 font-sans font-bold text-neutral-100">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
}

const CounterItem = ({
  value,
  label,
  delay = 0,
}: {
  value: number;
  label: string;
  delay?: number;
}) => {
  return (
    <motion.div
      className="flex flex-col items-center px-4 py-2"
      initial={{ opacity: 0, rotateX: -90 }}
      whileInView={{ opacity: 1, rotateX: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      viewport={{ once: true }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <span className="text-4xl font-bold text-white">
        <CountUp end={value} duration={2} />
      </span>
      <span className="text-sm text-neutral-300">{label}</span>
    </motion.div>
  );
};

const feedbackItems = [
  {
    title: "Hilfreich im Unterricht",
    description: "Der DeepChat hilft mir dabei, gezielt Aufgaben für meine Schüler zu entwickeln.",
    icon: <Sparkles className="h-5 w-5 text-purple-400" />,
    header: (
      <div className="text-sm text-neutral-300 dark:text-neutral-300">Lehrerin, Berlin</div>
    ),
  },
  {
    title: "Intuitive Bedienung",
    description: "Der DeepChat ist einfach zu bedienen – auch für technikferne Kolleg:innen. Gute Einführung von Björn und Tim.",
    icon: <Sparkles className="h-5 w-5 text-blue-400" />,
    header: (
      <div className="text-sm text-neutral-300 dark:text-neutral-300">Schulleiter, Hamburg</div>
    ),
  },
  {
    title: "Enorme Zeitersparnis",
    description: "Ich spare mit dem DeepChat viel Zeit bei administrtiven Aufgaben .",
    icon: <Sparkles className="h-5 w-5 text-green-400" />,
    header: (
      <div className="text-sm text-neutral-300 dark:text-neutral-300">Lehrkraft, NRW</div>
    ),
  },
  {
    title: "Tolle Fortbildung",
    description: "Viele Information und Tipps, die ich sofort umsetzen kann. Coole Notion Materialsammlung. Gute Diskussion mit Toni.",
    icon: <Sparkles className="h-5 w-5 text-green-400"
 />,
    header: (
      <div className="text-sm text-neutral-300 dark:text-neutral-300">Lehrer, Niedersachsen</div>
    ),
  },
  {
    title: "KI Assistent im DeepChat",
    description: "Den KI Assistenten im DeepChat setze ich gerne ein. So ein Hilfslehrer ist Gold wert.",
    icon: <Sparkles className="h-5 w-5 text-purple-400" />,
    header: (
      <div className="text-sm text-neutral-300 dark:text-neutral-300">Lehrer, Köln</div>
    ),
  },
  {
    title: "Planung Klassenreisen",
    description: "Habe meine Klassenfahrt mit dem DeepChat geplant. Das hat mir viel Zeit gespart.",
    icon: <Sparkles className="h-5 w-5 text-blue-400" />,
    header: (
      <div className="text-sm text-neutral-300 dark:text-neutral-300">Lehrerin, Hamburg</div>
    ),
  },
  {
    title: "Kuratiertes Promting",
    description: "Ich bin kein Profi beim Thema Digitales. Ich finde das kuratierte Prompting super.",
    icon: <Sparkles className="h-5 w-5 text-green-400" />,
    header: (
      <div className="text-sm text-neutral-300 dark:text-neutral-300">Lehrer, Stuttgart</div>
    ),
  },
  {
    title: "Schilf mit DeepDiveKI",
    description: "Björn und Tim waren bei uns an der Schule. Das waren super Workshops. Cool das man viel ausprobiern konnte.",
    icon: <Sparkles className="h-5 w-5 text-blue-400" />,
    header: (
      <div className="text-sm text-neutral-300 dark:text-neutral-300">Didaktische Leitung, Niedersachsen</div>
    ),
  },
  {
    title: "Fortbildung mit DeepDiveKI",
    description: "Vorstellung vieler Apps, direkte Links im Chat, Möglichkeiten zum Ausprobieren, die Videos für zu Hause waren toll.",
    icon: <Sparkles className="h-5 w-5 text-purple-400" />,
    header: (
      <div className="text-sm text-neutral-300 dark:text-neutral-300">Lehrerin, Thüringen</div>
    ),
  },
];

const UserFeedback = () => {
  const [fortbildungen, setFortbildungen] = useState<number | null>(null);
  const [lehrer, setLehrer] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setFortbildungen(data.fortbildungen);
        setLehrer(data.lehrer);
      });
  }, []);

  return (
    <section className="overflow-hidden py-17.5 lg:py-22.5 xl:py-27.5">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <SectionTitle
          subTitle="User Feedback"
          title="Was unsere Lehrer:innen sagen"
          paragraph="Die besten Geschichten schreibt der Schulalltag. Hier erzählen Lehrer:innen, wie sie unsere Lösungen einsetzen, was sie begeistert – und wie KI ihnen den Rücken im Alltag stärkt."
        />

        <div className="mt-10 mb-14 flex justify-center gap-12 perspective-[1000px]">
          {fortbildungen !== null && (
            <CounterItem value={fortbildungen} label="Fortbildungen gehalten" delay={0.1} />
          )}
          {lehrer !== null && (
            <CounterItem value={lehrer} label="Lehrer:innen weitergebildet" delay={0.3} />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 justify-items-center">
          {feedbackItems.map((item, index) => (
            <div className="w-full max-w-sm" key={index}>
              <BentoGridItem
                className="hover:border-purple-500/40 hover:shadow-[0_0_10px_#a855f7] border-white/10"
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserFeedback;