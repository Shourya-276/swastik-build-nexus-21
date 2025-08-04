import { useEffect, useRef, useState } from 'react';

interface StackedCard {
  id: string;
  content: React.ReactNode;
}

interface UseStackedCardsProps {
  cards: StackedCard[];
  cardHeight?: number;
}

export const useStackedCards = ({ cards, cardHeight = 600 }: UseStackedCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerTop = rect.top;
      const containerHeight = rect.height;
      
      // Calculate when the container enters and exits the viewport
      const startOffset = windowHeight * 0.5;
      const endOffset = windowHeight * 0.3;
      
      if (containerTop > startOffset) {
        // Container hasn't entered the active zone yet
        setActiveIndex(0);
        setScrollProgress(0);
        return;
      }
      
      if (containerTop < -containerHeight + endOffset) {
        // Container has completely passed through
        setActiveIndex(cards.length - 1);
        setScrollProgress(1);
        return;
      }
      
      // Calculate progress through the container
      const scrollableDistance = containerHeight + startOffset - endOffset;
      const scrolled = startOffset - containerTop;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      
      // Determine active card based on progress
      const cardProgress = progress * (cards.length - 1);
      const newActiveIndex = Math.floor(cardProgress);
      const cardTransitionProgress = cardProgress - newActiveIndex;
      
      setActiveIndex(newActiveIndex);
      setScrollProgress(cardTransitionProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [cards.length]);

  const getCardStyle = (index: number) => {
    const isActive = index === activeIndex;
    const isNext = index === activeIndex + 1;
    const isPrevious = index < activeIndex;
    
    let transform = '';
    let opacity = 1;
    let zIndex = cards.length - index; // Higher index = lower z-index
    
    if (isPrevious) {
      // Cards that have already been passed
      transform = 'translateY(-100vh) scale(0.95)';
      opacity = 0;
      zIndex = cards.length + index; // Keep them on top but invisible
    } else if (isActive) {
      // Currently active card
      const translateY = scrollProgress * -100;
      const scale = 1 - (scrollProgress * 0.05);
      transform = `translateY(${translateY}vh) scale(${scale})`;
      opacity = 1 - (scrollProgress * 0.3);
      zIndex = cards.length - index + 10; // Highest z-index for active card
    } else if (isNext) {
      // Next card sliding up from behind
      const translateY = 20 - (scrollProgress * 20); // Start slightly below, move to 0
      const scale = 0.95 + (scrollProgress * 0.05);
      transform = `translateY(${translateY}px) scale(${scale})`;
      opacity = 0.7 + (scrollProgress * 0.3);
      zIndex = cards.length - index - 1; // Behind the active card
    } else {
      // Future cards - stack behind
      const stackOffset = (index - activeIndex) * 10;
      transform = `translateY(${stackOffset}px) scale(0.95)`;
      opacity = 0.6;
      zIndex = cards.length - index - 2; // Further behind
    }
    
    return {
      transform,
      opacity,
      zIndex,
      transition: 'none', // We handle transitions with scroll
    };
  };

  return {
    containerRef,
    activeIndex,
    scrollProgress,
    getCardStyle,
  };
};