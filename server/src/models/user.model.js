import mongoose from "mongoose";
import crypto from 'crypto'

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false

    },
    salt: {
        type: String,
        required: true,
        select: false

    },
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song'
        }
    ],
    playlists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Playlist'
        }
    ],
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Favorites'
        }
    ]
}, { timestamps: true })


userShema.methods.setPassword = function (password) {
    // Генерування випадкового рядка
    this.salt = crypto.randomBytes(16).toString("hex")
    // Хешування паролю
    this.password = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        "sha512"
    ).toString("hex")
}
userShema.methods.validPassword = function (password) {
    // Хешування введеного парол
    const hash = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        "sha512"
    ).toString("hex")

    // Порівняння хеша введеного паролю з збереженим хешем
    return this.password === hash
}

const userModel = mongoose.model("User", userShema)

export default userModel