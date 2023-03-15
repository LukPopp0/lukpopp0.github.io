import { useEffect, useRef } from 'react';
import './mysticBlur.scss';

export const MysticBlur = () => {
  const mysticBlobContainer = useRef<HTMLDivElement>(null);
  const mysticBlob = useRef<HTMLDivElement>(null);

  // Add event listener to follow the cursor
  useEffect(() => {
    if (!mysticBlobContainer.current) return;
    let anim: Animation | undefined = undefined;

    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    document.body.onpointermove = (ev: PointerEvent) => {
      if (!mysticBlobContainer.current) return;

      // Specifically tell the animation on Safari to commit the end styling state
      if (isSafari && anim) anim.commitStyles();

      const { clientX, clientY } = ev;
      anim = mysticBlobContainer.current.animate(
        { left: `${clientX}px`, top: `${clientY}px` },
        { duration: 2000, fill: 'forwards' }
      );
    };

    return () => {
      document.body.onpointermove = null;
    };
  }, []);

  // Add border radius animation
  useEffect(() => {
    if (!mysticBlob.current) return;

    const animationDurationInMs = 2000;
    mysticBlob.current.style.transition = `border-radius ${animationDurationInMs}ms cubic-bezier(0.455, 0.03, 0.515, 0.955)`;

    const min = 20,
      max = 50;
    const interval = setInterval(() => {
      if (!mysticBlob.current) return;

      const tl = Math.floor(Math.random() * (max - min) + min);
      const tr = Math.floor(Math.random() * (max - min) + min);
      const br = Math.floor(Math.random() * (max - min) + min);
      const bl = Math.floor(Math.random() * (max - min) + min);
      const borderRadius = `${tl}% ${tr}% ${br}% ${bl}%`;
      mysticBlob.current.style.borderRadius = borderRadius;
    }, animationDurationInMs);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="mystic-blur">
      <div id="mystic-blob-container" ref={mysticBlobContainer}>
        <div id="mystic-blob" ref={mysticBlob} />
      </div>
      <div id="blur-element" />
    </div>
  );
};
