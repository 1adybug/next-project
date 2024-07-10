declare namespace Pm2 {
    export interface Task {
        pid: number
        name: string
        pm2_env: Pm2env
        pm_id: number
        monit: Monit
    }

    export interface Monit {
        memory: number
        cpu: number
    }

    export interface Pm2env {
        kill_retry_time: number
        windowsHide: boolean
        username: string
        treekill: boolean
        automation: boolean
        pmx: boolean
        instance_var: string
        watch: boolean
        autorestart: boolean
        vizion: boolean
        merge_logs: boolean
        env: Env
        namespace: string
        filter_env: any[]
        name: string
        node_args: any[]
        pm_exec_path: string
        pm_cwd: string
        exec_interpreter: string
        exec_mode: string
        instances: number
        pm_out_log_path: string
        pm_err_log_path: string
        pm_pid_path: string
        km_link: boolean
        vizion_running: boolean
        NODE_APP_INSTANCE: number
        ALLUSERSPROFILE: string
        ANDROID_HOME: string
        APPDATA: string
        CHROME_CRASHPAD_PIPE_NAME: string
        CommonProgramFiles: string
        "CommonProgramFiles(x86)": string
        CommonProgramW6432: string
        COMPUTERNAME: string
        ComSpec: string
        DriverData: string
        EFC_8596: string
        FPS_BROWSER_APP_PROFILE_STRING: string
        FPS_BROWSER_USER_PROFILE_STRING: string
        GOPATH: string
        HOMEDRIVE: string
        HOMEPATH: string
        JAVA_HOME: string
        LOCALAPPDATA: string
        LOGONSERVER: string
        NUMBER_OF_PROCESSORS: string
        NVM_HOME: string
        NVM_SYMLINK: string
        OneDrive: string
        OneDriveConsumer: string
        ORIGINAL_XDG_CURRENT_DESKTOP: string
        OS: string
        Path: string
        PATHEXT: string
        PM2_USAGE: string
        PROCESSOR_ARCHITECTURE: string
        PROCESSOR_IDENTIFIER: string
        PROCESSOR_LEVEL: string
        PROCESSOR_REVISION: string
        ProgramData: string
        ProgramFiles: string
        "ProgramFiles(x86)": string
        ProgramW6432: string
        PSModulePath: string
        PUBLIC: string
        SESSIONNAME: string
        SystemDrive: string
        SystemRoot: string
        TEMP: string
        TMP: string
        USERDOMAIN: string
        USERDOMAIN_ROAMINGPROFILE: string
        USERNAME: string
        USERPROFILE: string
        VBOX_MSI_INSTALL_PATH: string
        windir: string
        TERM_PROGRAM: string
        TERM_PROGRAM_VERSION: string
        LANG: string
        COLORTERM: string
        GIT_ASKPASS: string
        VSCODE_GIT_ASKPASS_NODE: string
        VSCODE_GIT_ASKPASS_EXTRA_ARGS: string
        VSCODE_GIT_ASKPASS_MAIN: string
        VSCODE_GIT_IPC_HANDLE: string
        VSCODE_INJECTION: string
        PM2_HOME: string
        unique_id: string
        status: string
        pm_uptime: number
        axm_actions: Axmaction[]
        axm_monitor: Axmmonitor
        axm_options: Axmoptions
        axm_dynamic: Moduleconf
        created_at: number
        pm_id: number
        restart_time: number
        unstable_restarts: number
        version: string
        node_version: string
        versioning: Versioning
    }

    export interface Versioning {
        type: string
        url: string
        revision: string
        comment: string
        unstaged: boolean
        branch: string
        remotes: string[]
        remote: string
        branch_exists_on_remote: boolean
        ahead: boolean
        next_rev?: any
        prev_rev: string
        update_time: string
        repo_path: string
    }

    export interface Axmoptions {
        error: boolean
        heapdump: boolean
        "feature.profiler.heapsnapshot": boolean
        "feature.profiler.heapsampling": boolean
        "feature.profiler.cpu_js": boolean
        latency: boolean
        catchExceptions: boolean
        profiling: boolean
        metrics: Metrics
        standalone: boolean
        tracing: Tracing
        module_conf: Moduleconf
        apm: Apm
        module_name: string
        module_version: string
    }

    export interface Apm {
        version: string
        type: string
    }

    export interface Moduleconf {}

    export interface Tracing {
        outbound: boolean
        enabled: boolean
    }

    export interface Metrics {
        http: boolean
        runtime: boolean
        eventLoop: boolean
        network: boolean
        v8: boolean
    }

    export interface Axmmonitor {
        "Used Heap Size": UsedHeapSize
        "Heap Usage": HeapUsage
        "Heap Size": UsedHeapSize
        "Event Loop Latency p95": UsedHeapSize
        "Event Loop Latency": UsedHeapSize
        "Active handles": ActiveHandles
        "Active requests": ActiveHandles
    }

    export interface ActiveHandles {
        value: number
        type: string
        historic: boolean
    }

    export interface HeapUsage {
        value: number
        type: string
        unit: string
        historic: boolean
    }

    export interface UsedHeapSize {
        value: string
        type: string
        unit: string
        historic: boolean
    }

    export interface Axmaction {
        action_name: string
        action_type: string
        arity: number
    }

    export interface Env {
        ALLUSERSPROFILE: string
    }
}