import { isMobile } from 'react-device-detect';

export const Footer = () => {
  return (
    <footer
      style={{
        position: 'absolute',
        width: '100%',
        bottom: isMobile ? '2em' : '0',
        left: '0',
        fontSize: '10pt',
        height: '4em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>Lukas Popp - Graphics Software Engineer</div>
    </footer>
  );
};
