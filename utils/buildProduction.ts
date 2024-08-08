import { copyFile, mkdir, readdir, readFile, rename, rm, writeFile } from "fs/promises"
import { join } from "path"
import { execAsync, zip } from "soda-nodejs"
import { buildScript } from "./buildScript"

const cacheDir = ".build.cache"

const release = process.argv.includes("--release")

async function main() {
    await rm(cacheDir, { recursive: true, force: true })
    await mkdir(cacheDir, { recursive: true })
    await execAsync("npx next build")
    await rename(".next", join(cacheDir, ".next"))
    const { name, version } = JSON.parse(await readFile("package.json", "utf8"))
    const dependencies: Record<string, string> = JSON.parse(await readFile("build.config.json", "utf8")).dependencies

    const packageJson = {
        name,
        version,
        scripts: {
            start: "node scripts/start.js"
        },
        dependencies
    }

    await writeFile(join(cacheDir, "package.json"), JSON.stringify(packageJson, null, 4))

    if (!release) {
        await execAsync("npm i", { cwd: cacheDir })
        await rm(join(cacheDir, "package-lock.json"), { recursive: true, force: true })
    }

    await copyFile(".env", join(cacheDir, ".env"))
    await buildScript({ output: join(cacheDir, "scripts") })
    const input = await readdir(cacheDir)
    await rm(join(cacheDir, "build.zip"), { recursive: true, force: true })
    await rm(join("build.zip"), { recursive: true, force: true })

    await zip({
        input,
        output: "build.zip",
        thread: "max",
        level: 0,
        cwd: cacheDir
    })

    await rename(join(cacheDir, "build.zip"), "build.zip")
    await rm(cacheDir, { recursive: true, force: true })
}

main()
