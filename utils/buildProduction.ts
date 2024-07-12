import { copyFile, mkdir, readdir, rename, rm, writeFile } from "fs/promises"
import { join } from "path"
import { execAsync, zip } from "soda-nodejs"
import { buildScript } from "./buildScript"

const packageJson = {
    name: "next-project",
    version: "0.1.0",
    private: true,
    scripts: {
        start: "node scripts/start.js"
    },
    dependencies: {
        "@resvg/resvg-js": "^2",
        next: "^14",
        react: "^18",
        "react-dom": "^18"
    }
}

const cacheDir = ".build.cache"

async function main() {
    await rm(cacheDir, { recursive: true, force: true })
    await mkdir(cacheDir, { recursive: true })
    await execAsync("npx next build")
    await rename(".next", join(cacheDir, ".next"))
    await writeFile(join(cacheDir, "package.json"), JSON.stringify(packageJson, null, 4))
    await execAsync("npm i", { cwd: cacheDir })
    await rm(join(cacheDir, "package-lock.json"), { recursive: true, force: true })
    await copyFile(".env", join(cacheDir, ".env"))
    await buildScript(join(cacheDir, "scripts"))
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
