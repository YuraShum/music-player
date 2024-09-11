import express from 'express'
import cookieParser from 'cookie-parser'
import http from 'http'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'
import routes from './src/routes/main.routes.js'
import path from 'path'
import { fileURLToPath } from 'url'; 


const app = express()

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/api/player", routes)
app.use('/api/player/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 5020

const server = http.createServer(app)


mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        server.listen(port, () => {
            console.log(`Server is listening on port: ${port}`)
        })
    })
    .catch((error) => {
        console.log({ error })
        process.exit(1)
    })
