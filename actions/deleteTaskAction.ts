"use server"

import { deleteTask } from "@utils/deleteTask"
import { getDataResponse } from "@utils/getDataResponse"

export async function deleteTaskAction(id: string) {
    return await getDataResponse(async () => await deleteTask(id))
}