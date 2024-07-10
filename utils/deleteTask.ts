import { execAsync } from "soda-nodejs"
import { NAMESPACE } from "../constants"
import { getTaskList } from "./getTaskList"

export async function deleteTask(id: string) {
    const allTasks = await getTaskList()
    const tasks = allTasks.filter(task => task.name === id && task.pm2_env.namespace === NAMESPACE)
    if (tasks.length === 0) return
    await execAsync(`pm2 delete ${tasks.map(({ pm_id }) => pm_id).join(" ")}`)
}