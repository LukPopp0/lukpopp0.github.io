export const Lighting = () => {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight intensity={0.8} position={[2.5, 0, 1.5]} />
      <pointLight intensity={0.45} position={[0, 0, 0]} />
      {/* <directionalLight intensity={0.15} position={[0, 1.5, -1.5]} />
      <directionalLight intensity={0.15} position={[0, -1.5, -1.5]} /> */}
    </>
  );
};
