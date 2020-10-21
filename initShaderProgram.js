class ShaderProgramError extends Error {
    constructor(message, meta) {
        super(message);
        this.name = 'ShaderProgramError';
        this.meta = meta;
    }
}

const loadShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = new ShaderProgramError('An error occurred compiling the shaders', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        throw error;
    }
    return shader;
};

export default (gl, vertexShaderSource, fragmentShaderSource) => {
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource));
    gl.attachShader(shaderProgram, loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource));
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        const error = new ShaderProgramError('Unable to initialize the shader program', gl.getProgramInfoLog(shaderProgram));
        gl.deleteProgram(shaderProgram);
        throw error;
    }
    gl.useProgram(shaderProgram);
    return shaderProgram;
};
