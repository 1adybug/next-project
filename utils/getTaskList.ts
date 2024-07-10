"use server"

import { execAsync } from "soda-nodejs"
import { NAMESPACE } from "../constants"
import { writeFile } from "fs/promises"

export async function getTaskList(): Promise<Pm2.Task[]> {
    let { stdout } = await execAsync(`pm2 jlist`)
    stdout = stdout.replace(/^[\d\D]*?\[/m, "[")
    try {
        return (JSON.parse(stdout) as Pm2.Task[]).filter(task => task.pm2_env.namespace === NAMESPACE)
    } catch (error) {
        console.log("---error start---")
        console.log(error)
        console.log("---error end---")
        console.log("---stdout---")
        console.log(stdout)
        console.log("---stdout end---")
        return []
    }
}
