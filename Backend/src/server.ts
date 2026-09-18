import dotenv from 'dotenv'
import app from './app'
import createDatabase from './config/database'

dotenv.config()

const PORT = process.env.PORT || 5009


const startServer = async (): Promise<void> => {
    await createDatabase()
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port http://localhost:${PORT}/api/health`);
    })
}

startServer()