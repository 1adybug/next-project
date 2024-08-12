import { createRequestHandler } from "@remix-run/express"
import { config } from "dotenv"
import express from "express"
import { join } from "path"
import { createServer } from "./createServer"

config()

async function main() {
    const dir = join("../", "releases", process.env.NEXT_PROJECT_VERSION!, "dist")

    const remixHandler = createRequestHandler({
        build: await import(`${join(dir, "server", "index.js")}`)
    })

    const app = await createServer()

    app.use("/assets", express.static(join(dir, "client", "assets")))

    app.use(express.static(join(dir, "client")))

    app.all("*", remixHandler)
}

main()
