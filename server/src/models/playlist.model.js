import mongoose from "mongoose";

const playlistShema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
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