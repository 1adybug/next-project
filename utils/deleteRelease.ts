import { rm } from "fs/promises"
import { join } from "path"

export async function deleteRelease(id: string, version: string) {
    const release = join("projects", id, "releases", version)
    await rm(release, { recursive: true, force: true })
}
