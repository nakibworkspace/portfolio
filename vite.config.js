// This file configures Vite (the build tool).
// You normally don't need to change anything here.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});