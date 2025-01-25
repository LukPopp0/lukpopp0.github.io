import { MeshProps } from '@react-three/fiber';
import { ReactElement, useEffect, useState } from 'react';
import { BufferGeometry } from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

const baseColor = '#949494';
const highlightColor = '#f8a0a8';

export const UrlMesh = ({
  url,
  children,
  ...props
}: { url: string; children?: ReactElement } & MeshProps) => {
  const [geometry, setGeometry] = useState<BufferGeometry | null>(null);
  const [color, setColor] = useState<string>(baseColor);

  useEffect(() => {
    const stlLoader = new STLLoader();
    stlLoader.load(
      url,
      data => setGeometry(data),
      () => {},
      error => console.error('Error loading model: ', error),
    );
  }, []);

  return (
    geometry && (
      <mesh
        geometry={geometry}
        onPointerOver={() => {
          setColor(() => highlightColor);
        }}
        onPointerOut={() => {
          setColor(() => baseColor);
        }}
        {...props}
      >
        <meshStandardMaterial color={color} />

        {children}
      </mesh>
    )
  );
};
