import { DIR } from "@constants/index"
import { rm } from "fs/promises"
import { join } from "path"

export async function deleteRelease(id: string, version: string) {
    const release = join(DIR, id, "releases", version)
    await rm(release, { recursive: true, force: true })
}
