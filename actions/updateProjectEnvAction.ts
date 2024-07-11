"use server"

import { getDataResponse } from "soda-next"
import { Env } from "@utils/queryProject"
import { updateProjectEnv } from "@utils/updateProjectEnv"

export async function updateProjectEnvAction(id: string, env: Env) {
    return await getDataResponse(async () => await updateProjectEnv(id, env))
}
