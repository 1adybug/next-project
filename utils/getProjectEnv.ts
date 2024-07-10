import { getProject } from "./getProject"

export type EnvItem = {
    key: string
    value: string
}

export async function getProjectEnv(id: string) {
    const project = await getProject(id)
    const env: EnvItem[] = Object.entries(project.env || {}).map(([key, value]) => ({ key, value }))
    return env
}
