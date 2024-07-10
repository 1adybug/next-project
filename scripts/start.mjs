// @ts-check
import { config } from "dotenv"
import { execAsync } from "soda-nodejs"

config()

async function main() {
    const { NEXT_PROJECT_NAME, NEXT_PROJECT_NAMESPACE } = process.env
    try {
        await execAsync(`pm2 delete ${NEXT_PROJECT_NAME}`)
    } catch (error) {}
    await execAsync(`pm2 start scripts/startProject.mjs --name ${NEXT_PROJECT_NAME} --namespace ${NEXT_PROJECT_NAMESPACE} -i 1`)
}

main()
