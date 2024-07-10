import { getProject } from "./getProject"
import { Env } from "./queryProject"
import { updateProject } from "./updateProject"

export async function updateProjectEnv(id: string, env: Env) {
    const project = await getProject(id)
    project.env = env
    await updateProject(project)
}
