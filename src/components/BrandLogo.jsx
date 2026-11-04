import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Animated Cute Cartoon Mascot ("Lil' Dummy") for DummyStore
 * Continuous Storyline Loop (Always visible):
 * 1. Center stage: friendly wave, cheeky wink & cap tilt
 * 2. Scoots across to the right edge (100% visible)
 * 3. Leans OUTSIDE the frame edge, gripping the border & curiously peeking
 * 4. Springs back to center with a squishy cartoon bounce!
 */
export function DummyMascotIcon({ className = 'w-9 h-9 sm:w-10 sm:h-10' }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
  };

  return (
    <div 
      onClick={handleClick}
      className={`relative shrink-0 select-none cursor-pointer ${className} ${
        isClicked ? 'animate-[spin_0.5s_ease-in-out]' : ''
      }`}
      title="Hey! I'm the DummyStore Mascot! 😉"
    >
      <svg
        className="w-full h-full drop-shadow-xs overflow-visible"
        viewBox="-10 -10 125 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="DummyStore Living Mascot"
      >
        <style>{`
          @keyframes dummyStoryCycle {
            0%, 26% { transform: translate(0px, 0px) rotate(0deg) scale(1, 1); }
            12% { transform: translate(0px, -2px) scale(0.99, 1.01); }
            28% { transform: translate(2px, 1px) rotate(3deg) scale(1.02, 0.98); }
            36% { transform: translate(14px, 0px) rotate(6deg) scale(0.98, 1.02); }
            42% { transform: translate(26px, 1px) rotate(11deg) scale(1, 1); }
            48% { transform: translate(33px, 0px) rotate(15deg) scale(0.99, 1.01); }
            54%, 66% { transform: translate(35px, -1px) rotate(17deg) scale(1.02); }
            62% { transform: translate(33px, 1px) rotate(14deg) scale(0.99); }
            70% { transform: translate(28px, 2px) rotate(10deg) scale(1.03, 0.97); }
            76% { transform: translate(12px, -4px) rotate(-3deg) scale(0.95, 1.05); }
            82% { transform: translate(-2px, 2px) rotate(1deg) scale(1.04, 0.96); }
            88% { transform: translate(0px, -1px) scale(0.99, 1.01); }
            94%, 100% { transform: translate(0px, 0px) rotate(0deg) scale(1, 1); }
          }
          @keyframes dummyWaveCycle {
            0%, 30%, 80%, 100% { transform: rotate(0deg); }
            6%, 18%, 86%, 94% { transform: rotate(-18deg); }
            12%, 24%, 90% { transform: rotate(8deg); }
            52%, 64% { transform: rotate(-14deg); }
            58%, 68% { transform: rotate(6deg); }
          }
          @keyframes dummyCapTiltCycle {
            0%, 10%, 28%, 100% { transform: rotate(0deg); }
            14%, 24% { transform: rotate(-8deg) translateY(-1px); }
          }
          @keyframes dummyEyeOpenCycle {
            0%, 12%, 26%, 100% { opacity: 1; transform: scaleY(1); }
            15%, 23% { opacity: 0; transform: scaleY(0.08); }
          }
          @keyframes dummyEyeWinkCycle {
            0%, 12%, 26%, 100% { opacity: 0; transform: scale(0.4); }
            15%, 23% { opacity: 1; transform: scale(1); }
          }

          .dummy-story-mascot {
            animation: dummyStoryCycle 7s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            transform-origin: 50px 60px;
          }
          .dummy-story-paw {
            transform-box: fill-box;
            transform-origin: 90% 80%;
            animation: dummyWaveCycle 7s ease-in-out infinite;
          }
          .dummy-story-cap {
            transform-box: fill-box;
            transform-origin: center bottom;
            animation: dummyCapTiltCycle 7s ease-in-out infinite;
          }
          .dummy-story-eye-open {
            transform-box: fill-box;
            transform-origin: center center;
            animation: dummyEyeOpenCycle 7s ease-in-out infinite;
          }
          .dummy-story-eye-wink {
            transform-box: fill-box;
            transform-origin: center center;
            animation: dummyEyeWinkCycle 7s ease-in-out infinite;
          }

          /* Interactive hover */
          .group:hover .dummy-story-mascot {
            animation: dummyHoverHop 0.45s ease-in-out infinite alternate !important;
          }
          @keyframes dummyHoverHop {
            0% { transform: translate(0px, 0px) rotate(-1deg) scale(1.05); }
            100% { transform: translate(0px, -4px) rotate(1.5deg) scale(1.05); }
          }
          .group:hover .dummy-story-paw {
            animation: dummyFastWave 0.4s ease-in-out infinite !important;
          }
          @keyframes dummyFastWave {
            0%, 100% { transform: rotate(-20deg); }
            50% { transform: rotate(12deg); }
          }
          .group:hover .dummy-story-eye-open {
            opacity: 0 !important;
          }
          .group:hover .dummy-story-eye-wink {
            opacity: 1 !important;
            transform: scale(1.08) !important;
          }
        `}</style>

        {/* 1. The Red Rounded Tile */}
        <rect x="0" y="0" width="100" height="100" rx="26" fill="#E12D2D" />

        {/* 2. Living Character */}
        <g className="dummy-story-mascot">
          {/* Chubby Ghost Body */}
          <path
            d="M 50 24 C 32 24, 26 39, 26 58 C 26 73, 33 80, 40 76 C 45 73, 47 76, 50 76 C 53 76, 55 73, 60 76 C 67 80, 74 73, 74 58 C 74 39, 68 24, 50 24 Z"
            fill="#FFFFFF"
          />

          {/* Animated Waving Left Paw */}
          <g className="dummy-story-paw">
            <path
              d="M 27 52 C 18 47, 16 38, 21 34 C 26 30, 29 42, 28 50 Z"
              fill="#FFFFFF"
            />
          </g>

          {/* Right Arm */}
          <ellipse cx="73" cy="54" rx="4.5" ry="4" fill="#FFFFFF" />

          {/* Tilted Backwards Cap */}
          <g className="dummy-story-cap">
            <path
              d="M 33 29 C 36 19, 64 19, 67 29 C 61 26, 39 26, 33 29 Z"
              fill="#1E293B"
            />
            <path
              d="M 61 25 C 71 25, 77 28, 78 31 C 77 33, 69 32, 61 30 Z"
              fill="#0F172A"
            />
            <circle cx="50" cy="20" r="2.5" fill="#E12D2D" />
          </g>

          {/* Left Eye */}
          <ellipse cx="42" cy="45" rx="4.5" ry="6" fill="#0F172A" />
          <circle cx="40.5" cy="42.5" r="2" fill="#FFFFFF" />
          <circle cx="43.5" cy="47" r="0.9" fill="#FFFFFF" />

          {/* Right Eye */}
          <g className="dummy-story-eye-open">
            <ellipse cx="58" cy="45" rx="4.5" ry="6" fill="#0F172A" />
            <circle cx="56.5" cy="42.5" r="2" fill="#FFFFFF" />
            <circle cx="59.5" cy="47" r="0.9" fill="#FFFFFF" />
          </g>
          <path
            className="dummy-story-eye-wink"
            d="M 54 46 Q 58 40 63 45"
            stroke="#0F172A"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Rosy Pink Cheeks */}
          <ellipse cx="35" cy="52" rx="4.5" ry="2.2" fill="#FDA4AF" />
          <ellipse cx="65" cy="52" rx="4.5" ry="2.2" fill="#FDA4AF" />

          {/* Cheerful Open Smile */}
          <path d="M 45 52 Q 50 60 55 52 Z" fill="#0F172A" />
          <path d="M 47 55 Q 50 59 53 55 Z" fill="#FB7185" />
        </g>
      </svg>
    </div>
  );
}

export default function BrandLogo({ 
  variant = 'header', 
  className = '',
  showTagline = true,
  to = '/'
}) {
  const isDark = variant === 'dark' || variant === 'footer';

  const content = (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Animated Cute Living Mascot Emblem */}
      <DummyMascotIcon />

      {/* Clean Brand Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center tracking-tight">
          <span className={`font-black text-xl sm:text-2xl uppercase transition-colors ${
            isDark ? 'text-white' : 'text-gray-950 group-hover:text-[#e12d2d]'
          }`}>
            DUMMY
          </span>
          <span className="font-black text-xl sm:text-2xl uppercase text-[#e12d2d] ml-0.5">
            STORE
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`text-[8.5px] font-bold tracking-[0.24em] uppercase ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              ORIGINAL MERCH &amp; DROPS
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}
