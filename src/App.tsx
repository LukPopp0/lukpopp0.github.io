import './App.scss';
import { Main } from './components/main';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { MysticBlur } from './components/mysticBlur';
import { useEffect } from 'react';

const App = () => {
  // Store scroll progress in the style property of the App element
  useEffect(() => {
    const root = document.getElementById('root');
    window.onscroll = () => {
      if (!root) return;
      root.style.setProperty(
        '--scroll-percentage',
        (window.scrollY / (document.body.offsetHeight - window.innerHeight)).toString()
      );
      root.style.setProperty(
        '--scroll',
        (window.scrollY / document.documentElement.clientHeight).toString()
      );
    };

    return () => {
      window.onscroll = null;
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
      <MysticBlur />
    </div>
  );
};

export default App;
