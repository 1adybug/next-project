import { deleteReleaseAction } from "@actions/deleteReleaseAction"
import { getDataRequest } from "@utils/getDataRequest"
import { onError } from "@utils/onError"
import { useRequest } from "ahooks"

export function useDeleteRelease() {
    return useRequest(
        getDataRequest(async (id: string, version: string) => await deleteReleaseAction(id, version)),
        {
            manual: true,
            onError
        }
    )
}