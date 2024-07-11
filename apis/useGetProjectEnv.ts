import { getProjectEnvAction } from "@actions/getProjectEnvAction"
import { getDataRequest } from "soda-next"
import { onError } from "@utils/onError"
import { useRequest } from "ahooks"

export function useGetProjectEnv(id?: string, open?: boolean) {
    return useRequest(
        getDataRequest(async () => {
            if (!id || !open) return undefined
            return await getProjectEnvAction(id)
        }),
        {
            refreshDeps: [id, open],
            onError
        }
    )
}
