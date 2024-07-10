import { readdir } from "fs/promises"
import { checkPort } from "get-port-please"
import { Status } from "../constants"
import { getProject } from "./getProject"
import { Project, queryProject } from "./queryProject"
import { startTask } from "./startTask"
import { writeConfig } from "./writeConfig"

export type UpdateProjectData = Partial<Omit<Project, "id">> & {
    id: string
}

export async function updateProject(data: UpdateProjectData) {
    const { id, port } = data
    const dir = await readdir("projects")
    if (!dir.includes(id)) throw new Error("项目不存在")
    if (port) {
        const projects = await queryProject({})
        const portProject = projects.list.find(project => project.port === port)
        if (portProject && portProject.id !== id) throw new Error(`端口已经被 ${portProject.id} 占用`)
        if (!portProject) {
            const portCheck = await checkPort(port)
            if (port !== portCheck) throw new Error("端口已经被占用")
        }
    }
    const project = await getProject(id)
    const newProject = { ...project, ...data }
    await writeConfig(id, newProject)
    if (project.status === Status.未启动) return
    await startTask(id)
    return newProject
}
