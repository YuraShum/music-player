import mongoose from "mongoose";

const favoriteShema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    songs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song'
        }
    ]
}, { timestamps: true })

const favoriteModel = mongoose.model('Favorites', favoriteShema)

export default favoriteModel