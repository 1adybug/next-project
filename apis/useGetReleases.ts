import { queryReleaseAction } from "@actions/queryReleaseAction"
import { getDataRequest } from "soda-next"
import { onError } from "@utils/onError"
import { QueryReleaseData } from "@utils/queryReleases"
import { useRequest } from "ahooks"
import stableHash from "stable-hash"

export type UseQueryReleaseData = Omit<QueryReleaseData, "id"> & {
    id?: string
    open?: boolean
}

export function useQueryRelease(data: UseQueryReleaseData) {
    const { id, open, pageNo, pageSize } = data
    return useRequest(
        getDataRequest(async () => {
            if (!id || !open) return undefined
            return await queryReleaseAction({ id, pageNo, pageSize })
        }),
        {
            refreshDeps: [stableHash(data)],
            onError
        }
    )
}
