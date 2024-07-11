import { updateProjectAction } from "@actions/updateProjectAction"
import { getDataRequest } from "soda-next"
import { onError } from "@utils/onError"
import { UpdateProjectData } from "@utils/updateProject"
import { useRequest } from "ahooks"

export function useUpdateProject() {
    return useRequest(
        getDataRequest(async (data: UpdateProjectData) => await updateProjectAction(data)),
        {
            manual: true,
            onError
        }
    )
}
