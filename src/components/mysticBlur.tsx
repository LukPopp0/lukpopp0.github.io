import { useEffect, useRef } from 'react';
import './mysticBlur.scss';

export const MysticBlur = () => {
  const mysticBlobContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mysticBlobContainer.current) return;
    document.body.onpointermove = ev => {
      if (!mysticBlobContainer.current) return;
      const { clientX, clientY } = ev;
      mysticBlobContainer.current.animate(
        { left: `${clientX}px`, top: `${clientY}px` },
        { duration: 2000, fill: 'forwards' }
      );
    };
  }, []);

  return (
    <div id="mystic-blur">
      <div id="mystic-blob-container" ref={mysticBlobContainer}>
        <div id="mystic-blob" />
      </div>
      <div id="mystic-blur" />
    </div>
  );
};
