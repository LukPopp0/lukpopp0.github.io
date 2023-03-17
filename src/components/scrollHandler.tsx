import { useCallback, useEffect, useRef } from 'react';

let prevScrollTime = 0;
let prevScroll = 0;
let velocityReset: number | null = null;
export const ScrollHandler = () => {
  const root = useRef(document.getElementById('root'));
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const handleScroll = useCallback(() => {
    if (!root.current) return;
    const newScroll = window.scrollY / document.documentElement.clientHeight;
    const newScrollTime = new Date().getTime();
    let scrollVelocity = (1000 * (newScroll - prevScroll)) / (newScrollTime - prevScrollTime);

    // Unfortunately the 3d effect for the velocity causes clipping, so:
    if (isSafari) scrollVelocity = 0;

    prevScrollTime = newScrollTime;
    prevScroll = newScroll;

    root.current.style.setProperty(
      '--scroll-percentage',
      (window.scrollY / (document.body.offsetHeight - window.innerHeight)).toString()
    );
    root.current.style.setProperty('--scroll', newScroll.toString());
    root.current.style.setProperty('--scroll-velocity', scrollVelocity.toString());

    if (velocityReset) clearTimeout(velocityReset);
    velocityReset = setTimeout(() => {
      root.current?.style.setProperty('--scroll-velocity', '0');
    }, 100);
  }, []);

  // Store scroll progress in the style property of the App element
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  return <></>;
};
