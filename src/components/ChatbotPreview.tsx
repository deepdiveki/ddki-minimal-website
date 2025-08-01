"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
} from "@tabler/icons-react";

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-purple-800 bg-[#1c1c24] text-white shadow-md ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`px-4 py-2 ${className}`}>{children}</div>
);

const messagesDesktop1 = [
  { "sender": "user", "text": "Wie sind die Öffnungszeiten der Mensa?" },
  { "sender": "bot", "text": "Die Mensa ist von Montag bis Freitag von 11:30 bis 14:00 Uhr geöffnet." },
  { "sender": "user", "text": "Gibt es auch vegetarische Gerichte?" },
  { "sender": "bot", "text": "Ja, es gibt täglich mindestens ein vegetarisches Gericht zur Auswahl." },
  { "sender": "user", "text": "Was steht morgen auf dem Speiseplan?" },
  { "sender": "bot", "text": "Morgen gibt es Spaghetti Bolognese, ein vegetarisches Curry und einen Salatteller." },
  { "sender": "user", "text": "Kann ich auch Allergene einsehen?" },
  { "sender": "bot", "text": "Ja, die Allergene sind auf dem Speiseplan vermerkt oder können beim Personal erfragt werden." },
  { "sender": "user", "text": "Wie kann ich bezahlen, wenn Bargeld nicht geht?" },
  { "sender": "bot", "text": "Du musst eine Mensakarte verwenden, die du am Terminal im Foyer aufladen kannst." },
  { "sender": "user", "text": "Wie bekomme ich so eine Mensakarte?" },
  { "sender": "bot", "text": "Die Mensakarte erhältst du im Sekretariat gegen Vorlage deines Schülerausweises." }
];

const messagesDesktop2 = [
{ "sender": "user", "text": "Welche aktuellen Ereignisse stehen an?" },
{ "sender": "bot", "text": "1. Elternabend am 15. Mai\n2. Sportfest am 25. Mai\n3. Projektwoche vom 3.–7. Juni" },
{ "sender": "user", "text": "Was passiert beim Elternabend?" },
{ "sender": "bot", "text": "Der Elternabend am 15. Mai um 19:00 Uhr richtet sich an die Eltern des Jahrgangs 6. Es werden wichtige Informationen zum kommenden Schuljahr besprochen." },
{ "sender": "user", "text": "Wo findet das Sportfest statt?" },
{ "sender": "bot", "text": "Das Sportfest am 25. Mai wird auf dem Schulhof ausgetragen. Es beginnt vormittags und umfasst verschiedene sportliche Aktivitäten." },
{ "sender": "user", "text": "Was ist das Thema der Projektwoche?" },
{ "sender": "bot", "text": "Die Projektwoche vom 3. bis 7. Juni steht unter dem Motto 'Let's dance'. Externe Anbieter gestalten Workshops rund ums Tanzen." },
{ "sender": "user", "text": "Gibt es noch andere Veranstaltungen im Mai?" },
{ "sender": "bot", "text": "Ja, am 23. Mai findet ein Bücherflohmarkt für die Klassen 2 bis 4 statt. Außerdem beginnt am 26. Mai die Pfingstferienwoche." }
];

const messagesMobile = [
{ "sender": "user", "text": "Wie kann ich mein Kind an dieser Schule anmelden?" },
{ "sender": "bot", "text": "1. Online-Formular ausfüllen\n2. Dokumente hochladen\n3. Bestätigung per E-Mail erhalten" },
{ "sender": "user", "text": "Wo finde ich das Formular?" },
{ "sender": "bot", "text": "Das Anmeldeformular kannst du direkt hier im Chat als PDF herunterladen." },
{ "sender": "user", "text": "Welche Dokumente muss ich hochladen?" },
{ "sender": "bot", "text": "Du brauchst die Geburtsurkunde, den Impfpass (Masernnachweis) und das letzte Zeugnis deines Kindes." },
{ "sender": "user", "text": "Wie lange dauert die Bearbeitung?" },
{ "sender": "bot", "text": "Die Bearbeitung dauert in der Regel 3 bis 5 Werktage. Du bekommst eine Bestätigung per E-Mail." },
{ "sender": "user", "text": "Kann ich die Anmeldung auch persönlich abgeben?" },
{ "sender": "bot", "text": "Ja, du kannst die Unterlagen auch im Sekretariat abgeben. Bitte vorher telefonisch einen Termin vereinbaren." }
];

const ChatBubble = ({ sender, text, variant = "default" }: { sender: string; text: string; variant?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`p-3 my-2 rounded-xl ${variant === "integrated" ? "max-w-[90%] px-4" : "max-w-[100%]"} text-sm shadow-lg whitespace-pre-line ${
      sender === "user"
        ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white self-end"
        : "bg-[#1c1c24] text-gray-200 self-start border border-purple-700"
    }`}
  >
    {text.split("\n").map((line, i) => (
      <div key={i}>{line}</div>
    ))}
  </motion.div>
);

const ChatWindow = ({ messages, isTyping }: { messages: { sender: string; text: string }[], isTyping?: boolean }) => (
  <Card className="w-full max-w-md h-80 flex flex-col p-4 space-y-2 bg-[#0b071a] border border-purple-800 rounded-2xl">
    <CardContent className="flex flex-col space-y-2 overflow-y-auto scrollbar-none">
      {messages.map((msg, i) => (
        <ChatBubble key={i} sender={msg.sender} text={msg.text} />
      ))}
      {isTyping && (
        <div className="p-3 m-2 rounded-xl max-w-[80%] text-sm shadow-lg bg-[#1c1c24] text-gray-200 self-start border border-purple-700 animate-pulse">
          ...
        </div>
      )}
    </CardContent>
  </Card>
);

export default function ChatbotPreview() {
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [chatVisible, setChatVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messageIndexRef = useRef(0);

  useEffect(() => {
    let buttonTimeout: NodeJS.Timeout;
    let messageInterval: NodeJS.Timeout;
    // let resetTimeout: NodeJS.Timeout;

    buttonTimeout = setTimeout(() => {
      // setChatVisible(true); // Entfernt, da jetzt manuell ausgelöst
      messageIndexRef.current = 0;
      setDisplayedMessages([]);
      messageInterval = setInterval(() => {
        const currentMessage = messagesMobile[messageIndexRef.current];
        if (!currentMessage) {
          clearInterval(messageInterval);
          /* resetTimeout = setTimeout(() => {
            setChatVisible(false);
            setDisplayedMessages([]);
          }, 4000); */
          return;
        }
        if (currentMessage.sender === "bot") {
          setIsTyping(true);
          setTimeout(() => {
            setDisplayedMessages((prev) => [...prev, JSON.stringify(currentMessage)]);
            setIsTyping(false);
            messageIndexRef.current++;
            if (messageIndexRef.current >= messagesMobile.length) {
              clearInterval(messageInterval);
              /* resetTimeout = setTimeout(() => {
                setChatVisible(false);
                setDisplayedMessages([]);
              }, 4000); */
            }
          }, 1000);
        } else {
          setDisplayedMessages((prev) => [...prev, JSON.stringify(currentMessage)]);
          messageIndexRef.current++;
          if (messageIndexRef.current >= messagesMobile.length) {
            clearInterval(messageInterval);
            /* resetTimeout = setTimeout(() => {
              setChatVisible(false);
              setDisplayedMessages([]);
            }, 4000); */
          }
        }
      }, 1200);
    }, 3000);

    return () => {
      clearTimeout(buttonTimeout);
      // clearTimeout(resetTimeout);
      clearInterval(messageInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-w-6xl mx-auto">
      <div className="bg-[#0b071a] border border-purple-800 rounded-2xl p-4 flex flex-col gap-4 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg">
        <div className="flex items-center gap-2 text-white">
          <IconClipboardCopy className="h-5 w-5 text-purple-400" />
          <h3 className="text-lg font-semibold">Mensa-Preise abfragen</h3>
        </div>
        <ChatWindow messages={messagesDesktop1} />
        <p className="text-sm text-gray-300">
          Das KI-Schulbüro kann die Schüler:innen z.B. über die aktuellen Kosten des
          Mensa-Essens informieren – schnell und automatisiert.
        </p>
      </div>

      <div className="bg-[#0b071a] border border-purple-800 rounded-2xl p-4 flex flex-col gap-4 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg">
        <div className="flex items-center gap-2 text-white">
          <IconFileBroken className="h-5 w-5 text-purple-400" />
          <h3 className="text-lg font-semibold">Veranstaltungen anzeigen</h3>
        </div>
        <ChatWindow messages={messagesDesktop2} />
        <p className="text-sm text-gray-300">
          Eltern und Schüler:innen erhalten auf einen Blick eine Übersicht
          kommender Schulereignisse - informiert durch das KI-Schulbüro.
        </p>
      </div>

      <div className="bg-[#0b071a] border border-purple-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:col-span-2 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg relative overflow-hidden h-96">
        <div className="w-full h-full bg-[#141414] text-white text-xs p-4 overflow-hidden relative rounded-xl">
          {/* Browser window-style header with animated circles and URL bar */}
          <div className="h-6 bg-[#1f1f1f] rounded-t-xl flex items-center px-3 space-x-2 mb-4">
            <motion.span
              className="h-3 w-3 rounded-full bg-red-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <motion.span
              className="h-3 w-3 rounded-full bg-yellow-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
            />
            <motion.span
              className="h-3 w-3 rounded-full bg-green-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.4 }}
            />
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="bg-[#2c2c2c] text-gray-400 text-[10px] px-3 py-0.5 rounded w-[200px] truncate flex items-center gap-1 justify-center">
                <span>🔒</span>
                <span>https://gymnasium-alster.de</span>
              </div>
            </div>
          </div>
          <header className="mb-4">
            <h2 className="text-xl font-bold">Gymnasium Alster</h2>
            <p className="text-gray-400">Willkommen auf unserer Schulwebseite</p>
          </header>
          <nav className="flex gap-4 text-sm text-purple-300 mb-4 border-b border-purple-800 pb-2">
            <span>Start</span>
            <span>Über uns</span>
            <span>Termine</span>
            <span>Sport</span>
            <span>Downloads</span>
            <span>Kontakt</span>
          </nav>
          <section className="mb-4">
            <h3 className="text-white font-semibold mb-1">Herzlich Willkommen</h3>
            <ul className="list-disc ml-4 text-gray-300">
              <li>bei uns am Alstercampus, wie wir hier in Hamburg zu unserer Schule sagen. Das Gymnasium Alster hat Vieles für viele zu bieten. Ich lade Sie ganz herzlich ein, uns kennenzulernen. Surfen Sie auf unseren Seiten durch die bunte Welt einer Schule für Alle. Von der 5. Klasse bis zum Abitur lernen hier alle an einem Ort.</li>
            </ul>
          </section>
          <section className="mb-4">
            <h3 className="text-white font-semibold mb-1">Infos für neue Eltern</h3>
            <p className="text-gray-400">
              Alles zur Anmeldung, Termine, benötigte Unterlagen und Ansprechpersonen.
            </p>
          </section>
          <footer className="text-gray-500 text-[10px] mt-auto border-t border-purple-800 pt-2">
            © 2025 Gymnasium Alster · Impressum · Datenschutz
          </footer>

          {/* Chatbot preview innerhalb der Box */}
          {chatVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute bottom-20 right-4 w-52 h-64 bg-[#0b071a] border border-purple-800 rounded-xl p-2 overflow-hidden z-10"
            >
              <div className="pointer-events-auto">
                <ChatWindow
                  messages={displayedMessages.map((m) => JSON.parse(m))}
                  isTyping={isTyping}
                />
              </div>
            </motion.div>
          )}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-4 right-4 w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg z-30 cursor-pointer"
            onClick={() => setChatVisible((prev) => !prev)}
          >
            {chatVisible ? "✕" : "💬"}
          </motion.div>
        </div>
        <div className="text-white md:w-1/2 flex flex-col gap-2 z-10">
          <div className="flex items-center gap-2">
            <IconBoxAlignRightFilled className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-semibold">Auf die Schulwebsite integrieren</h3>
          </div>
          <p className="text-sm text-gray-300">
            Jederzeit verfügbar: Neue Eltern können sich über den Anmeldeprozess informieren in 32 Sprachen – Schritt
            für Schritt -  erklärt durch das KI-Schulbüro.
          </p>
        </div>
      </div>
    </div>
  );
}