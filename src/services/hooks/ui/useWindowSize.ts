

import { WindowSize } from "@/services/types";
import { useState, useEffect } from 'react';

export const SCREEN_SIZES = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
}


function useWindowSize(): WindowSize {
  // render on server as lg screens
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: SCREEN_SIZES.lg,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        //
        width: window.innerWidth || SCREEN_SIZES.lg,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
