import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  variant?: 'light' | 'dark' | 'gold' | 'seal';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  variant = 'dark',
}) => {
  // If variant === 'seal', render the circular seal seen on the cover
  if (variant === 'seal') {
    const sealSizes = {
      sm: { diameter: 70, title: 'text-xs', sub: 'text-[9px]' },
      md: { diameter: 90, title: 'text-sm', sub: 'text-[10px]' },
      lg: { diameter: 110, title: 'text-base', sub: 'text-xs' },
      xl: { diameter: 130, title: 'text-lg', sub: 'text-xs' },
    };
    const { diameter, title, sub } = sealSizes[size];

    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {/* Circular Seal Emblem */}
        <div className="relative" style={{ width: diameter, height: diameter }}>
          <svg
            width={diameter}
            height={diameter}
            viewBox="0 0 140 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-sm"
          >
            {/* Outer dotted gold ring */}
            <circle cx="70" cy="70" r="67" stroke="#075B3A" strokeWidth="1.2" />
            <circle cx="70" cy="70" r="64" stroke="#D9A441" strokeWidth="1" strokeDasharray="3 2" />

            {/* Circular Text Paths */}
            <defs>
              <path
                id="textPathTop"
                d="M 22 70 A 48 48 0 0 1 118 70"
                fill="none"
              />
              <path
                id="textPathBottom"
                d="M 118 70 A 48 48 0 0 1 22 70"
                fill="none"
              />
            </defs>

            {/* Arc text top */}
            <text fill="#064A32" fontSize="7.8" fontWeight="600" letterSpacing="0.08em" textAnchor="middle">
              <textPath href="#textPathTop" startOffset="50%">
                A Holistic Inner Transformation
              </textPath>
            </text>

            {/* Arc text bottom */}
            <text fill="#064A32" fontSize="7.2" fontWeight="600" letterSpacing="0.08em" textAnchor="middle">
              <textPath href="#textPathBottom" startOffset="50%">
                Transform Your Mind, Elevate Your Life
              </textPath>
            </text>

            {/* Inner Circle with Gold Rim and Deep Forest Core */}
            <circle cx="70" cy="70" r="41" fill="#064A32" stroke="#D9A441" strokeWidth="2.5" />
            <circle cx="70" cy="70" r="39" stroke="#EED894" strokeWidth="0.8" opacity="0.6" />

            {/* Radiating Aura Dots above head */}
            <circle cx="70" cy="44" r="1.8" fill="#F5C042" />
            <circle cx="64" cy="46" r="1.4" fill="#F5C042" />
            <circle cx="76" cy="46" r="1.4" fill="#F5C042" />
            <circle cx="59" cy="50" r="1.1" fill="#F5C042" />
            <circle cx="81" cy="50" r="1.1" fill="#F5C042" />
            <circle cx="70" cy="40" r="1.2" fill="#FFE28A" />

            {/* Meditating Silhouette Figure in Lotus Pose */}
            {/* Head */}
            <circle cx="70" cy="52" r="4.5" fill="#FAF6EE" />
            {/* Torso & arms in meditative prayer / dhyana mudra */}
            <path
              d="M70 57C66 57 63 60 62 64L64 74H76L78 64C77 60 74 57 70 57Z"
              fill="#FAF6EE"
            />
            {/* Folded legs in padmasana */}
            <path
              d="M56 74C56 71 62 69 70 69C78 69 84 71 84 74C83 77 77 78 70 78C63 78 57 77 56 74Z"
              fill="#FAF6EE"
            />

            {/* Symmetrical Emerald Leaves framing the meditating figure */}
            <path
              d="M50 72C46 64 50 56 56 52C56 60 52 68 50 72Z"
              fill="#2BB673"
            />
            <path
              d="M90 72C94 64 90 56 84 52C84 60 88 68 90 72Z"
              fill="#2BB673"
            />
            {/* Small lower accent leaves */}
            <path
              d="M55 77C51 72 54 67 58 66C57 71 55 75 55 77Z"
              fill="#D9A441"
            />
            <path
              d="M85 77C89 72 86 67 82 66C83 71 85 75 85 77Z"
              fill="#D9A441"
            />

            {/* Curved Banner ribbon across center with Path to Inner Peace */}
            <path
              d="M48 83C62 81 78 81 92 83C90 87 78 88 70 88C62 88 50 87 48 83Z"
              fill="#FAF6EE"
              stroke="#D9A441"
              strokeWidth="0.8"
            />
            <text
              x="70"
              y="85.5"
              fill="#064A32"
              fontSize="4.2"
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="sans-serif"
            >
              Path to Inner Peace
            </text>
          </svg>
        </div>

        {/* Text Lockup beneath seal */}
        <div className="mt-2 leading-tight">
          <div className={`font-serif font-bold tracking-[0.18em] uppercase text-[#064A32] ${title}`}>
            PATH TO INNER PEACE
          </div>
          {showTagline && (
            <div className={`font-sans tracking-[0.24em] uppercase font-semibold text-[#075B3A] mt-0.5 ${sub}`}>
              MIND • BALANCE • TRANSFORM
            </div>
          )}
        </div>
      </div>
    );
  }

  // Standard inline version
  const sizeMap = {
    sm: { icon: 34, title: 'text-sm', sub: 'text-[9px]' },
    md: { icon: 44, title: 'text-lg', sub: 'text-[10px]' },
    lg: { icon: 60, title: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 80, title: 'text-3xl', sub: 'text-sm' },
  };

  const { icon, title, sub } = sizeMap[size];

  const titleColor =
    variant === 'light'
      ? 'text-[#F8F5EA]'
      : variant === 'gold'
      ? 'text-[#D9A441]'
      : 'text-[#075B3A]';

  const subColor =
    variant === 'light'
      ? 'text-[#D9A441]'
      : variant === 'gold'
      ? 'text-[#f5e3b8]'
      : 'text-[#064A32]/80';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Symmetrical Sacred Lotus & Meditator Emblem */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-xs"
      >
        <circle cx="50" cy="50" r="46" stroke="#D9A441" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.75" />
        <circle cx="50" cy="50" r="42" stroke="#075B3A" strokeWidth="0.8" opacity="0.5" />

        {/* Base lotus cup */}
        <path
          d="M26 65C34 72 44 75 50 75C56 75 66 72 74 65C66 69 57 71 50 71C43 71 34 69 26 65Z"
          fill="#D9A441"
        />

        {/* Left outer leaf */}
        <path
          d="M50 68C42 66 26 58 22 42C24 54 36 65 50 68Z"
          fill="url(#goldGradientLeft)"
        />

        {/* Right outer leaf */}
        <path
          d="M50 68C58 66 74 58 78 42C76 54 64 65 50 68Z"
          fill="url(#goldGradientRight)"
        />

        {/* Center-left mid leaf */}
        <path
          d="M50 69C44 64 32 50 36 32C42 45 47 58 50 69Z"
          fill="#075B3A"
        />

        {/* Center-right mid leaf */}
        <path
          d="M50 69C56 64 68 50 64 32C58 45 53 58 50 69Z"
          fill="#075B3A"
        />

        {/* Center main upright petal with inner light */}
        <path
          d="M50 18C46 30 44 48 50 68C56 48 54 30 50 18Z"
          fill="url(#emeraldGoldGradient)"
        />

        {/* Golden seed core pearl */}
        <circle cx="50" cy="52" r="3.5" fill="#F8F5EA" stroke="#D9A441" strokeWidth="1.5" />
        <circle cx="50" cy="20" r="2" fill="#D9A441" />

        <defs>
          <linearGradient id="goldGradientLeft" x1="22" y1="42" x2="50" y2="68" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ecd07a" />
            <stop offset="1" stopColor="#b88320" />
          </linearGradient>
          <linearGradient id="goldGradientRight" x1="78" y1="42" x2="50" y2="68" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ecd07a" />
            <stop offset="1" stopColor="#b88320" />
          </linearGradient>
          <linearGradient id="emeraldGoldGradient" x1="50" y1="18" x2="50" y2="68" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D9A441" />
            <stop offset="0.35" stopColor="#075B3A" />
            <stop offset="1" stopColor="#064A32" />
          </linearGradient>
        </defs>
      </svg>

      <div className="flex flex-col justify-center leading-tight">
        <span
          className={`font-serif font-bold tracking-[0.16em] uppercase ${title} ${titleColor}`}
        >
          PATH TO INNER PEACE
        </span>
        {showTagline && (
          <span
            className={`font-sans tracking-[0.22em] uppercase font-semibold ${sub} ${subColor} mt-0.5`}
          >
            MIND • BALANCE • TRANSFORM
          </span>
        )}
      </div>
    </div>
  );
};
