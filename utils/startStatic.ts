import express from "express"
import { join, resolve } from "path"

const app = express()

console.log(process.env.NEXT_PROJECT_VERSION, process.env.PORT)

app.use(express.static(join("../", "releases", process.env.NEXT_PROJECT_VERSION!, "dist")))

app.get("/*", async (request, response) => {
    response.sendFile(resolve(join("../", "releases", process.env.NEXT_PROJECT_VERSION!, "dist", "index.html")))
})

app.listen(Number(process.env.PORT))
