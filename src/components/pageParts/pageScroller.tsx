import { ReactNode, RefObject, useEffect, useState } from 'react';
import { useMainStore } from '../../utils/store';
import DownArrow from '../../assets/images/arrow-down.svg?react';
import './pageScroller.scss';
import { isMobile } from 'react-device-detect';

let prevTouch: [number, number] | undefined;
// Debounce time based on personal preference
const wheelDebounceTimeoutTime = 1400;
let wheelDebounceTimeout: NodeJS.Timeout | undefined = undefined;
let lastWheelEvent = Number.MAX_VALUE;
let lastWheelDelta = 0;

// Threshold for a scroll delta after which it counts as a touch scroll
const touchScrollThreshold = 30;

const resetWheelDebounceTimeout = () => {
  if (wheelDebounceTimeout) clearTimeout(wheelDebounceTimeout);
  wheelDebounceTimeout = undefined;
};

const getCurrentPage = (epsilon = 0.1) => {
  return Math.round(window.scrollY / window.innerHeight + epsilon);
};

export const PageScroller = ({ scrollRef, children }: { scrollRef: RefObject<HTMLElement>; children: ReactNode }) => {
  const targetPageNr = useMainStore(s => s.targetPageNr);
  const setTargetPageNr = useMainStore(s => s.setTargetPageNr);
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    if (!scrollRef.current) return;
    setMaxPage(Math.round(scrollRef.current.getBoundingClientRect().height / window.innerHeight) - 1);
  }, [scrollRef]);

  // One page scroll effect
  useEffect(() => {
    const updateTargetPage = (scrollDown: boolean) => {
      if (!scrollRef.current) return;

      const currentPage = getCurrentPage();
      if (scrollDown) {
        setTargetPageNr(Math.min(maxPage, currentPage + 1));
      } else {
        setTargetPageNr(Math.max(0, currentPage - 1));
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Don't bother when scrolling only sideways
      if (e.deltaY === 0) return;

      // In general: Debounce wheel events for a certain amount of time to avoid scrolling multiple pages at once.
      // Reset wheel debounce timeout if:
      // - sign of lastWheelDelta changes (scrolling into the other direction)
      // - the last wheel event was more than 100ms ago

      if (Math.sign(lastWheelDelta) !== Math.sign(e.deltaY)) resetWheelDebounceTimeout();
      lastWheelDelta = e.deltaY;

      if (e.timeStamp - lastWheelEvent > 100) resetWheelDebounceTimeout();
      lastWheelEvent = e.timeStamp;

      if (wheelDebounceTimeout) return;
      wheelDebounceTimeout = setTimeout(() => {
        resetWheelDebounceTimeout();
      }, wheelDebounceTimeoutTime);

      updateTargetPage(e.deltaY > 0);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (e.key === 'ArrowUp') updateTargetPage(false);
        else updateTargetPage(true);
      }
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 1) return;
      e.preventDefault();

      const touch = e.touches[0];
      if (!prevTouch) prevTouch = [touch.clientX, touch.clientY];

      const delta = [touch.clientX - prevTouch[0], touch.clientY - prevTouch[1]];
      prevTouch = [touch.clientX, touch.clientY];

      // Delta by which it counts as a touch scroll
      if (Math.abs(delta[1]) > touchScrollThreshold) {
        updateTargetPage(delta[1] < 0);
      }
    };
    const endTouch = () => {
      prevTouch = undefined;
    };

    const handleResize = () => {
      if (!scrollRef.current) return;
      const target = Math.round(window.scrollY / window.innerHeight);
      scrollRef.current.children[target].scrollIntoView({ block: 'start', behavior: 'instant' });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKey, { passive: false });
    window.addEventListener('touchmove', handleTouch, { passive: false });
    window.addEventListener('touchend', endTouch);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('touchend', endTouch);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollRef, setTargetPageNr, maxPage]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.children[targetPageNr].scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [targetPageNr, scrollRef]);

  const onButtonDown = () => {
    if (!scrollRef.current) return;

    if (targetPageNr === maxPage) setTargetPageNr(0);
    else setTargetPageNr(targetPageNr + 1);
  };

  return (
    <>
      {children}
      <div
        style={{ position: 'fixed', bottom: isMobile ? '5rem' : '3rem', left: '50%', transform: 'translateX(-50%)' }}
      >
        <button className={`scroll-btn ${targetPageNr < maxPage ? 'scroll-down' : 'scroll-up'}`} onClick={onButtonDown}>
          <DownArrow />
        </button>
      </div>
    </>
  );
};
