import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/types/index.ts',
    'src/schemas/index.ts',
    'src/utils/index.ts',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  minify: false,
  target: 'es2022',
  platform: 'neutral',
  tsconfig: './tsconfig.json',
  outDir: 'dist',
  external: ['zod'],
});
