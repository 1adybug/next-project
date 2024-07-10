// @ts-check
import { config } from "dotenv"
import { createServer } from "http"
import next from "next"

config()

async function main() {
    const app = next({})
    const handle = app.getRequestHandler()
    await app.prepare()
    const { NEXT_PROJECT_PORT } = process.env
    createServer((request, response) => handle(request, response)).listen(NEXT_PROJECT_PORT ? parseInt(NEXT_PROJECT_PORT) : 48888)
}

main()
