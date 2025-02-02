import { MysticBlur } from '../mysticBlur';

export const Intro = () => {
  return (
    <>
      <div className="intro" style={{ alignContent: 'center', justifyItems: 'center' }}>
        <div>
          <h1
            style={{
              letterSpacing: '2.5rem',
              wordSpacing: '1rem',
              fontFamily: 'Lato, Inter, Avenir, Helvetica, Arial',
              fontWeight: 500,
              fontSize: 'min(6rem, 20vw)',
              marginTop: 0,
              marginBottom: '2.5rem',
              marginRight: '-2.5rem', // same as letter spacing
            }}
          >
            Lukas Popp
          </h1>
          <h2
            style={{
              letterSpacing: '0.8rem',
              wordSpacing: '0.8rem',
              fontFamily: 'Lato, Inter, Avenir, Helvetica, Arial',
              fontWeight: 'lighter',
              fontSize: 'min(2rem, 7vw)',
              margin: 0,
              marginRight: '-0.8rem', // same as letter spacing
            }}
          >
            Graphics Software Engineer
          </h2>
        </div>
      </div>
      <MysticBlur />
    </>
  );
};
