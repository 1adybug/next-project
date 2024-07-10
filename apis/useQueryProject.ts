import { queryProjectAction } from "@actions/queryProjectAction"
import { getDataRequest } from "@utils/getDataRequest"
import { onError } from "@utils/onError"
import { QueryProjectData } from "@utils/queryProject"
import { useRequest } from "ahooks"
import stableHash from "stable-hash"

export function useQueryProject(body: QueryProjectData) {
    return useRequest(
        getDataRequest(async () => await queryProjectAction(body)),
        {
            refreshDeps: [stableHash(body)],
            onError
        }
    )
}
