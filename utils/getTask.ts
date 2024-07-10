import { getTaskList } from "./getTaskList"

export async function getTask(id: string) {
    const tasks = await getTaskList()
    return tasks.find(task => task.name === id)
}
