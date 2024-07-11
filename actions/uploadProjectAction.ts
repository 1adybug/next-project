"use server"

import { getDataResponse } from "soda-next"
import { uploadProject } from "@utils/uploadProject"

export async function uploadProjectAction(data: FormData) {
    return await getDataResponse(async () => await uploadProject(data))
}
