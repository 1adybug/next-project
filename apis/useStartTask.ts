import { startTaskAction } from "@actions/startTaskAction"
import { getDataRequest } from "soda-next"
import { onError } from "@utils/onError"
import { useRequest } from "ahooks"

export function useStartTask() {
    return useRequest(
        getDataRequest(async (id: string) => await startTaskAction(id)),
        {
            manual: true,
            onError
        }
    )
}
