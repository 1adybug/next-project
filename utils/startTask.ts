import { readdir } from "fs/promises"
import { join, resolve } from "path"
import { execAsync } from "soda-nodejs"
import { DIR, NAMESPACE } from "../constants"
import { deleteTask } from "./deleteTask"
import { getProject } from "./getProject"
import { getProjectType, ProjectType } from "./getProjectType"
import { zipNext } from "./zipNext"

export async function startTask(id: string) {
    const { env, core, port, current } = await getProject(id)
    if (!current) throw new Error("未找到当前版本")
    await deleteTask(id)
    const type = await getProjectType(id, current)
    const cwd = join(DIR, id, "main")
    let start = ""
    switch (type) {
        case ProjectType.next:
            await zipNext(id, current)
            start = resolve("scripts", "startNext.js")
            break

        case ProjectType.remix:
            start = resolve("scripts", "startRemix.js")
            break

        case ProjectType.static:
            start = resolve("scripts", "startStatic.js")
            break

        case ProjectType.script:
            const dir = await readdir(join(DIR, id, "releases", current, "dist"))
            const script = dir.find(file => file.toLowerCase().endsWith(".js") || file.toLowerCase().endsWith(".mjs") || file.toLowerCase().endsWith(".cjs"))!
            start = resolve(DIR, id, "releases", current, "dist", script)

        default:
            throw new Error("未找到项目类型")
    }
    await execAsync(`pm2 start ${start} --name ${id} --namespace ${NAMESPACE} -i ${core}`, {
        cwd,
        env: {
            ...process.env,
            NODE_ENV: "production",
            PORT: port.toString(),
            NEXT_PROJECT_VERSION: current,
            ...env
        }
    })
}
