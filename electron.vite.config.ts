import cp from 'vite-plugin-cp';
import "./scripts/gen-version"

const external = ["silk-wasm", "ws"];

function genCpModule(module: string) {
    return { src: `./node_modules/${module}`, dest: `dist/node_modules/${module}`, flatten: false }
}

let config = {
    main: {
        build: {
            outDir: "dist/main",
            emptyOutDir: true,
            lib: {
                formats: ["cjs"],
                entry: { "main": "src/main/main.ts" },
            },
            rollupOptions: {
                external,
                input: "src/main/main.ts",
            }
        },
        resolve:{
            alias: {
                './lib-cov/fluent-ffmpeg': './lib/fluent-ffmpeg'
            },
        },
        plugins: [cp({ targets: [...external.map(genCpModule), { src: './manifest.json', dest: 'dist' }] })]
    },
    preload: {
        // vite config options
        build: {
            outDir: "dist/preload",
            emptyOutDir: true,
            lib: {
                formats: ["cjs"],
                entry: { "preload": "src/preload.ts" },
            },
            rollupOptions: {
                // external: externalAll,
                input: "src/preload.ts",
            }
        },
        resolve:{
        }
    },
    renderer: {
        // vite config options
        build: {
            outDir: "dist/renderer",
            emptyOutDir: true,
            lib: {
                formats: ["es"],
                entry: { "renderer": "src/renderer.ts" },
            },
            rollupOptions: {
                // external: externalAll,
                input: "src/renderer.ts",
            }
        },
        resolve:{
        }
    }
}

export default config;