import ProjectManagement from "@components/ProjectManagement"
import { FC, Suspense } from "react"

const Page: FC = () => {
    return (
        <Suspense>
            <ProjectManagement />
        </Suspense>
    )
}

export default Page
