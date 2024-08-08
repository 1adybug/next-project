import { config } from "dotenv"
import express from "express"
import next from "next"
import { createServer } from "./createServer"

config()

async function main() {
    const PEM_PATH = process.env.PEM_PATH
    const HTTPS = !!PEM_PATH
    const nextApp = next({ experimentalHttpsServer: HTTPS })
    const handler = nextApp.getRequestHandler()
    await nextApp.prepare()

    const app = express()

    app.all("*", (request, response) => handler(request, response))

    createServer(app)
}

main()
