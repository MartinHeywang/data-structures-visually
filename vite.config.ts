import path from "path";
import { defineConfig } from "vite";

const root = path.resolve(__dirname, "src");
const outDir = path.resolve(__dirname, "dist");

export default defineConfig({
    root,
    base: "/data-structures-visually/",
    build: {
        outDir,
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, "src/index.html"),

                // trying to find a *more optimized* way to register all the pages
                // but it ends taking more space that it would have by just copy-pasting
                ...(() => {
                    const result = {};

                    [
                        "linked-list",
                        "queue",
                        "stack",
                        "hash-map",
                        "binary-search-tree",
                        "heap",
                        "basic-graph-traversal",
                        "hashing",
                        "tries",
                        "advance-graphs",
                        "bit-manipulation",
                        "segment-tree",
                        "avl-tree",
                        "b+-tree",
                    ].forEach(name => {
                        result[name] = path.resolve(__dirname, "src/pages", `${name}.html`);
                    });

                    return result;
                })(),
            },
        },
    },
});
