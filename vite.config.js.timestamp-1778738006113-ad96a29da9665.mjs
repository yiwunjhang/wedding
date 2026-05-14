// vite.config.js
import { defineConfig } from "file:///D:/Azure%20DevOps/wedding/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Azure%20DevOps/wedding/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { fileURLToPath, URL } from "node:url";
import viteImagemin from "file:///D:/Azure%20DevOps/wedding/node_modules/vite-plugin-imagemin/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/Azure%20DevOps/wedding/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    viteImagemin({
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.7, 0.9], speed: 4 },
      webp: { quality: 80 }
    })
  ],
  base: process.env.VITE_BASE || "/",
  assetsInclude: ["**/*.JPG", "**/*.PNG", "**/*.JPEG", "**/*.WEBP"],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxBenVyZSBEZXZPcHNcXFxcd2VkZGluZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcQXp1cmUgRGV2T3BzXFxcXHdlZGRpbmdcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0F6dXJlJTIwRGV2T3BzL3dlZGRpbmcvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB2aXRlSW1hZ2VtaW4gZnJvbSAndml0ZS1wbHVnaW4taW1hZ2VtaW4nXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgdml0ZUltYWdlbWluKHtcclxuICAgICAgbW96anBlZzogeyBxdWFsaXR5OiA4MCB9LFxyXG4gICAgICBwbmdxdWFudDogeyBxdWFsaXR5OiBbMC43LCAwLjldLCBzcGVlZDogNCB9LFxyXG4gICAgICB3ZWJwOiB7IHF1YWxpdHk6IDgwIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIGJhc2U6IHByb2Nlc3MuZW52LlZJVEVfQkFTRSB8fCAnLycsXHJcbiAgYXNzZXRzSW5jbHVkZTogWycqKi8qLkpQRycsICcqKi8qLlBORycsICcqKi8qLkpQRUcnLCAnKiovKi5XRUJQJ10sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1AsU0FBUyxvQkFBb0I7QUFDNVIsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZSxXQUFXO0FBQ25DLE9BQU8sa0JBQWtCO0FBSGtJLElBQU0sMkNBQTJDO0FBSzVNLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLGFBQWE7QUFBQSxNQUNYLFNBQVMsRUFBRSxTQUFTLEdBQUc7QUFBQSxNQUN2QixVQUFVLEVBQUUsU0FBUyxDQUFDLEtBQUssR0FBRyxHQUFHLE9BQU8sRUFBRTtBQUFBLE1BQzFDLE1BQU0sRUFBRSxTQUFTLEdBQUc7QUFBQSxJQUN0QixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsTUFBTSxRQUFRLElBQUksYUFBYTtBQUFBLEVBQy9CLGVBQWUsQ0FBQyxZQUFZLFlBQVksYUFBYSxXQUFXO0FBQUEsRUFDaEUsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
