import { createServer } from "http"
import next from "next"

async function main() {
    const app = next({})
    const handle = app.getRequestHandler()
    await app.prepare()
    createServer((request, response) => handle(request, response)).listen(Number(process.env.PORT))
}

main()
