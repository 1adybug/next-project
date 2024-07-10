export function getEnvStr(env: Record<string, string>) {
    const entries = Object.entries(env as Record<string, string>)
    if (entries.length === 0) return ""
    return ` ${Object.entries(env as Record<string, string>)
        .map(([key, value]) => `${key}=${value}`)
        .join(" ")}`
}
