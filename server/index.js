import express from 'express'
import cookieParser from 'cookie-parser'
import http from 'http'
import mongoose from 'mongoose'
import 'dotenv/config'
import multer from 'multer'
import cors from 'cors'


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// app.use("/api/player", routes)

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
