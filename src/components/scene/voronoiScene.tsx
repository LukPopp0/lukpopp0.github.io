import { useFrame, useThree } from '@react-three/fiber';
import { InnerCube } from './innerCube';
import { VoroPart } from './voroPart';
import { Selection } from '@react-three/postprocessing';
import { useTheme } from '../../utils';
import partPositions from '../../assets/models/cellPositions.json' with { type: 'json' };
import { useCallback, useRef, useState } from 'react';
import { Group, Mesh, MeshStandardMaterial, Vector3 } from 'three';

const voroFiles = new Array(14)
  .fill('')
  .map((_, i) => new URL(`../../assets/models/voronoi-${i}.stl`, import.meta.url).href);

export const VoronoiScene = () => {
  const { raycaster, pointer, camera } = useThree();
  const voroGroup = useRef<Group>(null);

  const theme = useTheme();
  const mainColor = theme.mainColorInverse;
  const highlightColor = theme.mainColorInverseAlt;

  const [voroActive, setVoroActive] = useState<boolean[]>(new Array(14).fill(false));
  const [hovering, setHovering] = useState<boolean>(false);

  const colorPart = useCallback((part: Mesh, color: string) => {
    if (!part || !part.isMesh) return;
    const mat = part.material as MeshStandardMaterial | MeshStandardMaterial[];
    if (Array.isArray(mat)) mat.forEach(m => m.color.set(color));
    else mat.color.set(color);
  }, []);

  // Highlight hovered part and reset color of other parts
  useFrame(() => {
    if (!voroGroup.current) return;

    raycaster.setFromCamera(pointer, camera);
    const intersections = raycaster.intersectObject(voroGroup.current, true);

    const resetColors = () => {
      voroGroup.current?.children.forEach(g => colorPart(g.children[0] as Mesh, mainColor));
    };

    if (intersections.length > 0) {
      // resetColors();
      // colorPart(intersections[0].object as Mesh, highlightColor);

      const partNr = Number(intersections[0].object.parent?.userData.partNr);
      setVoroActive(prev => prev.map((_, i) => (i === partNr ? true : false)));
      setHovering(true);
    } else {
      if (hovering) {
        resetColors();
        setVoroActive(new Array(14).fill(false));
        setHovering(false);
      }
    }
  });

  return (
    <>
      <Selection>
        <group ref={voroGroup}>
          <InnerCube size={12.5} />
          {voroFiles.map((f, i) => (
            <VoroPart
              url={f}
              active={voroActive[i]}
              inView={true}
              key={i}
              userData={{ partNr: i }}
              position={new Vector3(partPositions[i][0], partPositions[i][1], partPositions[i][2])}
            >
              <meshStandardMaterial color={theme.mainColorInverse} />
            </VoroPart>
          ))}
        </group>
      </Selection>
    </>
  );
};
