import { Project } from "@utils/queryProject"
import { writeFile } from "fs/promises"
import { join } from "path"

export async function writeConfig(id: string, data: Project, first?: boolean) {
    const folder = join("projects", id)
    const configPath = join(folder, "config.json")
    data = { ...data }
    data.env ??= {}
    data.updatedAt = Date.now()
    if (first) data.createdAt = data.updatedAt
    await writeFile(configPath, JSON.stringify(data, null, 4))
    return data
}
