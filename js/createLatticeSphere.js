import * as THREE from "./three";

function getSpherePositions(numPoints) {
    let outPositions = [];
    const goldenRatio = (1.0 + Math.sqrt(5.0)) / 2.0;
    for (let i = 0; i < numPoints; ++i)
    {
        const theta = 2.0 * Math.PI * i / goldenRatio;
        const phi = Math.acos(1.0 - 2.0 * (i + 0.5) / numPoints);

        outPositions.push(new THREE.Vector3(
            Math.cos(theta) * Math.sin(phi),
            Math.sin(theta) * Math.sin(phi),
            -Math.cos(phi)
        ));
    }

    return outPositions;
}

export default getSpherePositions;