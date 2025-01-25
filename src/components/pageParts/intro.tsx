import { MysticBlur } from '../mysticBlur';

export const Intro = () => {
  return (
    <>
      <div className="intro" style={{ alignContent: 'center', justifyItems: 'center' }}>
        <div>
          <h1
            style={{
              letterSpacing: '2rem',
              textIndent: '2rem',
              wordSpacing: '1rem',
              fontFamily: 'Lato, Inter, Avenir, Helvetica, Arial',
              fontWeight: 500,
              fontSize: '5.25rem',
              marginTop: 0,
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
              fontSize: '2rem',
              margin: 0,
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
