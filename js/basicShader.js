export const vertexShader = `
out vec4 vPos;
void main() {
    vPos = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = vPos;
}
`;

export const fragmentShader = `
in vec4 vPos;

uniform vec3 color;
uniform float minRenderDistance;
uniform float maxRenderDistance;

out vec4 fragColor;

void main() {
    float linearstep = clamp((vPos.z - minRenderDistance) / (maxRenderDistance - minRenderDistance), 0.0, 1.0);
    vec3 outColor = (1.0 - linearstep) * color;
    fragColor = vec4(outColor, 1.0);
}
`;
