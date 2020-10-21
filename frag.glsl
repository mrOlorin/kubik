precision lowp float;

uniform float uTime;
varying vec3 vPosition;

void main() {
    float frequency = 10.;
    float r = length(vPosition);
    float c = 1.;
    float waveNumber = frequency / c;
    float wave = sin(waveNumber * r - frequency * uTime) / r;
    gl_FragColor = vec4(vec3(wave), 1.);
}
