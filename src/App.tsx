import './App.scss';
import { Main } from './components/main';
import { Footer } from './components/footer';
import { MysticBlur } from './components/mysticBlur';
import { Content as ScrollContent } from './components/content';

const App = () => {
  return (
    <div className="App">
      <ScrollContent>
        <Main />
      </ScrollContent>
      <MysticBlur />
      <Footer />
    </div>
  );
};

export default App;
