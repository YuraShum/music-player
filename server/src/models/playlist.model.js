import mongoose from "mongoose";

const playlistShema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const playlistModel = mongoose.model('Playlist', playlistShema)

export default playlistModel