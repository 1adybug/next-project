export function nanoid() {
    return Math.random().toString(36).slice(2, 8).padEnd(8, "0")
}