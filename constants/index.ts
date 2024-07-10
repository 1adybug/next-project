import { config } from "dotenv"

config()

export enum Status {
    "错误" = "errored",
    "在线" = "online",
    "停止" = "stopped",
    "未启动" = "not launched"
}

export const NAMESPACE = process.env.NEXT_PROJECT_NAMESPACE!