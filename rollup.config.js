import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import buble from "rollup-plugin-buble";

const NAME = "PreactStateNano";

export default {
    input: "src/index.js",
    output: [
        {
            file: "build/umd.js",
            format: "umd",
            name: NAME
        },
        {
            file: "build/cjs.js",
            format: "cjs"
        },
        {
            file: "build/iife.js",
            format: "iife",
            name: NAME
        }
    ],
    sourceMap: false,
    external: ["preact"],
    watch: {
        chokidar: {},
        exclude: ["node_modules/**"]
    },
    plugins: [
        resolve({
            jsnext: true,
            main: true
        }),
        commonjs({
            include: "node_modules/**"
        }),
        buble({
            jsx: "h",
            objectAssign: "Object.assign"
        })
    ]
};
