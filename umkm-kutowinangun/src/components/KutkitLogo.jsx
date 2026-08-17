import React from 'react';

export default function KutkitLogo({ className = "w-10 h-10" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 512 512" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8"/>
          <stop offset="50%" stopColor="#0ea5e9"/>
          <stop offset="100%" stopColor="#0284c7"/>
        </linearGradient>
      </defs>

      {/* Background Kotak Membulat */}
      <rect x="32" y="32" width="448" height="448" rx="128" fill="url(#logoBg)"/>
      <rect x="34" y="34" width="444" height="444" rx="126" fill="none" stroke="#ffffff" strokeWidth="6" strokeOpacity="0.3"/>

      {/* Atap Kanopi Gerai Toko UMKM */}
      <path d="M 120 185 L 145 130 C 150 120 160 115 172 115 L 340 115 C 352 115 362 120 367 130 L 392 185 Z" fill="#ffffff"/>
      
      {/* Rumbai Tenda Toko */}
      <path d="M 120 185 C 120 202 142 202 142 185 Z" fill="#ffffff"/>
      <path d="M 142 185 C 142 202 188 202 188 185 Z" fill="#bae6fd"/>
      <path d="M 188 185 C 188 202 234 202 234 185 Z" fill="#ffffff"/>
      <path d="M 234 185 C 234 202 280 202 280 185 Z" fill="#bae6fd"/>
      <path d="M 280 185 C 280 202 326 202 326 185 Z" fill="#ffffff"/>
      <path d="M 326 185 C 326 202 370 202 370 185 Z" fill="#bae6fd"/>
      <path d="M 370 185 C 370 202 392 202 392 185 Z" fill="#ffffff"/>
      <path d="M 125 185 L 387 185" stroke="#0284c7" strokeWidth="4" strokeLinecap="round"/>

      {/* Huruf K (Pilar dan Cabang) */}
      <rect x="145" y="215" width="44" height="175" rx="14" fill="#ffffff"/>
      <path d="M 205 305 L 295 215 C 304 206 318 206 327 215 L 333 221 C 342 230 342 244 333 253 L 255 330 Z" fill="#ffffff"/>
      <path d="M 245 320 L 325 400 C 334 409 334 423 325 432 L 319 438 C 310 447 296 447 287 438 L 195 346 Z" fill="#ffffff"/>

      {/* Tas Belanja UMKM */}
      <g transform="translate(305, 275)">
        <path d="M 25 18 C 25 2 55 2 55 18" fill="none" stroke="#f0f9ff" strokeWidth="5" strokeLinecap="round"/>
        <rect x="12" y="16" width="56" height="52" rx="10" fill="#f0f9ff"/>
        <path d="M 28 42 Q 40 52 52 42" fill="none" stroke="#0284c7" strokeWidth="4.5" strokeLinecap="round"/>
      </g>
    </svg>
  );
}