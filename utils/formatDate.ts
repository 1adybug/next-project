import dayjs, { ConfigType } from "dayjs"

export function formatDate(date?: ConfigType) {
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss")
}
