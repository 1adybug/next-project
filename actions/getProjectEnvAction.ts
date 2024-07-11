"use server"

import { getDataResponse } from "soda-next"
import { getProjectEnv } from "@utils/getProjectEnv"

export async function getProjectEnvAction(id: string) {
    return await getDataResponse(async () => await getProjectEnv(id))
}
