import { DIR } from "@constants/index"
import { readdir } from "fs/promises"
import { join } from "path"
import { getProject } from "./getProject"

export enum ProjectType {
    "static" = "static",
    "next" = "next",
    "script" = "script",
    "remix" = "remix"
}

export async function getProjectType(id: string, current?: string): Promise<ProjectType> {
    current ??= (await getProject(id)).current
    if (!current) throw new Error("未找到当前版本")
    const dir = await readdir(join(DIR, id, "releases", current))
    if (dir.includes(".next")) return ProjectType.next
    if (dir.includes("dist")) {
        const dir2 = await readdir(join(DIR, id, "releases", current, "dist"))
        if (dir2.includes("client") && dir2.includes("server")) return ProjectType.remix
        if (dir2.includes("index.html")) return ProjectType.static
        if (dir2.includes("index.js")) return ProjectType.script
        if (dir2.includes("index.mjs")) return ProjectType.script
        if (dir2.includes("index.cjs")) return ProjectType.script
    }
    throw new Error("未找到项目类型")
}
