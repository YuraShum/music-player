import mongoose from "mongoose";

const songShema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    artist: {
        type: String,
        require: true
    },
    mp3: {
        type: String,
        required: true 
    },
    cover: {
        type: String,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }

})

const songModel = mongoose.model('Song', songShema)

export default songModel