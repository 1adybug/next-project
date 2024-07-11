"use server"

import { getDataResponse } from "soda-next"
import { queryProject, QueryProjectData } from "@utils/queryProject"

export async function queryProjectAction(data: QueryProjectData) {
    return await getDataResponse(async () => await queryProject(data))
}
