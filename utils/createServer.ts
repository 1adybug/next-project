import compression from "compression"
import cors from "cors"
import { Express } from "express"
import { readFile } from "fs/promises"
import { createServer as createHttpServer } from "http"
import { createServer as createHttpsServer } from "https"
import morgan from "morgan"
import { join } from "path"

export async function createServer(app: Express) {
    app.disable("x-powered-by")
    app.use(compression())
    app.use(cors())
    app.use(morgan("tiny"))

    const PEM_PATH = process.env.PEM_PATH
    const HTTPS = !!PEM_PATH
    const PORT = process.env.PORT ? Number(process.env.PORT) : HTTPS ? 443 : 80
    const HOSTNAME = process.env.HOSTNAME

    if (!HTTPS) return createHttpServer(app).listen(PORT, HOSTNAME)

    const key = await readFile(join(PEM_PATH, "privkey.pem"), "utf8")
    const cert = await readFile(join(PEM_PATH, "cert.pem"), "utf8")
    const ca = await readFile(join(PEM_PATH, "chain.pem"), "utf8")

    createHttpsServer({ key, cert, ca }, app).listen(PORT, HOSTNAME)
}
