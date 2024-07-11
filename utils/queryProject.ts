import { DIR, NAMESPACE, Status } from "@constants/index"
import { getPagination } from "deepsea-tools"
import { readdir, readFile } from "fs/promises"
import { join } from "path"
import { getTaskList } from "./getTaskList"

export type QueryProjectData = {
    pageNo?: number
    pageSize?: number
}

export type Env = Record<string, string>

export type Project = {
    id: string
    name: string
    description: string
    port: number
    env: Env
    core: number
    createdAt: number
    updatedAt: number
    current?: string
}

export type ProjectWithStatus = Project & { status: Status }

export async function queryProject({ pageNo, pageSize }: QueryProjectData) {
    const dir = await readdir(DIR)
    pageNo ??= 1
    pageSize ??= dir.length
    const dir2 = dir.slice((pageNo - 1) * pageSize, pageNo * pageSize)
    const projects: ProjectWithStatus[] = []
    const tasks = await getTaskList()
    for (const id of dir2) {
        const configPath = join(DIR, id, "config.json")
        const project: Project = JSON.parse(await readFile(configPath, "utf-8"))
        const task = tasks.find(task => task.name === id && task.pm2_env.namespace === NAMESPACE)
        projects.push({ ...project, id, status: task ? (task.pm2_env.status as Status) : Status.未启动 })
    }
    return getPagination({
        data: projects,
        pageNum: pageNo,
        pageSize
    })
}
