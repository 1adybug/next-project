import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import { mkdir, readFile, rm } from "fs/promises"
import { join } from "path"
import { rollup } from "rollup"

export type BuildScriptOptions = {
    output?: string
}

export async function buildScript({ output = "scripts" }: BuildScriptOptions = {}) {
    await rm(output, { recursive: true, force: true })
    await mkdir(output, { recursive: true })
    const dependencies: Record<string, string> = JSON.parse(await readFile("build.config.json", "utf8")).dependencies
    const bundler = await rollup({
        input: [join("utils", "start.ts"), join("utils", "startNext.ts"), join("utils", "startRemix.ts"), join("utils", "startStatic.ts")],
        output: { dir: output, format: "cjs" },
        plugins: [typescript(), resolve(), commonjs(), json()],
        external: Object.keys(dependencies)
    })
    bundler.write({ dir: output, format: "cjs" })
}
