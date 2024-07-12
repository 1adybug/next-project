"use server"

import { getDataResponse } from "@utils/getDataResponse"
import { Env } from "@utils/queryProject"
import { updateProjectEnv } from "@utils/updateProjectEnv"

export async function updateProjectEnvAction(id: string, env: Env) {
    return await getDataResponse(async () => await updateProjectEnv(id, env))
}
