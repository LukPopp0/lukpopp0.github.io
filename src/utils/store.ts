import { create } from 'zustand';

type StoreState = {
  debug: boolean;
  targetPageNr: number;
  setTargetPageNr: (targetPageNr: number) => void;
  rotateCube: boolean;
  setRotateCube: (rotateCube: boolean) => void;
  showBloom: boolean;
  setShowBloom: (showBloom: boolean) => void;
};

// Get Node environment
const isDev = process.env.NODE_ENV === 'development';

export const useMainStore = create<StoreState>(set => ({
  debug: isDev,
  targetPageNr: 0,
  setTargetPageNr: (targetPageNr: number) => set({ targetPageNr }),
  rotateCube: true,
  setRotateCube: (rotateCube: boolean) => set({ rotateCube }),
  showBloom: true,
  setShowBloom: (showBloom: boolean) => set({ showBloom }),
}));
