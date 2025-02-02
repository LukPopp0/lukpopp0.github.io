import type { MeshProps } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { BufferGeometry } from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

export const UrlMesh = ({ url, children, ...props }: { url: string } & MeshProps) => {
  const [geometry, setGeometry] = useState<BufferGeometry | undefined>(undefined);

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
      <mesh geometry={geometry} {...props}>
        {children}
      </mesh>
    )
  );
};
