import path from "path";
import { defineConfig } from "vite";

const root = path.resolve(__dirname, "src");
const outDir = path.resolve(__dirname, "dist");

export default defineConfig({
    root,
    build: {
        outDir,
        emptyOutDir: true
    }
})