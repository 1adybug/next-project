"use server"

import { getDataResponse } from "soda-next"
import { updateProject, UpdateProjectData } from "@utils/updateProject"

export async function updateProjectAction(data: UpdateProjectData) {
    return await getDataResponse(async () => await updateProject(data))
}
