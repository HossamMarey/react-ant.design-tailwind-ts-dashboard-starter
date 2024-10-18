import { useState, useEffect } from 'react';

const useScroll = () => {
  const [isTop, setIsTop] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = () => {
    const main = document.querySelector('main');
    const currentPosition = main?.scrollTop || 0;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    setScrollPosition(currentPosition);
    setIsTop(currentPosition === 0);
    setIsBottom(currentPosition >= maxScroll);
  };

  const scrollToTop = () => {
    const main = document.querySelector('main');
    main?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    const main = document.querySelector('main');
    main?.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    const main = document.querySelector('main');

    main?.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      main?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { isTop, scrollPosition, isBottom, scrollToTop, scrollToBottom };
};

export default useScroll;
