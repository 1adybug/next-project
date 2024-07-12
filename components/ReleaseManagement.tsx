import { useDeleteRelease } from "@apis/useDeleteRelease"
import { useGetProject } from "@apis/useGetProject"
import { useQueryRelease } from "@apis/useGetReleases"
import { useUpdateProject } from "@apis/useUpdateProject"
import { formatDate } from "@utils/formatDate"
import { Button, message, Popconfirm, Table } from "antd"
import { showTotal } from "deepsea-tools"
import { FC, MutableRefObject, Ref, useImperativeHandle, useState } from "react"
import { Columns } from "soda-type"

export type ReleaseManagementProps = {
    id: string
    open: boolean
    refreshRef?: Ref<() => void>
}

export type Release = {
    version: string
}

const ReleaseManagement: FC<ReleaseManagementProps> = props => {
    const { id, open, refreshRef } = props
    const [pageSize, setPageSize] = useState(5)
    const [pageNo, setPageNo] = useState(1)
    const { data, loading, refresh } = useQueryRelease({ id, open, pageNo, pageSize })
    const { data: project, loading: projectLoading, refresh: refreshProject } = useGetProject(id, open)
    const { runAsync: deleteReleaseAsync, loading: deleteReleaseLoading } = useDeleteRelease()
    const { runAsync: updateProjectAsync, loading: updateProjectLoading } = useUpdateProject()

    useImperativeHandle(
        refreshRef,
        () => () => {
            setPageNo(1)
            refresh()
            refreshProject()
        },
        []
    )

    const columns: Columns<Release> = [
        {
            title: "序号",
            align: "center",
            key: "index",
            render(value, record, index) {
                return index + 1
            }
        },
        {
            title: "版本",
            align: "center",
            dataIndex: "version"
        },
        {
            title: "上传时间",
            align: "center",
            dataIndex: "version",
            key: "uploadedAt",
            render(value, record, index) {
                return formatDate(Number(value))
            }
        },
        {
            title: "操作",
            align: "center",
            key: "operation",
            dataIndex: "version",
            render(value, record, index) {
                return (
                    <div className="flex justify-center gap-2">
                        <Button type="primary" loading={projectLoading || updateProjectLoading} disabled={project?.current === value} onClick={() => updateRelease(value)}>
                            设置
                        </Button>
                        <Popconfirm title="确认删除" onConfirm={() => deleteRelease(value)}>
                            <Button type="primary" loading={deleteReleaseLoading} danger>
                                删除
                            </Button>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ]

    async function updateRelease(version: string) {
        await updateProjectAsync({ id, current: version })
        message.success("设置成功")
        refresh()
        refreshProject()
    }

    async function deleteRelease(version: string) {
        await deleteReleaseAsync(id, version)
        message.success("删除成功")
        refresh()
        refreshProject()
    }

    return (
        <Table<Release>
            loading={loading}
            dataSource={data?.list.map(version => ({ version }))}
            columns={columns}
            rowKey="id"
            pagination={{
                pageSize,
                total: data?.total,
                showTotal,
                onChange(page, pageSize) {
                    setPageNo(page)
                    setPageSize(pageSize)
                },
                showSizeChanger: true
            }}
        />
    )
}

export default ReleaseManagement
