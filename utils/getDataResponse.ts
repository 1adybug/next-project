import { DataResponse } from "soda-next"

export async function getDataResponse<Data>(action: () => Promise<Data>): Promise<DataResponse<Data>> {
    let success = true
    let data: Data | undefined
    let message: string | undefined
    try {
        data = await action()
    } catch (e) {
        success = false
        message = (e as Error).message
    }
    return { success, data, message }
}
