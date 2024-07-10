import { getPagination } from "deepsea-tools"
import { readdir } from "fs/promises"
import { join } from "path"

export type QueryReleaseData = {
    id: string
    pageNo: number
    pageSize: number
}

export async function queryRelease({ id, pageNo, pageSize }: QueryReleaseData) {
    const dir = await readdir(join("projects", id, "releases"))
    return getPagination({
        data: dir.sort((a, b) => Number(b) - Number(a)).map(item => String(item)),
        pageNum: pageNo,
        pageSize
    })
}
