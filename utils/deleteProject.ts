import { DIR } from "@constants/index"
import { rm } from "fs/promises"
import { join } from "path"
import { deleteTask } from "./deleteTask"

export async function deleteProject(id: string) {
    await deleteTask(id)
    await rm(join(DIR, id), { recursive: true, force: true })
}
