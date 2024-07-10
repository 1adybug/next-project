import { createWriteStream } from "fs"
import { mkdir, rm } from "fs/promises"
import { join } from "path"
import { execAsync } from "soda-nodejs"
import { Readable } from "stream"
import { getProject } from "./getProject"
import { updateProject } from "./updateProject"

export async function uploadProject(data: FormData) {
    const id = data.get("id") as string
    const file = data.get("file") as File
    if (!file.name.toLowerCase().endsWith(".zip") && !file.name.endsWith(".7z")) throw new Error("请上传 zip 或 7z 格式的文件")
    const version = Date.now().toString()
    const folder = join("projects", id, "releases", version)
    await mkdir(folder, { recursive: true })
    const filePath = join(folder, file.name.toLowerCase().replace(/^(.+?)(\.zip|\.7z)/, `${version}$2`))
    try {
        await new Promise((resolve, reject) => {
            const writeAble = createWriteStream(filePath)
            Readable.fromWeb(file.stream() as any)
                .pipe(writeAble)
                .on("finish", resolve)
                .on("error", reject)
        })
        await execAsync(`7z x ${filePath} -o${folder}`)
    } catch (error) {
        await rm(folder, { recursive: true, force: true })
        throw new Error("解压失败")
    }
    const project = await getProject(id)
    project.current = version
    await updateProject(project)
}
