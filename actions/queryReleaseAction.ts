"use server"

import { queryRelease, QueryReleaseData } from "@utils/queryReleases"
import { getDataResponse } from "@utils/getDataResponse"

export async function queryReleaseAction(data: QueryReleaseData) {
    return await getDataResponse(async () => await queryRelease(data))
}