export const vertexShader = `
in vec2 textureCoord;
out vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const fragmentShader = `
#include <packing>

in vec2 vUv;
uniform sampler2D tDepth;
uniform sampler2D tColor;
uniform float minRenderDistance;
uniform float maxRenderDistance;

out vec4 fragColor;
float readDepth( sampler2D depthSampler, vec2 coord ) {
    float fragCoordZ = texture2D( depthSampler, coord ).x;
    float viewZ = perspectiveDepthToViewZ( fragCoordZ, minRenderDistance, maxRenderDistance );
    return viewZToOrthographicDepth( viewZ, minRenderDistance, maxRenderDistance );
}
void main() {
    vec3 diffuse = texture2D(tColor, vUv).rgb;
    float depth = readDepth( tDepth, vUv );

    // fragColor.rgb = vec3(1.0 - depth);
    fragColor.rgb = diffuse;
    fragColor.a = 1.0;
}
`;
