import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/stl-viewer.js',
  output: {
    file: 'assets/js/min.bundle.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    resolve({
      browser: true,  // Ensure it resolves browser-compatible versions
      dedupe: ['lit', 'three'],  // Prevent multiple instances of these dependencies
    }),
    commonjs(),
    terser(),
  ],
  external: (id) => /three\/examples\/jsm/.test(id) ? false : null,  // Include three/examples/jsm as internal
};

