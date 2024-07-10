import { uploadProjectAction } from "@actions/uploadProjectAction"
import { getDataRequest } from "@utils/getDataRequest"
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
