import './App.scss';
import { Main } from './components/main';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { MysticBlur } from './components/mysticBlur';
import { ScrollHandler } from './components/scrollHandler';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
      <MysticBlur />
      <ScrollHandler />
    </div>
  );
};

export default App;
