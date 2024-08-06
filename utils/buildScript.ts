import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import { mkdir, rm } from "fs/promises"
import { join } from "path"
import { rollup } from "rollup"

export type BuildScriptOptions = {
    output?: string
    release?: boolean
}

export async function buildScript({ output = "scripts", release }: BuildScriptOptions = {}) {
    await rm(output, { recursive: true, force: true })
    await mkdir(output, { recursive: true })
    const bundler = await rollup({
        input: [join("utils", "start.ts"), join("utils", "startNext.ts"), join("utils", "startStatic.ts")],
        output: { dir: output, format: "cjs" },
        plugins: [typescript(), resolve(), commonjs(), json()],
        external: release ? ["dotenv", "express", "get-port-please", "next", "soda-nodejs"] : ["next"]
    })
    bundler.write({ dir: output, format: "cjs" })
}
