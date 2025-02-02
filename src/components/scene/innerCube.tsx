import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Color, MeshStandardMaterial, PointLight } from 'three';

type InnerCubeProps = {
  size?: number;
};

let hue = 0.0;

export const InnerCube = ({ size = 10 }: InnerCubeProps) => {
  const mat = useRef<MeshStandardMaterial>(null);
  const pointLight = useRef<PointLight>(null);
  const innerCubeSize = 1;

  useFrame((_, delta) => {
    if (!mat.current) return;
    const prevColor = mat.current.emissive.getHSL({ h: 0, s: 0, l: 0 });
    hue += delta / 20;
    mat.current.emissive.setHSL(hue, prevColor.s, prevColor.l);

    if (!pointLight.current) return;
    pointLight.current.color.setHSL(hue, prevColor.s, prevColor.l);
  });

  return (
    <>
      <mesh name="innerCube">
        <boxGeometry args={[size * innerCubeSize, size * innerCubeSize, size * innerCubeSize]} />
        <meshStandardMaterial ref={mat} color={new Color(1.0, 1.0, 1.0)} emissive={new Color(1.0, 0.1, 0.1)} />
      </mesh>
      <pointLight name="innerCubeLight" ref={pointLight} intensity={100} />
    </>
  );
};
