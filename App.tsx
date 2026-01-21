import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingHearts from './components/FloatingHearts.tsx';
import Envelope from './components/Envelope.tsx';

export type AnimationPhase = 'closed' | 'peek' | 'outside' | 'expanded' | 'flowers';

const LETTER_CONTENT = {
  intro: "for my everything :P",
  to: "Yeli",
  body: `Happy 1st monthsary to us, baby! I know you’ve been going through a lot lately, and I just want you to know that I’m always here to listen and support you. Whatever other people say, I’ll always know the real you—the kind, amazing, and strong person I fell in love with. Even on your rough days, I hope you feel how much I care and how much you mean to me.

Being with you has helped me grow in ways I never imagined. Seeing your patience, understanding, and strength has inspired me to be a better version of myself. You’ve taught me that love isn’t just about being together—it’s about helping each other become better people, and I can honestly say I’m a better me because of you.

I assure you that I’ll always be here for you, especially on the days you feel empty or tired. I hope we can keep growing together, learning from each other, and supporting each other no matter what. So, happy monthsary again, baby! I love you so much, and I’ll never get tired of telling you just how much I love you.`,
  signOff: "With all my heart,",
  from: "Lois :)"
};

const App: React.FC = () => {
  const [phase, setPhase] = useState<AnimationPhase>('closed');

  const handleOpen = () => {
    if (phase === 'closed') {
      setPhase('peek');
    }
  };

  // Fixed the useEffect cleanup to return void (clearTimeout) instead of number (setTimeout results)
  useEffect(() => {
    if (phase === 'peek') {
      const timer = setTimeout(() => {
        setPhase('outside');
      }, 900); 
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleExpand = () => {
    if (phase === 'outside') {
      setPhase('expanded');
    }
  };

  const handleNext = () => {
    if (phase === 'expanded') {
      setPhase('flowers');
    }
  };

  const handleReset = () => {
    setPhase('closed');
  };

  return (
    <div className="relative w-full h-screen bg-[#fff0f3] flex flex-col items-center justify-center overflow-hidden touch-none select-none">
      <div className="absolute inset-0 bg-gradient-to-br from-[#fff0f3] via-[#ffdae3] to-[#ffd1dc] z-0" />
      
      <FloatingHearts />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 flex flex-col items-center w-full px-4 h-full justify-center"
      >
        <Envelope 
          phase={phase}
          onClick={handleOpen}
          onExpand={handleExpand}
          onNext={handleNext}
          onReset={handleReset}
          content={LETTER_CONTENT}
        />
      </motion.div>
    </div>
  );
};

export default App;