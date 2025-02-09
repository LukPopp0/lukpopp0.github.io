import { useFrame, useThree } from '@react-three/fiber';
import { VoroPart } from './voroPart';
import { useTheme } from '../../utils';
import partPositions from '../../assets/models/cellPositions.json' with { type: 'json' };
import { useCallback, useRef, useState } from 'react';
import { Group, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { useMainStore } from '../../utils/store';

const voroFiles = new Array(14)
  .fill('')
  .map((_, i) => new URL(`../../assets/models/voronoi-${i}.stl`, import.meta.url).href);

export const VoronoiScene = () => {
  const { raycaster, pointer, camera } = useThree();
  const targetPageNr = useMainStore(s => s.targetPageNr);
  const setRotateCube = useMainStore(s => s.setRotateCube);
  const voroGroup = useRef<Group>(null);

  const theme = useTheme();
  const mainColor = theme.mainColorInverse;
  // const highlightColor = theme.mainColorInverseAlt;

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
      // Disable cube rotation
      setRotateCube(false);

      // resetColors();
      // colorPart(intersections[0].object as Mesh, highlightColor);

      const partNr = Number(intersections[0].object.parent?.userData.partNr);
      setVoroActive(prev => prev.map((_, i) => (i === partNr ? true : false)));
      setHovering(true);
    } else {
      // Enable cube rotation again
      setRotateCube(true);

      if (hovering) {
        // resetColors();
        setVoroActive(new Array(14).fill(false));
        setHovering(false);
      }
    }
  }, -1);

  // useEffect(() => {
  //   // TODO: Find a better way to get the element
  //   // TODO: Determine a better threshold?
  //   const mainElement = document.getElementsByClassName('main')[0];
  //   const updateInView = () => {
  //     if (mainElement.scrollTop < window.innerHeight * 0.8 || mainElement.scrollTop > window.innerHeight * 1.4) {
  //       setInView(false);
  //     } else setInView(true);
  //   };
  //   mainElement.addEventListener('scroll', updateInView);
  //   return () => mainElement.removeEventListener('scroll', updateInView);
  // }, []);

  return (
    <group ref={voroGroup}>
      {voroFiles.map((f, i) => (
        <VoroPart
          url={f}
          active={voroActive[i]}
          inView={targetPageNr === 1}
          key={i}
          userData={{ partNr: i }}
          position={new Vector3(partPositions[i][0], partPositions[i][1], partPositions[i][2])}
        >
          <meshStandardMaterial color={'#ffffff'} />
        </VoroPart>
      ))}
    </group>
  );
};
