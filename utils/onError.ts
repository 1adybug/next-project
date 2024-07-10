import { message } from "antd"
import { getErrorMessage } from "deepsea-tools"

export function onError(error: unknown) {
    message.error(getErrorMessage(error))
}