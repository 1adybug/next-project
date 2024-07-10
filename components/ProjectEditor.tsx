"use client"

import { Project } from "@utils/queryProject"
import { useAddProject } from "@apis/useAddProject"
import { useGetProject } from "@apis/useGetProject"
import { useUpdateProject } from "@apis/useUpdateProject"
import { Form, Input, InputNumber, message, Modal } from "antd"
import { useForm } from "antd/es/form/Form"
import FormItem from "antd/es/form/FormItem"
import TextArea from "antd/es/input/TextArea"
import { FormLabel } from "deepsea-components"
import { getPostitiveIntParser } from "deepsea-tools"
import { FC, useEffect } from "react"

export type ProjectEditorProps = {
    id?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
    onSuccess?: () => void
}

const ProjectEditor: FC<ProjectEditorProps> = props => {
    const { id, open, onOpenChange, onSuccess } = props
    const [form] = useForm<Project>()
    const { data, loading } = useGetProject(id, open)
    const { runAsync: addProjectAsync, loading: addProjectLoading } = useAddProject()
    const { runAsync: updateProjectAsync, loading: updateProjectLoading, error } = useUpdateProject()

    async function submit(data: Project) {
        if (id) {
            await updateProjectAsync(data)
            message.success("修改成功")
        } else {
            await addProjectAsync(data)
            message.success("新增成功")
        }
        onOpenChange?.(false)
        onSuccess?.()
    }

    useEffect(() => {
        if (!open) return form.resetFields()
        if (data) form.setFieldsValue(data)
    }, [open, data])

    return (
        <Modal title={id ? "修改项目" : "新增项目"} open={open} onCancel={addProjectLoading || updateProjectLoading ? undefined : () => onOpenChange?.(false)} onOk={addProjectLoading || updateProjectLoading ? undefined : () => form.submit()}>
            <Form<Project> form={form} disabled={loading || addProjectLoading || updateProjectLoading} onFinish={submit}>
                <FormItem<Project> name="id" label={<FormLabel width={28}>代号</FormLabel>} required>
                    <Input allowClear autoComplete="off" />
                </FormItem>
                <FormItem<Project> name="name" label={<FormLabel width={28}>名称</FormLabel>} required>
                    <Input allowClear autoComplete="off" />
                </FormItem>
                <FormItem<Project> name="port" label={<FormLabel width={28}>端口</FormLabel>} required>
                    <InputNumber className="!w-full" autoComplete="off" step={1} />
                </FormItem>
                <FormItem<Project> name="core" label={<FormLabel width={28}>核数</FormLabel>} required initialValue={1}>
                    <InputNumber className="!w-full" autoComplete="off" step={1} />
                </FormItem>
                <FormItem<Project>
                    name="description"
                    label={
                        <FormLabel width={28} before>
                            备注
                        </FormLabel>
                    }
                >
                    <TextArea allowClear autoComplete="off" autoSize />
                </FormItem>
            </Form>
        </Modal>
    )
}

export default ProjectEditor
