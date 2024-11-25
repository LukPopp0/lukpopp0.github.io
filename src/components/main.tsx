import { Intro } from './pageParts/intro';
import { Socials } from './pageParts/socials';
import './main.scss';

export const Main = () => {
  return (
    <div className="main-container">
      <div className="main">
        <div className="page-part intro-cntnr">
          <Intro />
        </div>
        {/* <div className="page-part cards-cntnr"></div> */}
        <div className="page-part creativity-cntnr" />
        {/* <div className="page-part projects-cntnr"></div> */}
        <div className="page-part socials-cntnr">
          <Socials />
        </div>
      </div>
    </div>
  );
};
