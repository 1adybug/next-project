import cors from "cors"
import { config } from "dotenv"
import express from "express"
import { readFile } from "fs/promises"
import { createServer as createHttpServer } from "http"
import { createServer as createHttpsServer } from "https"
import { join, resolve } from "path"

config()

async function main() {
    const PEM_PATH = process.env.PEM_PATH
    const HTTPS = !!PEM_PATH
    const PORT = process.env.PORT ? Number(process.env.PORT) : HTTPS ? 443 : 80
    const HOSTNAME = process.env.HOSTNAME
    const ROOT = process.env.ROOT || "dist"
    if (!!process.env.BASE && !process.env.BASE.startsWith("/")) throw new Error("BASE 必须以 / 开头")
    const BASE = process.env.BASE || "/"

    const app = express()

    app.use(cors())

    app.use(`${BASE.replace(/\/+$/, "")}/`, express.static(join("../", "releases", process.env.NEXT_PROJECT_VERSION!, ROOT)))

    app.get(`${BASE.replace(/\/+$/, "")}/*`, async (request, response) => response.sendFile(resolve(join("../", "releases", process.env.NEXT_PROJECT_VERSION!, ROOT, "index.html"))))

    if (BASE !== "/") app.get("/", async (request, response) => response.redirect(BASE))

    if (!HTTPS) return createHttpServer(app).listen(PORT, HOSTNAME)

    const key = await readFile(join(PEM_PATH, "privkey.pem"), "utf8")
    const cert = await readFile(join(PEM_PATH, "cert.pem"), "utf8")
    const ca = await readFile(join(PEM_PATH, "chain.pem"), "utf8")

    createHttpsServer({ key, cert, ca }, app).listen(PORT, HOSTNAME)
}

main()
