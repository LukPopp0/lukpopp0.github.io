import './App.scss';
import { Footer } from './components/footer';
import { ThemeProvider } from './utils';
import { Intro } from './components/pageParts/intro';
import { ProjectsPage } from './components/pageParts/projectsPage';
import { Socials } from './components/pageParts/socials';
import { HTMLAttributes, ReactElement } from 'react';

const PagePart = ({
  children,
  ...props
}: { children: ReactElement } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={`page-part ${props.className}`}>
      {children}
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <ThemeProvider>
        <div className="main">
          <PagePart className="intro-cntnr">
            <Intro />
          </PagePart>
          <PagePart className="projects-cntnr">
            <ProjectsPage />
          </PagePart>
          <PagePart className="socials-cntnr">
            <Socials />
          </PagePart>
        </div>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default App;
