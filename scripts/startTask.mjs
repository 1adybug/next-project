// @ts-check
import dayjs from "dayjs"
import express from "express"
import { readdir, readFile } from "fs/promises"
import { createServer } from "http"
import next from "next"
import { join, resolve } from "path"

/**
 * @param {string} current
 * @param {number} port
 */
function startStatic(current, port) {
    const app = express()
    app.use(express.static(join("../", "releases", current, "dist")))

    app.get("/*", async (request, response) => {
        response.sendFile(resolve(join("../", "releases", current, "dist", "index.html")))
    })
    app.listen(port)
}

/**
 * @param {string} current
 * @param {number} port
 */
async function startNext(current, port) {
    const app = next({ dir: join("../", "releases", current) })
    const handle = app.getRequestHandler()
    await app.prepare()
    createServer((request, response) => handle(request, response)).listen(port)
}

/**
 * @param {string} current
 * @param {string} fileName
 */
async function startScript(current, fileName) {
    await import(`file://${resolve(join("../", "releases", current, "dist", fileName))}`)
}

async function main() {
    const { current, port, id } = JSON.parse(await readFile(join("../", "config.json"), "utf-8"))
    if (typeof current !== "string") return
    const dir = await readdir(join("../", "releases", current))
    console.log(`${dayjs().format("YYYY-MM-DD HH:mm:ss")} 启动 ${id} 版本 ${current} 上传时间 ${dayjs(Number(current)).format("YYYY-MM-DD HH:mm:ss")} 端口 ${port}`)
    if (dir.includes("dist")) {
        const dir2 = await readdir(join("../", "releases", current, "dist"))
        if (dir2.includes("index.html")) {
            startStatic(current, port)
            return
        }
        if (dir2.includes("index.js")) {
            await startScript(current, "index.js")
            return
        }
        if (dir2.includes("index.mjs")) {
            await startScript(current, "index.mjs")
            return
        }
        if (dir2.includes("index.cjs")) {
            await startScript(current, "index.cjs")
            return
        }
    }
    if (dir.includes(".next")) {
        await startNext(current, port)
        return
    }
    return
}

main()
