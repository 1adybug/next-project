import { deleteTaskAction } from "@actions/deleteTaskAction"
import { getDataRequest } from "@utils/getDataRequest"
import { onError } from "@utils/onError"
import { useRequest } from "ahooks"

export function useDeleteTask() {
    return useRequest(
        getDataRequest(async (id: string) => await deleteTaskAction(id)),
        {
            manual: true,
            onError
        }
    )
}
