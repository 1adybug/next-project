"use client"

import { StyleProvider } from "@ant-design/cssinjs"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { ConfigProvider } from "antd"
import zhCN from "antd/locale/zh_CN"
import { FC, ReactNode } from "react"

export type AntdNextRegistryProps = {
    children?: ReactNode
}

const Registry: FC<AntdNextRegistryProps> = props => {
    const { children } = props

    return (
        <AntdRegistry>
            <ConfigProvider locale={zhCN}>
                <StyleProvider hashPriority="high">{children}</StyleProvider>
            </ConfigProvider>
        </AntdRegistry>
    )
}

export default Registry
