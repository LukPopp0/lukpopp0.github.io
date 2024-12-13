import './intro.scss';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export const Intro = () => {
  const intro = useRef<HTMLDivElement>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (!intro.current) return;
    // intro.current.style.scale = `max(0.1, calc(1 - ${scroll.offset * scroll.pages}))`;
    // intro.current.style.filter = `blur(calc(10px * ${scroll.offset * scroll.pages}))`;
    // Skip perspective transformation for now
    // intro.current.style.transform = `perspective(400px) rotate3d(1, 0, 0, clamp(-25deg, calc(${scroll.__damp.velocity_delta} * 360deg), 25deg))`;
  });

  return (
    <>
      <div ref={intro} className="intro">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1>My name is Lukas Popp</h1>
          <h2>Welcome to my portfolio!</h2>
        </div>
      </div>
    </>
  );
};
