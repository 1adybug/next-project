import { DataResponse } from "./getDataResponse"

export function getDataRequest<Loader extends (...args: any[]) => Promise<DataResponse<any> | undefined | void>>(loader: Loader): (...args: Parameters<Loader>) => Promise<Exclude<Awaited<ReturnType<Loader>>, undefined | void>["data"]> {
    return async (...args) => {
        const result = (await loader(...args)) ?? {}
        const { data, error } = result
        if (error) throw new Error(error)
        return data
    }
}
