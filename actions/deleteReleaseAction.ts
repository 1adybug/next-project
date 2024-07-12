"use server"

import { deleteRelease } from "@utils/deleteRelease"
import { getDataResponse } from "@utils/getDataResponse"

export async function deleteReleaseAction(id: string, version: string) {
    return await getDataResponse(async () => await deleteRelease(id, version))
}