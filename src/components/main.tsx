import './main.scss';
import { Intro } from './pageParts/intro';
import { Socials } from './pageParts/socials';

export const Main = () => {
  return (
    <div className="main">
      <div className="page-part intro">
        <Intro />
      </div>
      {/* <div className="page-part cards"></div> */}
      {/* <div className="page-part creative-coding"></div> */}
      {/* <div className="page-part projects"></div> */}
      {/* <div className="page-part downloads"></div> */}
      <div className="page-part socials">
        <Socials />
      </div>
    </div>
  );
};
