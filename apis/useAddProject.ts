import { addProjectAction } from "@actions/addProjectAction"
import { Project } from "@utils/queryProject"
import { getDataRequest } from "soda-next"
import { onError } from "@utils/onError"
import { useRequest } from "ahooks"

export function useAddProject() {
    return useRequest(
        getDataRequest(async (data: Project) => await addProjectAction(data)),
        {
            manual: true,
            onError
        }
    )
}
