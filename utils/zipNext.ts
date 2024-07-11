import { DIR } from "@constants/index"
import { readdir, rm } from "fs/promises"
import { join } from "path"
import { unzip } from "soda-nodejs"
import { getProject } from "./getProject"

export async function zipNext(id: string, current?: string) {
    current ??= (await getProject(id)).current
    if (!current) throw new Error("未找到当前版本")
    await rm(join(DIR, id, "main", ".next"), { recursive: true, force: true })
    const dir = await readdir(join(DIR, id, "releases", current, ".next"))
    for (const file of dir) {
        await rm(join(DIR, id, "releases", current, ".next", file), { recursive: true, force: true })
    }
    const dir2 = await readdir(join(DIR, id, "releases", current))
    const source = dir2.find(file => file.toLowerCase().endsWith(".zip") || file.toLowerCase().endsWith(".7z"))
    if (!source) throw new Error("未找到压缩文件")
    await unzip({
        source,
        target: join(DIR, id, "main")
    })
}
