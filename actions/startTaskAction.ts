"use server"

import { startTask } from "@utils/startTask"
import { getDataResponse } from "soda-next"

export async function startTaskAction(id: string) {
    return await getDataResponse(async () => await startTask(id))
}