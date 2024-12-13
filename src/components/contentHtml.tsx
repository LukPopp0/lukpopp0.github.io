import './contentHtml.scss';
import { Intro } from './pageParts/intro';
import { Socials } from './pageParts/socials';

export const ContentHtml = () => {
  return (
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
  );
};
