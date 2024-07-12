"use server"

import { getDataResponse } from "@utils/getDataResponse"
import { getProjectEnv } from "@utils/getProjectEnv"

export async function getProjectEnvAction(id: string) {
    return await getDataResponse(async () => await getProjectEnv(id))
}
