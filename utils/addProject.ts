import { mkdir, readdir } from "fs/promises"
import { checkPort } from "get-port-please"
import { join } from "path"
import { Project, queryProject } from "./queryProject"
import { writeConfig } from "./writeConfig"

export async function addProject(data: Project) {
    const { id, port } = data
    const dir = await readdir("projects")
    if (dir.includes(id)) throw new Error("项目已经存在")
    const portCheck = await checkPort(port)
    if (port !== portCheck) throw new Error("端口已经被占用")
    const projects = await queryProject({})
    if (projects.list.some(project => project.id !== id && project.port === port)) throw new Error("端口已经被占用")
    const folder = join("projects", id)
    const main = join(folder, "main")
    const releases = join(folder, "releases")
    await mkdir(main, { recursive: true })
    await mkdir(releases, { recursive: true })
    return await writeConfig(id, data, true)
}
