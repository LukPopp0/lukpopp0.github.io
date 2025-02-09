import './App.scss';
import { Footer } from './components/footer';
import { ThemeProvider } from './utils';
import { Intro } from './components/pageParts/intro';
import { ProjectsPage } from './components/pageParts/projectsPage';
import { Socials } from './components/pageParts/socials';
import { HTMLAttributes, ReactElement, useEffect, useRef, useState } from 'react';
import { PageScroller } from './components/pageParts/pageScroller';

const PagePart = ({ children, ...props }: { children: ReactElement } & HTMLAttributes<HTMLDivElement>) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateInnerHeight = () => {
      setInnerHeight(window.innerHeight);
    };

    window.addEventListener('resize', updateInnerHeight);
    return () => {
      window.removeEventListener('resize', updateInnerHeight);
    };
  }, []);

  return (
    <div {...props} style={{ height: innerHeight, ...props.style }} className={`page-part ${props.className}`}>
      {children}
    </div>
  );
};

export const App = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  return (
    <div className="App">
      <ThemeProvider>
        <div ref={mainRef} className="main">
          <PageScroller scrollRef={mainRef}>
            <PagePart className="intro-cntnr">
              <Intro />
            </PagePart>
            <PagePart className="projects-cntnr">
              <ProjectsPage />
            </PagePart>
            <PagePart className="socials-cntnr">
              <>
                <Socials />
                <Footer />
              </>
            </PagePart>
          </PageScroller>
        </div>
      </ThemeProvider>
    </div>
  );
};
