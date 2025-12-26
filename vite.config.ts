import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { resolve, dirname } from "path";
import { wrapperEnv } from "./build/getEnv";
import { createProxy } from "./build/proxy";
import { createVitePlugins } from "./build/plugins";
import { runBuild } from "./build/postBuild";
import { execSync } from "child_process";
import pkg from "./package.json";
import { dayjs } from "element-plus";
import { fileURLToPath } from "url";

const { dependencies, devDependencies, name, version, description } = pkg;
const lastBuildTime = dayjs().format("YYYYMMDDHHmmss");
// Create equivalents for __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// @see: https://vitejs.dev/config/
export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const buildName = `${pkg.name}`;
  const branch = execSync(`git branch --show-current`).toString().trim();
  const commitId = execSync(`git rev-parse HEAD`).toString().trim();
  const __APP_INFO__ = {
    pkg: { dependencies, devDependencies, name, version, description },
    lastBuildTime,
    branch,
    commitId
  };

  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/var.scss" as *;`
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // Load proxy configuration from .env.development
      proxy: createProxy(viteEnv.VITE_PROXY)
    },
    plugins: createVitePlugins(viteEnv, command, { buildName, version, lastBuildTime, branch, commitId }),
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log"] : []
    },
    build: {
      outDir: buildName,
      minify: "esbuild",
      // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
      //minify: 'terser',
      //terserOptions: {
      //  compress: {
      //    drop_console: viteEnv.VITE_DROP_CONSOLE,
      //    drop_debugger: true,
      //  },
      //},
      sourcemap: process.env.NODE_ENV === "development",
      // 禁用 gzip 压缩大小报告，可略微减少打包时间
      // reportCompressedSize: false,
      // 规定触发警告的 chunk 大小
      // chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: `assets/js/[name]-[hash]-v${version}-${lastBuildTime}.js`,
          entryFileNames: `assets/js/[name]-[hash]-v${version}-${lastBuildTime}.js`,
          assetFileNames: `assets/[ext]/[name]-[hash]-v${version}-${lastBuildTime}.[ext]`
        }
      }
    }
  };
});
