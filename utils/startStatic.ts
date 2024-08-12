import { config } from "dotenv"
import express from "express"
import { join, resolve } from "path"
import { createServer } from "./createServer"

config()

async function main() {
    if (!!process.env.BASE && !process.env.BASE.startsWith("/")) throw new Error("BASE 必须以 / 开头")

    const BASE = process.env.BASE || "/"

    const root = join("../", "releases", process.env.NEXT_PROJECT_VERSION!, "dist")

    const app = await createServer()

    app.use(`${BASE.replace(/\/+$/, "")}/`, express.static(root))

    app.get(`${BASE.replace(/\/+$/, "")}/*`, async (request, response) => response.sendFile(resolve(join(root, "index.html"))))

    if (BASE !== "/") app.get("/", async (request, response) => response.redirect(BASE))
}

main()
