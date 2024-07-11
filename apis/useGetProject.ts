import { getProjectAction } from "@actions/getProjectAction"
import { getDataRequest } from "soda-next"
import { onError } from "@utils/onError"
import { useRequest } from "ahooks"

export function useGetProject(id?: string, open?: boolean) {
    return useRequest(
        getDataRequest(async () => {
            if (!id || !open) return undefined
            return await getProjectAction(id)
        }),
        {
            refreshDeps: [id, open],
            onError
        }
    )
}
