import { uploadProjectAction } from "@actions/uploadProjectAction"
import { getDataRequest } from "soda-next"
import { onError } from "@utils/onError"
import { useRequest } from "ahooks"

export function useUploadProject() {
    return useRequest(
        getDataRequest(async (data: FormData) => await uploadProjectAction(data)),
        {
            manual: true,
            onError
        }
    )
}
