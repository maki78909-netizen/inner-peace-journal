import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  showText?: boolean;
  variant?: 'light' | 'dark' | 'gold' | 'seal';
}

export const LOGO_URL = '/logo.webp';
export const LOGO_FALLBACK_URL = '/logo.png';
export const LOGO_ONLINE_URL = 'https://yourimageshare.com/ib/boNk0BKvnL.webp';

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
  showText,
  variant = 'dark',
}) => {
  const sizeMap = {
    xs: { dim: 'w-8 h-8', title: 'text-xs', sub: 'text-[8px]' },
    sm: { dim: 'w-10 h-10', title: 'text-sm', sub: 'text-[9px]' },
    md: { dim: 'w-13 h-13 sm:w-16 sm:h-16', title: 'text-base sm:text-lg', sub: 'text-[10px]' },
    lg: { dim: 'w-24 h-24 sm:w-28 sm:h-28', title: 'text-xl sm:text-2xl', sub: 'text-xs' },
    xl: { dim: 'w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48', title: 'text-2xl sm:text-3xl', sub: 'text-sm' },
  };

  const { dim, title, sub } = sizeMap[size] || sizeMap.md;

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (target.src.endsWith('.webp') && !target.src.includes('yourimageshare')) {
      target.src = LOGO_FALLBACK_URL;
    } else if (!target.src.includes('yourimageshare')) {
      target.src = LOGO_ONLINE_URL;
    }
  };

  // If variant === 'seal', render full-fledged logo with NO border
  if (variant === 'seal') {
    const sealDimensions = {
      xs: 'w-16 h-16',
      sm: 'w-20 h-20',
      md: 'w-28 h-28 sm:w-34 sm:h-34 md:w-36 md:h-36',
      lg: 'w-36 h-36 sm:w-44 sm:h-44',
      xl: 'w-44 h-44 sm:w-56 sm:h-56',
    };
    const sealDim = sealDimensions[size] || sealDimensions.md;

    return (
      <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
        {/* Full-fledged Logo image with NO border */}
        <img
          src={LOGO_URL}
          alt="Path to Inner Peace Logo"
          className={`${sealDim} object-contain transition-transform`}
          onError={handleImgError}
          loading="eager"
        />
        {showTagline && (
          <div className="font-sans tracking-[0.22em] uppercase font-semibold text-[#075B3A] text-[9.5px] sm:text-xs mt-2">
            MIND • BALANCE • TRANSFORM
          </div>
        )}
      </div>
    );
  }

  // Standard inline version with optional text
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

  const shouldRenderText = showText ?? (size === 'lg' || size === 'xl');

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Full-fledged Logo image with NO border */}
      <img
        src={LOGO_URL}
        alt="Path to Inner Peace Logo"
        className={`${dim} object-contain shrink-0`}
        onError={handleImgError}
        loading="eager"
      />

      {shouldRenderText && (
        <div className="flex flex-col justify-center leading-tight">
          <span className={`font-serif font-bold tracking-[0.16em] uppercase ${title} ${titleColor}`}>
            PATH TO INNER PEACE
          </span>
          {showTagline && (
            <span className={`font-sans tracking-[0.22em] uppercase font-semibold ${sub} ${subColor} mt-0.5`}>
              MIND • BALANCE • TRANSFORM
            </span>
          )}
        </div>
      )}
    </div>
  );
};
