"use server"

import { deleteProject } from "@utils/deleteProject"
import { getDataResponse } from "soda-next"

export async function deleteProjectAction(id: string) {
    return await getDataResponse(async () => await deleteProject(id))
}
