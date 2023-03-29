import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://pixel1401.github.io/MERN-learn',
  plugins: [react()],
  resolve : {
    alias : {
      "@" : path.resolve(__dirname , "./src/"),
    }
  }
})
