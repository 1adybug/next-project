import { config } from "dotenv"
import { readFile } from "fs/promises"
import { checkPort } from "get-port-please"
import { createServer as createHttpServer } from "http"
import { createServer as createHttpsServer } from "https"
import next from "next"
import { join } from "path"

config()

async function main() {
    const PEM_PATH = process.env.PEM_PATH
    const HTTPS = !!PEM_PATH
    const PORT = process.env.PORT ? Number(process.env.PORT) : HTTPS ? 443 : 80
    const HOSTNAME = process.env.HOSTNAME
    if (!checkPort(PORT)) throw new Error(`无效的端口号: ${PORT}`)
    
    const app = next({ experimentalHttpsServer: HTTPS })
    const handle = app.getRequestHandler()
    await app.prepare()

    if (!HTTPS) return createHttpServer((request, response) => handle(request, response)).listen(PORT, HOSTNAME)

    const key = await readFile(join(PEM_PATH, "privkey.pem"), "utf8")
    const cert = await readFile(join(PEM_PATH, "cert.pem"), "utf8")
    const ca = await readFile(join(PEM_PATH, "chain.pem"), "utf8")

    createHttpsServer({ key, cert, ca }, (request, response) => handle(request, response)).listen(PORT, HOSTNAME)
}

main()
