"use server"

import { getDataResponse } from "@utils/getDataResponse"
import { uploadProject } from "@utils/uploadProject"

export async function uploadProjectAction(data: FormData) {
    return await getDataResponse(async () => await uploadProject(data))
}
