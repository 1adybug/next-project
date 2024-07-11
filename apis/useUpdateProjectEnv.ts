import { updateProjectEnvAction } from "@actions/updateProjectEnvAction"
import { getDataRequest } from "soda-next"
import { onError } from "@utils/onError"
import { Env } from "@utils/queryProject"
import { useRequest } from "ahooks"

export function useUpdateProjectEnv() {
    return useRequest(
        getDataRequest(async (id: string, env: Env) => await updateProjectEnvAction(id, env)),
        {
            manual: true,
            onError
        }
    )
}
