import responseHendlers from "../handlers/response";
import songModel from "../models/song.model";


class SongServices {

    async addSong(request, response) {
        try {
            const { title, artist } = request.body

            const userId = request.user.id

            if (!request.files || !request.files.mp3) {
                return responseHendlers.badRequest(response, `Необхідно завантажити файл пісні mp3.`)

            }
            const mp3Path = request.files.mp3[0].path
            const coverPath = request.files.cover ? request.files.cover[0].path : ''



            const newSong = new songModel({
                title,
                artist,
                mp3: mp3Path,
                cover: coverPath,
                uploadedBy: userId
            })

            await newSong.save()
            responseHendlers.created(response, newSong)

        } catch (error) {
            responseHendlers.error(response)
        }
    }

    async getUserSongs(request, response){
        try {
            const userId = request.user.id
            const songs = songModel.find({uploadedBy: userId})
            responseHendlers.created(response, songs)
        } catch (error) {
            responseHendlers.error(response)
        }
    }
}

export default new SongServices()