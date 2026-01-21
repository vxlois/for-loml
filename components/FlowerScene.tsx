
import React from 'react';
import { motion } from 'framer-motion';

interface FlowerSceneProps {
  onClose: () => void;
}

const SunflowerHead: React.FC<{ size: number; rotation?: number }> = ({ size, rotation = 0 }) => (
  <div 
    className="relative flex-shrink-0"
    style={{ width: size, height: size, transform: `rotate(${rotation}deg)` }}
  >
    {/* Petals */}
    {[...Array(12)].map((_, i) => (
      <div 
        key={`p-${i}`}
        className="absolute top-1/2 left-1/2 rounded-full border border-black/5"
        style={{
          width: size * 0.48,
          height: size * 0.22,
          backgroundColor: '#ffc300',
          transform: `translate(-50%, -50%) rotate(${i * 30}deg) translate(${size * 0.28}px)`,
        }}
      />
    ))}
    {/* Center */}
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#3d1d09] rounded-full border border-[#1a0f06] z-10 overflow-hidden shadow-inner"
      style={{ width: size * 0.42, height: size * 0.42 }}
    >
      <div className="absolute inset-0 grid grid-cols-3 gap-0.5 opacity-30 rotate-12">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-1 h-1 bg-black rounded-full" />
        ))}
      </div>
    </div>
  </div>
);

const BabysBreath: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div className="absolute flex items-center justify-center pointer-events-none" style={style}>
    <div className="w-1 h-1 bg-white rounded-full shadow-sm" />
    <div className="absolute -top-1 -left-1 w-0.5 h-0.5 bg-white rounded-full opacity-60" />
    <div className="absolute -bottom-1 -right-1 w-0.5 h-0.5 bg-white rounded-full opacity-60" />
  </div>
);

const Leaf: React.FC<{ rotation: number; scale?: number; style?: React.CSSProperties }> = ({ rotation, scale = 1, style }) => (
  <div 
    className="absolute bg-[#3a6b35] rounded-[100%_0%_100%_0%] border border-[#2d5a27]/30"
    style={{ 
      width: 14 * scale, 
      height: 8 * scale, 
      transform: `rotate(${rotation}deg)`,
      ...style
    }}
  />
);

const FlowerScene: React.FC<FlowerSceneProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0, scale: 0.95 }}
      animate={{ 
        y: -85, 
        opacity: 1, 
        scale: 1.08, 
        rotate: -1.5,
        boxShadow: "0 15px 30px -5px rgba(0,0,0,0.12)"
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        type: "spring", 
        stiffness: 110, 
        damping: 24,
        mass: 1
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClose(); // Triggers reset back to 'closed' phase
      }}
      className="relative w-[85vw] max-w-[340px] h-[320px] bg-[#efeee5] rounded-sm px-6 py-5 border-[1px] border-black/10 cursor-pointer overflow-hidden flex flex-col items-center pointer-events-auto"
    >
      {/* Paper texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"
        style={{ backgroundRepeat: 'repeat' }}
      />
      
      {/* Content Container */}
      <div className="flex-grow flex flex-col items-center justify-center w-full relative z-10">
        
        {/* Bouquet Container */}
        <div className="relative mb-6 flex flex-col items-center justify-center w-full">
          <div className="relative flex items-end justify-center w-full h-36">
             
             {/* Stems */}
             <div className="absolute bottom-2 flex justify-center w-full opacity-90">
                {/* Left Stem */}
                <div className="relative">
                  <div className="w-1.5 h-24 bg-[#2d5a27] rounded-full -rotate-[12deg] translate-x-4">
                    <Leaf rotation={-40} style={{ top: '20%', left: '-10px' }} scale={1.2} />
                    <Leaf rotation={160} style={{ top: '50%', right: '-12px' }} scale={1} />
                  </div>
                </div>
                {/* Center Stem */}
                <div className="relative">
                  <div className="w-1.5 h-28 bg-[#2d5a27] rounded-full mx-1">
                    <Leaf rotation={-20} style={{ top: '30%', left: '-12px' }} scale={1.1} />
                    <Leaf rotation={200} style={{ top: '60%', right: '-10px' }} scale={1.1} />
                  </div>
                </div>
                {/* Right Stem */}
                <div className="relative">
                  <div className="w-1.5 h-24 bg-[#2d5a27] rounded-full rotate-[12deg] -translate-x-4">
                    <Leaf rotation={-160} style={{ top: '40%', left: '-10px' }} scale={1} />
                    <Leaf rotation={40} style={{ top: '15%', right: '-12px' }} scale={1.2} />
                  </div>
                </div>
             </div>

             {/* Baby's Breath scattered */}
             <div className="absolute inset-0 z-10 pointer-events-none">
                <BabysBreath style={{ top: '30%', left: '25%' }} />
                <BabysBreath style={{ top: '25%', left: '45%' }} />
                <BabysBreath style={{ top: '35%', left: '70%' }} />
                <BabysBreath style={{ top: '50%', left: '20%' }} />
                <BabysBreath style={{ top: '55%', left: '80%' }} />
                <BabysBreath style={{ top: '45%', left: '50%' }} />
                <BabysBreath style={{ top: '20%', left: '60%' }} />
             </div>

             {/* Sunflower Bunch */}
             <div className="relative z-20 w-44 h-32 flex items-center justify-center mb-6">
                <div className="absolute -translate-x-12 translate-y-4 -rotate-15 z-10 scale-90 opacity-95">
                   <SunflowerHead size={48} />
                </div>
                <div className="absolute translate-x-12 translate-y-6 rotate-12 z-10 scale-85 opacity-95">
                   <SunflowerHead size={42} />
                </div>
                <div className="absolute -translate-x-7 translate-y-0 -rotate-6 z-30">
                   <SunflowerHead size={58} />
                </div>
                <div className="absolute translate-x-8 translate-y-2 rotate-8 z-30">
                   <SunflowerHead size={52} />
                </div>
                <div className="absolute -translate-y-8 z-50 filter drop-shadow-md">
                   <SunflowerHead size={72} />
                </div>
             </div>

             {/* Enhanced Ribbon Bow */}
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
                <div className="relative flex flex-col items-center">
                  {/* The Bow */}
                  <div className="flex items-center -space-x-1">
                    <div className="w-6 h-4 bg-pink-400 rounded-full border border-pink-500/50 shadow-sm" />
                    <div className="w-3 h-3 bg-pink-500 rounded-sm z-10 shadow-sm" />
                    <div className="w-6 h-4 bg-pink-400 rounded-full border border-pink-500/50 shadow-sm" />
                  </div>
                  {/* Bow Tails */}
                  <div className="flex -space-x-2 -mt-1">
                    <div className="w-1.5 h-6 bg-pink-400/80 rounded-full rotate-[25deg] origin-top border-l border-pink-500/30" />
                    <div className="w-1.5 h-6 bg-pink-400/80 rounded-full -rotate-[25deg] origin-top border-r border-pink-500/30" />
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Label */}
        <div className="text-center w-full">
          <h2 className="font-handwritten text-[18px] text-[#d63384] tracking-wide leading-tight filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.03)] font-medium">
            flowers for you my love
          </h2>
          <div className="mt-1 w-8 h-[1px] bg-[#d63384]/30 mx-auto" />
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute bottom-3 right-3 opacity-20">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#d63384">
           <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </motion.div>
  );
};

export default FlowerScene;
