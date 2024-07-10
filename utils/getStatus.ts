import { Status } from "../constants"
import { getTask } from "./getTask"

export async function getStatus(id: string) {
    const task = await getTask(id)
    if (!task) return Status.未启动
    return task.pm2_env.status as Status
}
