export type DataResponse<Data> = {
    data?: Data
    error?: string
}

export async function getDataResponse<Data>(action: () => Promise<Data>): Promise<DataResponse<Data>> {
    let data: Data | undefined
    let error: string | undefined
    try {
        data = await action()
    } catch (e) {
        error = (e as Error).message
    }
    return { data, error }
}
