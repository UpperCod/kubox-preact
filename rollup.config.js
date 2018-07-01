import buble from "rollup-plugin-buble";

export default {
    input: "src/index.js",
    output: [
        {
            file: "build/kubox-preact.js",
            format: "iife",
            name: "KuboxPreact"
        },
        {
            file: "build/kubox-preact.umd.js",
            format: "umd",
            name: "KuboxPreact"
        },
        {
            file: "build/kubox-preact.cjs.js",
            format: "cjs"
        },
        {
            file: "build/kubox-preact.es.js",
            format: "es"
        }
    ],
    sourceMap: true,
    external: ["preact"],
    watch: {
        chokidar: {},
        exclude: ["node_modules/**"]
    },
    plugins: [
        buble({
            jsx: "h",
            objectAssign: "Object.assign"
        })
    ]
};
