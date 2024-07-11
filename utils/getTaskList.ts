"use server"

import { execAsync } from "soda-nodejs"
import { NAMESPACE } from "../constants"

export async function getTaskList(): Promise<Pm2.Task[]> {
    let { stdout } = await execAsync(`pm2 jlist`)
    stdout = stdout.replace(/^[\d\D]*?\[/m, "[")
    return (JSON.parse(stdout) as Pm2.Task[]).filter(task => task.pm2_env.namespace === NAMESPACE)
}
