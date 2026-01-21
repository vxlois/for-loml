import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Letter from './Letter';
import FlowerScene from './FlowerScene';
import { AnimationPhase } from '../App';

interface EnvelopeProps {
  phase: AnimationPhase;
  onClick: () => void;
  onExpand: () => void;
  onNext: () => void;
  onReset: () => void;
  content: {
    intro: string;
    to: string;
    body: string;
    from: string;
  };
}

const Envelope: React.FC<EnvelopeProps> = ({ phase, onClick, onExpand, onNext, onReset, content }) => {
  const outlineColor = "#a71d31"; 
  const envelopeColor = "#ff8fab"; 
  const interiorColor = "#ffb3c1"; 
  const sealColor = "#c9184a"; 

  const isClosed = phase === 'closed';
  const isOpen = phase !== 'closed';
  const isExpanded = phase === 'expanded' || phase === 'flowers';

  const heartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

  return (
    <div className="relative w-full max-w-[320px] sm:max-w-[340px] h-[200px] sm:h-[220px] flex items-center justify-center">
      <motion.div
        onClick={isClosed ? onClick : undefined}
        animate={isOpen 
          ? { y: isExpanded ? 30 : 20, scale: isExpanded ? 0.95 : 1.05 } 
          : { y: [0, -12, 0] }
        }
        transition={{ 
          y: isOpen ? { duration: 0.8, ease: "easeOut" } : { duration: 3, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 0.5 }
        }}
        className="relative w-full h-full cursor-pointer z-10"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className={`absolute inset-0 bg-black/20 blur-xl rounded-xl transition-opacity duration-700 translate-x-4 translate-y-6 ${isOpen ? 'opacity-20' : 'opacity-60'}`} />

        {/* Flap inside (open state) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          className="absolute left-0 bottom-full w-full pointer-events-none z-0 overflow-visible"
          style={{ height: '45%' }}
        >
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
            <foreignObject x="40" y="-14" width="20" height="20">
              <div className="w-full h-full flex items-center justify-center">
                <svg 
                  width="18" height="18" viewBox="0 0 24 24" 
                  style={{ 
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                    transform: 'rotate(180deg)' 
                  }}
                >
                   <path d={heartPath} fill={sealColor} stroke="white" strokeWidth="0.5" />
                </svg>
              </div>
            </foreignObject>
            <path d="M 0 30 L 50 0 L 100 30 Z" fill={envelopeColor} stroke={outlineColor} strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M 0 30 L 50 0 L 100 30" fill="none" stroke={outlineColor} strokeWidth="1.5" />
          </svg>
        </motion.div>

        {/* Interior */}
        <div 
          className="absolute inset-0 rounded-sm overflow-hidden z-10 border-[2px]"
          style={{ 
            backgroundColor: interiorColor, 
            borderColor: outlineColor 
          }}
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 66" preserveAspectRatio="none">
            <path d="M 0 0 L 50 33 L 100 0" fill="none" stroke={outlineColor} strokeWidth="1" opacity="0.4" />
          </svg>
        </div>

        {/* Dynamic Content (Letter or Flowers) */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={{ zIndex: (phase === 'peek' || phase === 'closed') ? 15 : 60 }}
          transition={{ delay: phase === 'outside' ? 0.2 : 0 }}
        >
          <AnimatePresence mode="wait">
            {phase === 'flowers' ? (
              <FlowerScene key="flowers" onClose={onReset} />
            ) : (
              <Letter 
                key="letter"
                phase={phase}
                onExpand={onExpand} 
                onNext={onNext}
                onReset={onReset}
                content={content} 
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Flap (closed state) */}
        <motion.div
          initial={false}
          animate={{ 
            rotateX: isOpen ? 180 : 0,
            opacity: isOpen ? 0 : 1, 
            zIndex: isOpen ? 5 : 40
          }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{ 
            transformOrigin: "top",
            height: "100%", 
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            transformStyle: 'preserve-3d'
          }}
        >
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 66" preserveAspectRatio="none">
            <path d="M 0 0 L 50 45 L 100 0 Z" fill={envelopeColor} stroke={outlineColor} strokeWidth="1.5" strokeLinejoin="round" />
            <foreignObject x="35" y="22" width="30" height="30">
              <div className="w-full h-full flex items-center justify-center">
                 <motion.svg 
                    width="24" height="24" viewBox="0 0 24 24"
                    animate={isClosed ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
                  >
                   <path d={heartPath} fill={sealColor} stroke="white" strokeWidth="0.5" />
                </motion.svg>
              </div>
            </foreignObject>
          </svg>
        </motion.div>

        {/* Envelope Body Overlay */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 66" preserveAspectRatio="none">
            <path d="M 0 0 L 50 33 L 0 66 Z" fill={envelopeColor} stroke={outlineColor} strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M 100 0 L 50 33 L 100 66 Z" fill={envelopeColor} stroke={outlineColor} strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M 0 66 L 50 33 L 100 66 Z" fill={envelopeColor} stroke={outlineColor} strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default Envelope;