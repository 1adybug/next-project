import { mkdir, readdir, rm } from "fs/promises"
import { join } from "path"
import { saveFile, unzip } from "soda-nodejs"
import { getProject } from "./getProject"
import { updateProject } from "./updateProject"

export async function uploadProject(data: FormData) {
    const id = data.get("id") as string
    const file = data.get("file") as File
    if (!file.name.toLowerCase().endsWith(".zip") && !file.name.endsWith(".7z")) throw new Error("请上传 zip 或 7z 格式的文件")
    const version = Date.now().toString()
    const folder = join("projects", id, "releases", version)
    await mkdir(folder, { recursive: true })
    const target = join(folder, file.name.toLowerCase().replace(/^(.+?)(\.zip|\.7z)/, `${version}$2`))
    try {
        await saveFile({
            file,
            target
        })
        await unzip({
            source: target,
            target: folder
        })
    } catch (error) {
        await rm(folder, { recursive: true, force: true })
        throw new Error("解压失败")
    }
    const dir = await readdir(folder)
    if (dir.includes(".next")) await rm(join(folder, ".next"), { recursive: true, force: true })
    const project = await getProject(id)
    project.current = version
    await updateProject(project)
}
