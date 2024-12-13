import './App.scss';
import { Footer } from './components/footer';
import { MysticBlur } from './components/mysticBlur';
import { Content3d } from './components/content3d';
import { Canvas } from '@react-three/fiber';
import { Lighting } from './components/scene/lighting';
import { PerspectiveCamera, Scroll, ScrollControls } from '@react-three/drei';
import { NoToneMapping } from 'three';
import { ContentHtml } from './components/contentHtml';
import { ThemeProvider } from './utils';

const App = () => {
  return (
    <div className="App">
      <ThemeProvider>
        <div className="main-container">
          <Canvas frameloop="demand" gl={{ antialias: true, toneMapping: NoToneMapping }}>
            <Lighting />
            <PerspectiveCamera makeDefault position={[0, 0, 20]} />
            <ScrollControls pages={2.6}>
              <Scroll html style={{ width: '100%' }}>
                <ContentHtml />
              </Scroll>
              <Scroll>
                <Content3d />
              </Scroll>
            </ScrollControls>
          </Canvas>
        </div>
        <MysticBlur />
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default App;
