"use server"

import { deleteProject } from "@utils/deleteProject"
import { getDataResponse } from "@utils/getDataResponse"

export async function deleteProjectAction(id: string) {
    return await getDataResponse(async () => await deleteProject(id))
}
