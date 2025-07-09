import { useEffect, useState } from 'react';

type ScreenSize = 'sm' | 'md' | 'lg';

const SCREEN_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
} as const;

function getSize(width: number): ScreenSize {
  if (width < 640) return SCREEN_SIZES.SMALL;
  if (width < 1024) return SCREEN_SIZES.MEDIUM;
  return SCREEN_SIZES.LARGE;
}

export function useScreenSize(): ScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>(getSize(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getSize(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
}
