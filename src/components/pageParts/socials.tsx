import { MagicButton } from '../magicButton';
import './socials.scss';
import emailLogo from '../../assets/images/email-white.svg';
import githubLogo from '../../assets/images/github-white.svg';
import linkedinLogo from '../../assets/images/linkedin-white.svg';

export const Socials = () => {
  return (
    <div className="socials-group">
      <div className="scl-icon-container">
        <MagicButton className="social-button email" href="mailto:main@lukpopp.com">
          <img src={emailLogo} className="logo email" alt="Email logo" />
        </MagicButton>
      </div>
      <div className="scl-icon-container">
        <MagicButton className="social-button github" href="https://github.com/LukPopp0">
          <img src={githubLogo} className="logo github" alt="Github logo" />
        </MagicButton>
      </div>
      <div className="scl-icon-container">
        <MagicButton
          className="social-button linkedin"
          href="https://www.linkedin.com/in/luk-popp/"
        >
          <img src={linkedinLogo} className="logo linkedin" alt="LinkedIn logo" />
        </MagicButton>
      </div>
    </div>
  );
};
