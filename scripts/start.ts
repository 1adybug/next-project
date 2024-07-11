import { config } from "dotenv"
import { join } from "path"
import { execAsync } from "soda-nodejs"

config()

async function main() {
    const { NEXT_PROJECT_NAME, NEXT_PROJECT_NAMESPACE, PORT } = process.env
    try {
        await execAsync(`pm2 delete ${NEXT_PROJECT_NAME}`)
    } catch (error) {}
    await execAsync(`pm2 start ${join("scripts", "startNext.js")} --name ${NEXT_PROJECT_NAME} --namespace ${NEXT_PROJECT_NAMESPACE} -i 1`, {
        env: {
            NODE_ENV: "production",
            PORT
        }
    })
}

main()
