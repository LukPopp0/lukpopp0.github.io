import { GroupProps } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import { useRef, useState } from 'react';
import { Group, Vector3 } from 'three';
import { UrlMesh } from './urlMesh';

const activeScale = 1.25;
const inactiveScale = 1.06;

export const VoroPart = ({
  url,
  active,
  inView,
  position: initPosition,
  children,
  ...props
}: { url: string; active: boolean; inView: boolean } & GroupProps) => {
  const group = useRef<Group>(null);
  const [clicked, setClicked] = useState(false);
  const positionClone: Vector3 = typeof initPosition === 'object' ? (initPosition as Vector3).clone() : new Vector3();
  const { position } = useSpring<{ position: [number, number, number] }>({
    position: !inView
      ? [positionClone.x, positionClone.y, positionClone.z]
      : active
        ? [positionClone.x * activeScale, positionClone.y * activeScale, positionClone.z * activeScale]
        : [positionClone.x * inactiveScale, positionClone.y * inactiveScale, positionClone.z * inactiveScale],
    config: {
      tension: 200,
      friction: 12,
      mass: 1,
    },
  });

  return (
    <animated.group ref={group} position={position} {...props} onClick={() => setClicked(!clicked)}>
      <UrlMesh url={url} userData={{ type: 'voro-part', url }}>
        {children}
      </UrlMesh>
    </animated.group>
  );
};
