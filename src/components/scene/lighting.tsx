export const Lighting = () => {
  return (
    <group name="lighting">
      <ambientLight intensity={0.4} />
      <directionalLight intensity={0.2} position={[1, 1.2, 1]} />
      <directionalLight intensity={0.2} position={[-1, 1.2, 1]} />
      <directionalLight intensity={0.2} position={[0, -1.2, -1]} />
    </group>
  );
};
