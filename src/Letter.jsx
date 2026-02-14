import React, { useState, useEffect, useRef, useMemo } from "react";
import "./Letter.css";

const Letter = ({ onMoreSurprises, onBack }) => {

  /* ---------------- MOBILE DETECTION ---------------- */
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  /* ---------------- TYPEWRITER STATE ---------------- */
  const [isTyping, setIsTyping] = useState(false);
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  /* ✅ Memoized letter content (fixes ESLint warning) */
  const letterContent = useMemo(() => [
  "My Dearest Love, 💖",
  "",
  "Happy Valentine’s ig 😭, hope you liked this.",
  "Fuck you, I’ll still give you a letter even if you tell me no, hehe.",
  "There’s still a way.",
  "",
  "I AM SO PROUD THAT YOU PASSED",
  "AND YOU WERE ABLE TO CLUTCH IT UP LAST MOMENT.",
  "",
  "Have fun and enjoy the 4 days you get.",
  "Start singing and drawing, I want that Athena back.",
  "Bring those back.",
  "",
  "I hope you liked the edit as well 😭",
  "",
  "MF I KNOW YOU TRIED TO CLICK NO 😠😠",
  "HOW DARE YOU.",
  "",
  "OUR 3RD VALENTINE’S TOGETHER.",
  "We haven’t celebrated properly because exams every time,",
  "but that’s FINEEEEE.",
  "",
  "Take good care of yourself.",
  "The first step of being a better human is that.",
  "I’m so proud of you for trying to figure things out",
  "even when life throws so many struggles in front of you.",
  "",
  "You’ll forever be my little princess.",
  "And as long as I live, I’ll forever pamper and spoil you.",
  "",
  "You are the best thing to ever happen to me.",
  "My favourite human being.",
  "You give me a sense of responsibility",
  "and the urge to become a better boyfriend,",
  "so you can have a better boyfriend 😭",
  "",
  "I love you so fucking much, Athena.",
  "I’m writing this at 2am, brain-dead,",
  "so please consider my mistakes.",
  "",
  "Do approach me when things get uneasy.",
  "No matter what, always bother me and annoy me.",
  "Promise?",
  "",
  "AAAHHH YOU ARE SO PRETTY.",
  "THAT EDIT WAS SO NEEDEDDDDDD.",
  "BECAUSE YOU ARE PRETTY ENOUGH.",
  "",
  "Next year I hope we have an amazing farewell,",
  "lock in on our studies, get good grades,",
  "and be that couple who cooks together <33",
  "",
  "About me cheating?",
  "WHY DO YOU EVEN THINK THAT?",
  "There will be pictures of you everywhere —",
  "wallpaper, lock screen, wallet.",
  "I’ll cringe and love them.",
  "",
  "You are still learning.",
  "It’s okay.",
  "Please stay kind to yourself.",
  "Don’t be harsh on yourself, alright?",
  "",
  "I really hope this works out.",
  "That we go through all the distance and challenges together",
  "and finally make it.",
  "I daydream about it so much.",
  "",
  "Sending you loads of love and hugs.",
  "Take care, my baby.",
  "",
  "Do your hobbies.",
  "Start them again.",
  "Be the kind of girl little kids look up to",
  "and wish to be like.",
  "I know you will.",
  "",
  "I really love your love for animals.",
  "You’re so damn sweet.",
  "Sweetheart fr.",
  "",
  "How did I get so lucky to have you?",
  "Thank you so much, Athena 😭😭😭",
  "Mwuahhh.",
  "",
  "Consider this my way of expressing love,",
  "because I suck at art 😭",
  "I hope you liked the design and this letter,",
  "even if it’s a little stupid.",
  "",
  "Thank you for staying by my side.",
  "You are an amazing girlfriend and friend to me 😭",
  "Thank you so much for giving me that chance that day.",
  "",
  "LOTS OF LOVE FOR MY BABY.",
  "",
  "Love you, baby.",
  "Mwuahh.",
  "Forever my princess.",
  "",
  "I love you so much, darling!!!!!",
  "HAPPY VALENTINE’S 💖",
  "",
  "May God give you everything you wished for as a kid.",
  "May God guide you to becoming a better human being.",
  "I’ll always pray for your well-being.",
  "",
  "TO — THE PRETTIEST OF ALL",
  "BY — THE LUCKIEST OF ALL",
], []);


  const typingTimeoutRef = useRef(null);

  /* ⏳ Delay before typing */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  /* ✍️ Typing animation */
  useEffect(() => {
    if (!isTyping || currentLineIndex >= letterContent.length) return;

    const currentLine = letterContent[currentLineIndex];

    if (currentCharIndex <= currentLine.length) {
      typingTimeoutRef.current = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];

          if (!newLines[currentLineIndex]) {
            newLines[currentLineIndex] = "";
          }

          newLines[currentLineIndex] =
            currentLine.substring(0, currentCharIndex);

          return newLines;
        });

        setCurrentCharIndex((prev) => prev + 1);
      }, 30);
    } else {
      typingTimeoutRef.current = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 150);
    }

    return () => clearTimeout(typingTimeoutRef.current);
  }, [isTyping, currentLineIndex, currentCharIndex, letterContent]);

  /* 📜 Auto-scroll */
  useEffect(() => {
    const container = document.querySelector(".letter-content-area");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [displayedLines]);

  return (
    <div className="letter-container">

      {/* ---------------- DESKTOP VERSION ---------------- */}
      {!isMobile && (
        <div className="mailbox-scene">
          <div className="mailbox">
            <div className="mailbox-lid"></div>
          </div>

          <div className="letter-rise">
            <LetterPaper
              displayedLines={displayedLines}
              isTyping={isTyping}
              currentLineIndex={currentLineIndex}
              letterContent={letterContent}
            />
          </div>
        </div>
      )}

      {/* ---------------- MOBILE VERSION ---------------- */}
      {isMobile && (
        <div className="mobile-letter-wrapper">
          <LetterPaper
            displayedLines={displayedLines}
            isTyping={isTyping}
            currentLineIndex={currentLineIndex}
            letterContent={letterContent}
          />
        </div>
      )}

      {currentLineIndex < letterContent.length && (
        <div className="typing-hint">
          Happy Valentine's Day! ❤️
        </div>
      )}
    </div>
  );
};

/* ---------------- LETTER PAPER COMPONENT ---------------- */

const LetterPaper = ({
  displayedLines,
  isTyping,
  currentLineIndex,
  letterContent,
}) => {
  return (
    <div className="vintage-letter-paper">
      <div className="paper-texture"></div>

      <div className="letter-content-area">
        <pre className="handwritten-text">
          {displayedLines.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < displayedLines.length - 1 && "\n"}
            </React.Fragment>
          ))}
          {isTyping && currentLineIndex < letterContent.length && (
            <span className="type-cursor">|</span>
          )}
        </pre>
      </div>

      <div className="paper-corner corner-tl"></div>
      <div className="paper-corner corner-tr"></div>
      <div className="paper-corner corner-bl"></div>
      <div className="paper-corner corner-br"></div>

      {currentLineIndex >= letterContent.length && (
        <div className="wax-seal">💌</div>
      )}
    </div>
  );
};

export default Letter;
