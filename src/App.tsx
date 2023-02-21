import './App.scss';
import { Main } from './components/main';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { MysticBlur } from './components/mysticBlur';

const App = () => {
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
