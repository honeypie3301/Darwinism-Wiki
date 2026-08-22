import React from 'react';

interface DarwinismIconProps {
  className?: string;
}

export default function DarwinismIcon({ className = "w-full h-full" }: DarwinismIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 512 512" 
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="dnaGrad1_inline" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="dnaGrad2_inline" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
      </defs>

      {/* DNA Helix Strands */}
      <g>
        {/* Strand 1 */}
        <path 
          d="M 160 110 C 310 180, 310 330, 160 402" 
          stroke="url(#dnaGrad1_inline)" 
          strokeWidth="36" 
          strokeLinecap="round" 
        />
        {/* Strand 2 */}
        <path 
          d="M 352 110 C 202 180, 202 330, 352 402" 
          stroke="url(#dnaGrad2_inline)" 
          strokeWidth="36" 
          strokeLinecap="round" 
        />

        {/* Connecting Base Pairs */}
        <line x1="195" y1="155" x2="317" y2="155" stroke="#38bdf8" strokeWidth="18" strokeLinecap="round" opacity="0.9" />
        <line x1="232" y1="215" x2="280" y2="215" stroke="#22d3ee" strokeWidth="18" strokeLinecap="round" opacity="0.9" />
        <line x1="232" y1="297" x2="280" y2="297" stroke="#22d3ee" strokeWidth="18" strokeLinecap="round" opacity="0.9" />
        <line x1="195" y1="357" x2="317" y2="357" stroke="#38bdf8" strokeWidth="18" strokeLinecap="round" opacity="0.9" />

        {/* Nodes */}
        <circle cx="160" cy="110" r="26" fill="#7dd3fc" />
        <circle cx="352" cy="110" r="26" fill="#38bdf8" />
        <circle cx="256" cy="256" r="32" fill="#e0f2fe" />
        <circle cx="160" cy="402" r="26" fill="#38bdf8" />
        <circle cx="352" cy="402" r="26" fill="#7dd3fc" />
      </g>
    </svg>
  );
}
