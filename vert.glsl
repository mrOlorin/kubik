precision lowp float;

attribute vec3 aPosition;
uniform float uTime;
varying vec3 vPosition;

void main() {
    vec3 pos = aPosition + .4 * vec3(
        cos(aPosition.y + aPosition.z + uTime),
        cos(aPosition.z + aPosition.x + uTime),
        cos(aPosition.x + aPosition.y + uTime)
    );

    gl_Position = vec4(pos, 1.0);
    gl_PointSize = 1.0;

    vPosition = aPosition;
}
