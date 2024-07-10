import Registry from "@components/Registry"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import { FC, ReactNode } from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

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
            <body className={inter.className}>
                <Registry>{children}</Registry>
            </body>
        </html>
    )
}

export default RootLayout
