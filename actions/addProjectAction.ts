"use server"

import { addProject } from "@utils/addProject"
import { getDataResponse } from "@utils/getDataResponse"
import { Project } from "@utils/queryProject"

export async function addProjectAction(data: Project) {
    return await getDataResponse(async () => await addProject(data))
}
