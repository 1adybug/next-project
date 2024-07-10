import { rm } from "fs/promises"
import { deleteTask } from "./deleteTask"

export async function deleteProject(id: string) {
    await deleteTask(id)
    await rm(`projects/${id}`, { recursive: true, force: true })
}
