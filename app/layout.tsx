import Registry from "@components/Registry"
import { Metadata } from "next"
import { FC, ReactNode } from "react"
import "./globals.css"

export const metadata: Metadata = {
    title: "格数科技前端管理",
    description: "powered by luzixu"
}

export type RootLayoutProps = {
    children?: ReactNode
}

const RootLayout: FC<RootLayoutProps> = props => {
    const { children } = props

    return (
        <html lang="zh">
            <body>
                <Registry>{children}</Registry>
            </body>
        </html>
    )
}

export default RootLayout
