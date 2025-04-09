import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true, // Optionally, open the browser automatically
    host: true, // This will allow other devices on your network to access your app using your local IP address
  },
});
