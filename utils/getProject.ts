import { readdir, readFile } from "fs/promises"
import { join } from "path"
import { getStatus } from "./getStatus"
import { ProjectWithStatus } from "./queryProject"

export async function getProject(id: string) {
    const dir = await readdir("projects")
    if (!dir.includes(id)) throw new Error("项目不存在")
    const configPath = join("projects", id, "config.json")
    const project = JSON.parse(await readFile(configPath, "utf-8"))
    const status = await getStatus(id)
    return { ...project, id, status } as ProjectWithStatus
}
