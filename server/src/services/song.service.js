import responseHendlers from "../handlers/response.js";
import songModel from "../models/song.model.js";
import userModel from "../models/user.model.js";


class SongService {

    async addSong(request, response) {
        try {
            const { title, artist } = request.body;
            const userId = request.user.id;
            let song = await songModel.findOne({ title, artist });

            if (song) {

                if (!song.uploadedBy.includes(userId)) {
                    song.uploadedBy.push(userId);
                    await song.save();

                    await userModel.findByIdAndUpdate(userId, {
                        $push: { songs: song._id }
                    });
                }
            } else {

                if (!request.files || !request.files.mp3) {
                    return responseHendlers.badRequest(response, 'Необхідно завантажити файл пісні mp3.');
                }

                const mp3Path = request.files.mp3[0].path;
                const coverPath = request.files.cover ? request.files.cover[0].path : '';

                song = new songModel({
                    title,
                    artist,
                    mp3: mp3Path,
                    cover: coverPath,
                    uploadedBy: [userId]
                });

                await song.save();
            }

            await userModel.findByIdAndUpdate(userId, {
                $addToSet: { songs: song._id }
            });

            responseHendlers.created(response, song);

        } catch (error) {
            console.error(error);
            responseHendlers.error(response);
        }
    }

    async getUserSongs(request, response) {
        try {
            const userId = request.user.id
            const songs = await songModel.find({ uploadedBy: userId })
            responseHendlers.ok(response, songs)
        } catch (error) {
            responseHendlers.error(response)
        }
    }

    async getSongsInformation(request, response) {
        try {
            const {songsId} = request.query
            const userId = request.user.id;
    
            if (!Array.isArray(songsId) || songsId.length === 0) {
                return responseHendlers.badRequest(response, 'Некоректний масив ідентифікаторів пісень.');
            }
    
            const songs = await songModel.find({
                _id: { $in: songsId },
                uploadedBy: userId
            });
    
            responseHendlers.ok(response, songs);
        } catch (error) {
            console.error(error);
            responseHendlers.error(response);
        }
    }

    async deleteSong(request, response) {
        
        try {
            const { songId } = request.body
            const userId = request.user.id

            const song = await songModel.findOne(
                {
                    _id: songId,
                    uploadedBy: userId
                }
            )
            if (!song) {
                return responseHendlers.notFound(response, "Пісня не знайдена або не належить користувачу.")

            }

            if (song.uploadedBy.length === 1) {
                await song.deleteOne()

                await userModel.updateOne(
                    { _id: userId },
                    { $pull: { songs: songId } }
                );
                responseHendlers.ok(response, { message: 'Пісня успішно видалена.' })
            }
            else {
                await songModel.updateOne(
                    { _id: songId },
                    { $pull: { uploadedBy: userId } }
                );
                await userModel.updateOne(
                    { _id: userId },
                    { $pull: { songs: songId } }
                );
                responseHendlers.ok(response, { message: 'Користувач успішно видалений з пісні.' });
            }
        } catch (error) {
            responseHendlers.error(response)
        }
    }
}

export default new SongService()