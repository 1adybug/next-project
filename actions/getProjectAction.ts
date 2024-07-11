"use server"

import { getDataResponse } from "soda-next"
import { getProject } from "@utils/getProject"

export async function getProjectAction(id: string) {
    return await getDataResponse(async () => await getProject(id))
}
