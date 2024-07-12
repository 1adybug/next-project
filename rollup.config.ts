import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import { join } from "path"
import { type RollupOptions } from "rollup"

const config: RollupOptions = {
    input: process.env.SCRIPTS!.split(","),
    output: {
        dir: join(process.env.CACHE_DIR ?? "./", "scripts"),
        format: "esm"
    },
    plugins: [typescript(), resolve(), commonjs(), json()],
    external: ["next"]
}

export default config
