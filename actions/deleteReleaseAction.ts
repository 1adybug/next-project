"use server"

import { deleteRelease } from "@utils/deleteRelease"
import { getDataResponse } from "soda-next"

export async function deleteReleaseAction(id: string, version: string) {
    return await getDataResponse(async () => await deleteRelease(id, version))
}