"use client"

import { PlusCircleOutlined } from "@ant-design/icons"
import { useDeleteProject } from "@apis/useDeleteProject"
import { useDeleteTask } from "@apis/useDeleteTask"
import { useQueryProject } from "@apis/useQueryProject"
import { useStartTask } from "@apis/useStartTask"
import { useUploadProject } from "@apis/useUploadProject"
import ProjectEditor from "@components/ProjectEditor"
import { Status } from "@constants/index"
import { formatDate } from "@utils/formatDate"
import { ProjectWithStatus, QueryProjectData } from "@utils/queryProject"
import { Button, ConfigProvider, Form, message, Popconfirm, Table } from "antd"
import { useForm } from "antd/es/form/Form"
import FormItem from "antd/es/form/FormItem"
import { InputFile } from "deepsea-components"
import { getEnumKey, getPostitiveIntParser, showTotal } from "deepsea-tools"
import Link from "next/link"
import { FC, useRef, useState } from "react"
import { useQueryState } from "soda-next"
import { Columns } from "soda-type"
import colors from "tailwindcss/colors"
import EnvEditor from "./EnvEditor"
import ReleaseManagement from "./ReleaseManagement"

const ProjectManagement: FC = () => {
    const [query, setQuery] = useQueryState({
        keys: [],
        parse: {
            pageNo: getPostitiveIntParser(1),
            pageSize: getPostitiveIntParser(10)
        }
    })
    const { pageNo, pageSize } = query
    const [form] = useForm<QueryProjectData>()
    const { data, loading, refresh } = useQueryProject(query)
    const { runAsync: deleteProjectAsync, loading: deleteProjectLoading } = useDeleteProject()
    const { runAsync: uploadProjectAsync, loading: uploadProjectLoading } = useUploadProject()
    const { runAsync: startTaskAsync, loading: startTaskLoading } = useStartTask()
    const { runAsync: deleteTaskAsync, loading: deleteTaskLoading } = useDeleteTask()
    const [editId, setEditId] = useState<string | undefined>(undefined)
    const [openEditor, setOpenEditor] = useState(false)
    const [openEnvEditor, setOpenEnvEditor] = useState(false)
    const refreshReleaseRef = useRef<Record<string, (() => void) | null>>({})

    const operationLoading = deleteProjectLoading || uploadProjectLoading || startTaskLoading || deleteTaskLoading

    const columns: Columns<ProjectWithStatus> = [
        {
            title: "序号",
            align: "center",
            key: "index",
            render(value, record, index) {
                return index + 1 + (pageNo - 1) * pageSize
            }
        },
        {
            title: "项目",
            align: "center",
            dataIndex: "id",
            render(value, record, index) {
                return (
                    <Link href={`${location.protocol}//${location.hostname}:${record.port}`} target="_blank">
                        {value}
                    </Link>
                )
            }
        },
        {
            title: "名称",
            align: "center",
            dataIndex: "name"
        },
        {
            title: "端口",
            align: "center",
            dataIndex: "port"
        },
        {
            title: "核数",
            align: "center",
            dataIndex: "core"
        },
        {
            title: "创建时间",
            align: "center",
            dataIndex: "createdAt",
            render: formatDate
        },
        {
            title: "更新时间",
            align: "center",
            dataIndex: "updatedAt",
            render: formatDate
        },
        {
            title: "状态",
            align: "center",
            dataIndex: "status",
            render(value, record, index) {
                return getEnumKey(Status, value)
            }
        },
        {
            title: "备注",
            align: "center",
            dataIndex: "description"
        },
        {
            title: "操作",
            align: "center",
            key: "index",
            dataIndex: "id",
            render(value, record, index) {
                return (
                    <div className="flex justify-center gap-2">
                        <ConfigProvider theme={{ token: { colorPrimary: colors.orange[500] } }}>
                            <InputFile data-input-file className="hidden" accept=".zip,.7z" type="file" onChange={({ file }) => uploadProject(value, file)} clearAfterChange />
                            <Button loading={operationLoading} type="primary" onClick={e => (e.currentTarget.parentElement?.querySelector("[data-input-file]") as HTMLInputElement)?.click()}>
                                上传
                            </Button>
                        </ConfigProvider>

                        <Button loading={operationLoading} type="primary" onClick={() => updateProject(value)}>
                            编辑
                        </Button>

                        <ConfigProvider theme={{ token: { colorPrimary: colors.green[500] } }}>
                            <Button loading={operationLoading} type="primary" onClick={() => startTask(value)}>
                                {record.status === Status.未启动 ? "启动" : "重启"}
                            </Button>
                        </ConfigProvider>

                        <ConfigProvider theme={{ token: { colorPrimary: colors.red[700] } }}>
                            <Button loading={operationLoading} disabled={record.status === Status.未启动} type="primary" onClick={() => deleteTask(value)}>
                                停止
                            </Button>
                        </ConfigProvider>

                        <Button loading={operationLoading} onClick={() => updateProjectEnv(value)}>
                            ENV
                        </Button>

                        <Popconfirm title="确认删除" onConfirm={() => deleteProject(value)}>
                            <Button type="primary" loading={operationLoading} danger>
                                删除
                            </Button>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ]

    async function addProject() {
        setEditId(undefined)
        setOpenEditor(true)
    }

    async function deleteProject(id: string) {
        await deleteProjectAsync(id)
        message.success("删除成功")
        refresh()
    }

    async function startTask(id: string) {
        await startTaskAsync(id)
        message.success("启动成功")
        refresh()
    }

    async function deleteTask(id: string) {
        await deleteTaskAsync(id)
        message.success("停止成功")
        refresh()
    }

    async function uploadProject(id: string, file: File) {
        const data = new FormData()
        data.set("id", id)
        data.set("file", file)
        await uploadProjectAsync(data)
        message.success("上传成功")
        refresh()
        refreshReleaseRef.current[id]?.()
    }

    async function updateProject(id: string) {
        setEditId(id)
        setOpenEditor(true)
    }

    async function updateProjectEnv(id: string) {
        setEditId(id)
        setOpenEnvEditor(true)
    }

    async function queryProject(data: QueryProjectData) {
        const { pageNo, pageSize, ...rest } = data
        setQuery(query => ({ ...query, ...rest }))
    }

    return (
        <div className="flex flex-col gap-8 p-8">
            <div className="flex justify-between">
                <ProjectEditor id={editId} open={openEditor} onOpenChange={setOpenEditor} onSuccess={refresh} />
                <EnvEditor id={editId} open={openEnvEditor} onOpenChange={setOpenEnvEditor} />
                <Form<QueryProjectData> form={form} disabled={loading} layout="inline" onFinish={queryProject}>
                    <FormItem<QueryProjectData>>
                        <Button type="primary" htmlType="submit">
                            搜索
                        </Button>
                    </FormItem>
                    <FormItem<QueryProjectData>>
                        <Button htmlType="reset" onClick={() => setQuery({})}>
                            重置
                        </Button>
                    </FormItem>
                </Form>
                <div className="flex flex-none gap-4">
                    <Button type="primary" icon={<PlusCircleOutlined />} onClick={addProject}>
                        新增
                    </Button>
                </div>
            </div>
            <Table<ProjectWithStatus>
                loading={loading}
                dataSource={data?.list}
                columns={columns}
                rowKey="id"
                expandable={{
                    expandedRowRender(record, index, indent, expanded) {
                        return (
                            <ReleaseManagement
                                id={record.id}
                                open={expanded}
                                refreshRef={fn => {
                                    refreshReleaseRef.current[record.id] = fn
                                }}
                            />
                        )
                    }
                }}
                pagination={{
                    current: pageNo,
                    pageSize,
                    total: data?.total,
                    showTotal,
                    onChange(pageNo, pageSize) {
                        setQuery(query => ({ ...query, pageNo, pageSize }))
                    }
                }}
            />
        </div>
    )
}

export default ProjectManagement
