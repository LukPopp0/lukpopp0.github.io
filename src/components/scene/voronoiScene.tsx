import { useState } from 'react';
import { UrlMesh } from './voroPart';

const voroFiles = new Array(16)
  .fill('')
  .map((_, i) => new URL(`../../assets/models/voronoi-${i}.stl`, import.meta.url).href);

export const VoronoiScene = () => {
  return voroFiles.map((f, i) => <UrlMesh url={f} key={i}></UrlMesh>);
};
