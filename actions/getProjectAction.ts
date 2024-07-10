"use server"

import { getDataResponse } from "@utils/getDataResponse"
import { getProject } from "@utils/getProject"

export async function getProjectAction(id: string) {
    return await getDataResponse(async () => await getProject(id))
}
