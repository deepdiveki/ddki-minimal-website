"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX, IconMessage, IconSend, IconRobot } from '@tabler/icons-react';
import Image from 'next/image';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface FloatingChatbotWidgetProps {
  chatbotName?: string;
  welcomeMessage?: string;
  placeholder?: string;
  primaryColor?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export default function FloatingChatbotWidget({
  chatbotName = "DeepDiveKI-Chatbot",
  welcomeMessage = "Moin! Hier ist der Chatbot von DeepDiveKI! Ich beantworte Fragen zu unseren KI-Lösungen.",
  placeholder = "Nachricht eingeben...",
  primaryColor = "#8646F4",
  position = "bottom-right"
}: FloatingChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: welcomeMessage,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Mobile Detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current && !isMobile) {
      inputRef.current.focus();
    }
  }, [isOpen, isMobile]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simuliere Bot-Antwort (hier können Sie Ihre KI-API integrieren)
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('öffnungszeiten') || input.includes('öffnungszeiten')) {
      return "Unser Sekretariat ist von Montag bis Freitag von 7:30 bis 15:30 Uhr geöffnet.";
    } else if (input.includes('anmeldung') || input.includes('anmelden')) {
      return "Für die Anmeldung benötigen wir folgende Unterlagen: Geburtsurkunde, Impfpass, letztes Zeugnis und ein Passfoto. Termine können Sie telefonisch oder per E-Mail vereinbaren.";
    } else if (input.includes('mensa') || input.includes('essen')) {
      return "Die Mensa ist von 11:30 bis 14:00 Uhr geöffnet. Das Essen kostet 3,50€ pro Tag. Vegetarische Optionen sind verfügbar.";
    } else if (input.includes('termin') || input.includes('veranstaltung')) {
      return "Der nächste Elternabend findet am 15. Mai um 19:00 Uhr statt. Weitere Termine finden Sie in unserem Schulkalender.";
    } else if (input.includes('krankmeldung') || input.includes('krank')) {
      return "Krankmeldungen können Sie telefonisch bis 8:00 Uhr oder per E-Mail an krankmeldung@schule.de senden.";
    } else if (input.includes('vertretungsplan') || input.includes('vertretung')) {
      return "Der aktuelle Vertretungsplan wird täglich aktualisiert und ist im Schulgebäude und auf unserer Website einsehbar.";
    } else {
      return "Danke für Ihre Nachricht. Ich leite Ihre Anfrage gerne an das zuständige Sekretariat weiter. Haben Sie noch weitere Fragen?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      default:
        return 'bottom-4 right-4';
    }
  };

  // Typing Indicator Component
  const TypingIndicator = () => (
    <>
      <style>{`
        @keyframes typing-bounce { 
          0%, 80%, 100% { 
            transform: scale(0.6); 
            opacity: 0.5; 
          } 
          40% { 
            transform: scale(1); 
            opacity: 1; 
          } 
        }
      `}</style>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 16 }}>
        <div style={{ 
          padding: '16px 20px', 
          borderRadius: 20, 
          backgroundColor: '#f8f9fa', 
          border: '1px solid #e9ecef',
          display: 'flex', 
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
        }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ 
              width: 8, 
              height: 8, 
              margin: '0 3px', 
              borderRadius: '50%', 
              backgroundColor: '#6c757d', 
              animation: `typing-bounce 1.2s infinite ease-in-out both`, 
              animationDelay: `${i * 0.2}s` 
            }} />
          ))}
        </div>
      </div>
    </>
  );

  // Message Bubble Component
  const MessageBubble = ({ sender, text }: { sender: 'user' | 'bot'; text: string }) => {
    const isUser = sender === 'user';

    const wrapperStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      margin: '16px 0'
    };

    // Shared bubble base
    const bubbleBase: React.CSSProperties = {
      lineHeight: 1.6,
      maxWidth: '85%',
      wordBreak: 'break-word' as const,
      fontSize: 15,
      padding: isUser ? '14px 18px' : '16px 20px',
      borderRadius: isUser ? 24 : 20,
      display: 'flex',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
    };

    if (isUser) {
      const bubbleStyle: React.CSSProperties = {
        ...bubbleBase,
        background: primaryColor,
        color: '#fff',
        border: 'none'
      };

      return (
        <div style={wrapperStyle}>
          <div style={bubbleStyle}>{text}</div>
        </div>
      );
    }

    // Bot message with avatar + name row
    const bubbleStyle: React.CSSProperties = {
      ...bubbleBase,
      background: 'rgba(255, 255, 255, 0.15)',
      color: '#ffffff',
      border: `1px solid rgba(134, 70, 244, 0.3)`,
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    return (
      <div style={wrapperStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: 8, 
            marginLeft: 16 
          }}>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: 'rgba(134, 70, 244, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
              padding: 2,
              border: '1px solid rgba(134, 70, 244, 0.5)'
            }}>
              <Image 
                src="/images/logo/deepdiveki-logo.svg" 
                alt="DeepDiveKI Logo" 
                width={20}
                height={20}
                style={{ 
                  width: '100%', 
                  height: '100%',
                  filter: 'brightness(0) invert(1)'
                }} 
              />
            </div>
            <div style={{ 
              fontSize: 13, 
              color: '#ffffff', 
              fontWeight: '600',
              letterSpacing: '0.3px'
            }}>
              {chatbotName}
            </div>
          </div>
          <div style={bubbleStyle}>{text}</div>
        </div>
      </div>
    );
  };

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: isMobile ? 16 : 24,
    right: isMobile ? 16 : 24,
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  };

  const panelStyle: React.CSSProperties = {
    width: isMobile ? '100vw' : 'clamp(350px, 25vw, 600px)',
    minWidth: isMobile ? '100vw' : 350,
    maxWidth: isMobile ? '100vw' : 'min(600px, calc(100vw - 48px))',
    height: isMobile ? '100vh' : '65vh',
    minHeight: isMobile ? '100vh' : 400,
    maxHeight: isMobile ? '100vh' : '85vh',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: isMobile ? 0 : 20,
    overflow: 'hidden',
    background: 'rgba(255, 255, 255, 0.04)',
    border: '2px solid rgba(255, 255, 255, 0.18)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(70px)',
    marginBottom: isMobile ? 0 : 16,
    transition: 'all 0.3s ease',
    // Mobile: Vollbild
    ...(isMobile ? {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999
    } : {})
  };

  const headerStyle: React.CSSProperties = {
    padding: '16px 20px',
    background: 'rgba(255, 255, 255, 0.04)',
    borderBottom: '2px solid rgba(255, 255, 255, 0.12)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backdropFilter: 'blur(65px)'
  };

  const titleStyle: React.CSSProperties = { 
    fontSize: 16, 
    color: '#ffffff', 
    fontWeight: '600',
    letterSpacing: '0.5px'
  };

  const chatAreaStyle: React.CSSProperties = {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    background: 'linear-gradient(180deg, rgba(240, 244, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)',
    backdropFilter: 'blur(65px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    margin: '8px',
    borderRadius: 12
  };

  const inputBarOuter: React.CSSProperties = {
    padding: '16px 20px',
    background: 'rgba(255, 255, 255, 0.03)',
    borderTop: '2px solid rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(65px)'
  };

  const inputBarStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: 'rgba(255, 255, 255, 0.15)',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    padding: '16px 20px',
    backdropFilter: 'blur(60px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease'
  };

  const toggleButtonStyle: React.CSSProperties = {
    width: isMobile ? 56 : 64,
    height: isMobile ? 56 : 64,
    borderRadius: '50%',
    background: primaryColor,
    color: '#fff',
    border: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: isMobile ? 20 : 24,
    boxShadow: `0 8px 32px ${primaryColor}40`,
    cursor: 'pointer',
    animation: isOpen ? 'none' : 'togglePulse 3s ease-in-out infinite',
    transition: 'all 0.3s ease',
    // Mobile: Position anpassen
    ...(isMobile ? {
      position: 'fixed',
      bottom: 16,
      right: 16,
      zIndex: 10000
    } : {})
  };

  return (
    <div style={containerStyle}>
      {/* Pulse animation for toggle */}
      <style>{`
        @keyframes togglePulse { 
          0%, 100% { 
            box-shadow: 0 8px 32px ${primaryColor}40; 
            transform: scale(1); 
          } 
          50% { 
            box-shadow: 0 8px 40px ${primaryColor}60; 
            transform: scale(1.05); 
          } 
        }
        
        .chat-input:focus-within {
          border-color: ${primaryColor};
          box-shadow: 0 4px 16px ${primaryColor}20;
        }
      `}</style>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={panelStyle}
          >
            <div style={headerStyle}>
              <span style={titleStyle}>
                <strong>DDKI</strong> · {chatbotName}
              </span>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginLeft: 'auto'
              }}>
                {/* Close Button - auf Mobile und Desktop anzeigen */}
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: isMobile ? 24 : 18,
                    cursor: 'pointer',
                    padding: isMobile ? 8 : 4,
                    borderRadius: 4,
                    color: isMobile ? '#333' : '#666',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.color = '#333';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none';
                    e.currentTarget.style.color = isMobile ? '#333' : '#666';
                  }}
                  title="Schließen"
                >
                  ×
                </button>
              </div>
            </div>

            <div style={chatAreaStyle} ref={chatRef}>
              {!privacyAccepted ? (
                // Datenschutz-Akzeptierung
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  textAlign: 'center',
                  padding: '40px 20px'
                }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    marginBottom: '16px',
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                  }}>
                    Willkommen zum Chatbot von DeepDiveKI
                  </div>
                  <div style={{
                    fontSize: '16px',
                    color: '#ffffff',
                    marginBottom: '32px',
                    lineHeight: '1.5',
                    maxWidth: '400px',
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                  }}>
                    Bitte akzeptieren Sie unsere Datenschutzrichtlinien, um fortzufahren.
                  </div>
                  <button
                    onClick={() => setPrivacyAccepted(true)}
                    style={{
                      background: primaryColor,
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px 32px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: `0 4px 16px ${primaryColor}30`,
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = `0 6px 20px ${primaryColor}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = `0 4px 16px ${primaryColor}30`;
                    }}
                  >
                    Akzeptieren
                  </button>
                </div>
              ) : (
                // Normale Chat-Nachrichten
                <>
                  {messages.map((message) => (
                    <MessageBubble key={message.id} sender={message.sender} text={message.text} />
                  ))}
                  {isTyping && <TypingIndicator />}
                </>
              )}
            </div>

            {/* Input-Bereich - nur anzeigen wenn Datenschutz akzeptiert */}
            {privacyAccepted && (
              <div style={inputBarOuter}>
                <div style={inputBarStyle}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={placeholder}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      fontSize: 16,
                      color: '#ffffff',
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontWeight: '500'
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    style={{
                      background: inputValue.trim() && !isTyping ? `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)` : '#e9ecef',
                      color: inputValue.trim() && !isTyping ? 'white' : '#999',
                      border: 'none',
                      borderRadius: '50%',
                      width: 44,
                      height: 44,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: inputValue.trim() && !isTyping ? 'pointer' : 'not-allowed',
                      transition: 'all 0.3s ease',
                      fontSize: 18,
                      fontWeight: 'bold',
                      boxShadow: inputValue.trim() && !isTyping ? `0 4px 16px ${primaryColor}40, 0 0 0 2px rgba(255, 255, 255, 0.2)` : '0 2px 8px rgba(0, 0, 0, 0.1)',
                      transform: inputValue.trim() && !isTyping ? 'scale(1.05)' : 'scale(1)'
                    }}
                    onMouseEnter={(e) => {
                      if (inputValue.trim() && !isTyping) {
                        e.currentTarget.style.transform = 'scale(1.15)';
                        e.currentTarget.style.boxShadow = `0 6px 20px ${primaryColor}50, 0 0 0 3px rgba(255, 255, 255, 0.3)`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (inputValue.trim() && !isTyping) {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = `0 4px 16px ${primaryColor}40, 0 0 0 2px rgba(255, 255, 255, 0.2)`;
                      }
                    }}
                  >
                    ➤
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          ...toggleButtonStyle,
          // Mobile: Button ausblenden wenn Chat geöffnet ist
          ...(isMobile && isOpen ? { display: 'none' } : {})
        }}
        title={isOpen ? 'Chat schließen' : 'Chat starten'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {isOpen ? (
          <div style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            ▼
          </div>
        ) : (
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 1000.63 1000.63"
            style={{ filter: 'brightness(0) invert(1)' }}
          >
            <defs>
              <linearGradient id="grad1" x1="0.315" y1="590.975" x2="750.315" y2="590.975" gradientTransform="translate(0 1000.63) rotate(-90)" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#fff"/>
                <stop offset="0.09" stopColor="#fff"/>
                <stop offset="0.99" stopColor="#fff"/>
              </linearGradient>
              <linearGradient id="grad2" x1="66.385" y1="701.86" x2="816.39" y2="701.86" gradientTransform="translate(1139.295 -34.145) rotate(92.92)">
                <stop offset="0" stopColor="#fff"/>
                <stop offset="0.09" stopColor="#fff"/>
                <stop offset="0.99" stopColor="#fff"/>
              </linearGradient>
            </defs>
            <g transform="scale(0.5,0.5)">
              <path fill="url(#grad1)" stroke="#fff" strokeMiterlimit="10" strokeWidth="0.625" d="M1500.63,500.62c37.75,0,74.55,4.2,109.9,12.15,219.8,49.25,384.85,243.25,390,476.7.05,3.7.1,7.45.1,11.15,0,3.7-.05,7.45-.1,11.15-3.05,281.7-122.6,535.45-312.75,715.3q-.05,0-.05.05c-27.55,26.15-56.5,50.6-86.9,73.4-167.15,125.65-374.95,200.1-600.2,200.1-225.25,0-433.05-74.45-600.2-200.1-10.07-7.55-19.98-15.29-29.74-23.2-15.82-12.84-4.36-38.41,15.79-35.35h0c37.2,5.7,75.35,8.65,114.15,8.65,192.1,0,367.3-72.2,500-191,62.4-55.85,115.45-122,156.35-195.85,51.85-93.5,84.3-199.3,91.9-311.9,1.15-16.95,1.75-34,1.75-51.25,0-17.25-.6-34.3-1.75-51.25-7.23-107.11-36.95-208.08-84.46-298.15-4.36-8.27-2.59-18.41,4.41-24.62,88.28-78.4,204.48-125.99,331.8-125.99Z"/>
              <path fill="url(#grad2)" stroke="#fff" strokeMiterlimit="10" strokeWidth="0.625" d="M475.15,1474.5c-37.7-1.93-74.24-8-109.14-17.74C149.01,1396.36-5.93,1194.19.84,960.78c.14-3.7.28-7.45.47-11.14.19-3.7.43-7.44.67-11.13C19.39,657.33,151.73,410.01,350.81,240.09t.05-.05c28.85-24.71,59.01-47.65,90.53-68.87C614.73,54.21,826.06-9.54,1051.02,1.95c224.96,11.49,428.69,96.44,589.21,230.46,9.67,8.06,19.18,16.29,28.51,24.69,15.15,13.63,2.4,38.58-17.57,34.5h0c-36.86-7.59-74.81-12.48-113.56-14.46-191.85-9.8-370.5,53.37-509.09,165.25-65.17,52.59-121.52,115.95-166.14,187.62-56.55,90.73-94.36,194.74-107.69,306.81-2.01,16.87-3.48,33.87-4.36,51.09-.88,17.23-1.15,34.29-.87,51.27,1.76,107.34,26.29,209.69,69.14,302.07,3.94,8.49,1.64,18.52-5.66,24.36-92.16,73.8-210.64,115.39-337.8,108.9Z"/>
            </g>
          </svg>
        )}
      </motion.button>
    </div>
  );
}
