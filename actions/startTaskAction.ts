"use server"

import { startTask } from "@utils/startTask"
import { getDataResponse } from "@utils/getDataResponse"

export async function startTaskAction(id: string) {
    return await getDataResponse(async () => await startTask(id))
}