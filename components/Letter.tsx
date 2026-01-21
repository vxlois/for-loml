
import React from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { AnimationPhase } from '../App';

interface LetterProps {
  phase: AnimationPhase;
  onExpand: () => void;
  onNext: () => void;
  onReset: () => void;
  content: {
    intro: string;
    to: string;
    body: string;
    signOff?: string;
    from: string;
  };
}

const Letter: React.FC<LetterProps> = ({ phase, onExpand, onNext, onReset, content }) => {
  const paragraphs = content.body.split('\n\n');
  const isExpanded = phase === 'expanded';
  const isOutside = phase === 'outside';
  const isPeek = phase === 'peek';
  const isClosed = phase === 'closed';

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.06
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 5 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  const getY = () => {
    if (isClosed) return 30;
    if (isPeek) return -120; 
    if (isOutside) return 0; 
    if (isExpanded) return -85; 
    return 30;
  };

  return (
    <motion.div
      initial={{ y: 30, opacity: 0, scale: 0.95 }}
      animate={{ 
        y: getY(),
        opacity: isClosed ? 0 : 1,
        scale: isExpanded ? 1.08 : 1,
        rotate: isExpanded ? -1.5 : (isOutside ? -4 : 0),
        boxShadow: isExpanded 
          ? "0 15px 30px -5px rgba(0,0,0,0.12)" 
          : (isOutside ? "0 10px 25px rgba(0,0,0,0.12)" : "0 4px 10px rgba(0,0,0,0.05)")
      }}
      transition={{ 
        type: "spring",
        stiffness: isExpanded ? 110 : 90,
        damping: isExpanded ? 24 : 18,
        mass: 1,
      }}
      onClick={(e) => {
        if (isOutside) {
          e.stopPropagation();
          onExpand();
        } else if (isExpanded) {
          e.stopPropagation();
          onNext();
        }
      }}
      className={`relative bg-[#fcfcf9] rounded-sm flex flex-col items-center justify-center pointer-events-auto transition-all overflow-hidden border-[1px] border-black/10
        ${isExpanded 
          ? 'w-[85vw] max-w-[340px] px-6 py-6 items-start cursor-pointer' 
          : 'w-[280px] h-[160px] px-4 cursor-pointer'
        }`}
      style={{ 
        zIndex: isExpanded ? 100 : 60,
        transformOrigin: 'center center'
      }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
      
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            key="teaser"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center w-full z-10 h-full"
          >
            <div className="font-handwritten text-[20px] text-[#444] font-medium tracking-wide italic">{content.intro}</div>
          </motion.div>
        ) : (
          <motion.div 
            key="full"
            className="w-full flex flex-col text-left relative z-10 origin-top"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={itemVariants} 
              className="font-handwritten text-[12px] text-[#1a1a1a] mb-1.5 font-bold"
            >
              Dear {content.to},
            </motion.div>
            
            <div className="font-handwritten text-[10px] text-[#2c2c2c] leading-[1.35] space-y-2">
              {paragraphs.map((paragraph, idx) => (
                <motion.p key={idx} variants={itemVariants}>
                  {paragraph}
                </motion.p>
              ))}
            </div>
            
            <motion.div variants={itemVariants} className="mt-4 w-full flex justify-end">
              <div className="text-right">
                <p className="font-handwritten text-[10px] text-[#444] opacity-70 italic leading-none">
                  {content.signOff}
                </p>
                <p className="font-handwritten text-[12px] text-[#1a1a1a] font-bold mt-1">{content.from}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Letter;
