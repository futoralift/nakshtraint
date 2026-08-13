import { defineConfig } from "nitro/config";

export default defineConfig({
  preset: "vercel",
  publicAssets: [
    {
      dir: "dist/client",
      maxAge: 3600,
    },
  ],
  handlers: [
    {
      route: "/**",
      handler: "./dist/server/server.js",
    },
  ],
});
