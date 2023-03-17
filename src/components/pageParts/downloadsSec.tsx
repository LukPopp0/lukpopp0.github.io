import { MagicButton } from '../magicButton';
import './downloadsSec.scss';
import cvPath from '../../assets/CV Lukas Popp 2023-03.pdf';

export const DownloadsSec = () => {
  return (
    <div className="downloads-section">
      <MagicButton href={cvPath}>
        <div>Download CV</div>
      </MagicButton>
    </div>
  );
};
