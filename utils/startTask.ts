import { join, relative } from "path"
import { execAsync } from "soda-nodejs"
import { DIR, NAMESPACE } from "../constants"
import { deleteTask } from "./deleteTask"
import { getEnvStr } from "./getEnvStr"
import { getProject } from "./getProject"

export async function startTask(id: string) {
    await deleteTask(id)
    const { env, core, port } = await getProject(id)
    env.PORT ??= port.toString()
    const cwd = join(DIR, id, "main")
    const startPath = join("scripts", "startTask.mjs")
    console.log(`cross-env${getEnvStr(env)} pm2 start ${relative(cwd, startPath)} --name ${id} --namespace ${NAMESPACE} -i ${core}`)
    await execAsync(`cross-env${getEnvStr(env)} pm2 start ${relative(cwd, startPath)} --name ${id} --namespace ${NAMESPACE} -i ${core}`, { cwd })
}
