// @ts-check
import { copyFile, mkdir, readdir, rename, rm, writeFile } from "fs/promises"
import { join } from "path"
import { execAsync } from "soda-nodejs"

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
    const dir = await readdir("scripts")
    const scripts = dir.filter(item => item.endsWith(".ts")).map(item => join("scripts", item))
    await execAsync("npx rollup -c rollup.config.ts --configPlugin @rollup/plugin-typescript", {
        env: {
            NODE_ENV: "production",
            CACHE_DIR: cacheDir,
            SCRIPTS: scripts.join(",")
        }
    })
}

main()
