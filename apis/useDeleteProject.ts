import { deleteProjectAction } from "@actions/deleteProjectAction"
import { getDataRequest } from "@utils/getDataRequest"
import { onError } from "@utils/onError"
import { useRequest } from "ahooks"

export function useDeleteProject() {
    return useRequest(
        getDataRequest(async (id: string) => await deleteProjectAction(id)),
        {
            manual: true,
            onError
        }
    )
}
