import { useGetProject } from "@apis/useGetProject"
import { useUpdateProject } from "@apis/useUpdateProject"
import { EnvItem } from "@utils/getProjectEnv"
import { nanoid } from "@utils/nanoid"
import { Button, Input, message, Modal } from "antd"
import { FC } from "react"
import { useInputState } from "soda-hooks"

export type EnvEditorProps = {
    id?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
    onSuccess?: () => void
}

export type EnvStateItem = EnvItem & {
    id: string
}

function getEnv(env: EnvStateItem[]) {
    if (env.length > 0) return env
    return [{ id: nanoid(), key: "", value: "" }]
}

const EnvEditor: FC<EnvEditorProps> = props => {
    const { id, open, onOpenChange, onSuccess } = props
    const { data, loading } = useGetProject(id, open)
    const [env, setEnv] = useInputState<EnvStateItem[]>(() => getEnv(Object.entries(data?.env || {})?.map(([key, value]) => ({ key, value, id: nanoid() })) || []), [data])
    const { runAsync: updateProjectAsync, loading: updateProjectLoading } = useUpdateProject()

    async function submit() {
        if (!id) return
        await updateProjectAsync({ id, env: env.filter(({ key, value }) => !!key.trim() && !!value.trim()).reduce((acc, { key, value }) => ({ ...acc, [key.trim()]: value.trim() }), {}) })
        message.success("修改成功")
        onOpenChange?.(false)
        onSuccess?.()
    }

    return (
        <Modal title={id ? "修改环境变量" : "新增环境变量"} open={open} onCancel={updateProjectLoading ? undefined : () => onOpenChange?.(false)} onOk={updateProjectLoading ? undefined : submit}>
            <div className="flex flex-col gap-4">
                {env.map(({ id, key, value }, index) => (
                    <div key={id} className="flex gap-2">
                        <Input disabled={loading} allowClear autoComplete="off" value={key} onChange={e => setEnv(env => env.with(index, { ...env[index], key: e.target.value }))} />
                        <Input disabled={loading} allowClear autoComplete="off" value={value} onChange={e => setEnv(env => env.with(index, { ...env[index], value: e.target.value }))} />
                        <Button disabled={loading} type="primary" onClick={() => setEnv(env => env.toSpliced(index + 1, 0, { id: nanoid(), key: "", value: "" }))}>
                            新增
                        </Button>
                        <Button disabled={loading} type="primary" danger onClick={() => setEnv(env => getEnv(env.toSpliced(index, 1)))}>
                            删除
                        </Button>
                    </div>
                ))}
            </div>
        </Modal>
    )
}

export default EnvEditor
