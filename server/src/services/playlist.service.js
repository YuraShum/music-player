import responseHendlers from "../handlers/response.js";
import playlistModel from "../models/playlist.model.js";
import songModel from "../models/song.model.js";
import userModel from "../models/user.model.js";


class PlaylistService {

    async createPlayList(request, response) {
        try {
            const { name, description, songs } = request.body
            const userId = request.user.id

            const newPlaylist = new playlistModel({
                name,
                description,
                songs,
                createdBy: userId
            })

            await newPlaylist.save()

            await userModel.findByIdAndUpdate(userId, {
                $push: { playlists: newPlaylist._id }
            });
            responseHendlers.created(response, newPlaylist)
        } catch (error) {
            responseHendlers.error(response)
        }
    }

    async getUserPlayLists(request, response) {
        try {
            const userId = request.user.id
            const playlists = await playlistModel.find({ createdBy: userId })

            responseHendlers.ok(response, playlists)
        } catch (error) {
            responseHendlers.error(response)
        }
    }

    async addSongToPlaylist(request, response) {
        try {
            const { playlistId, songIds } = request.body;
            const userId = request.user.id;
            const playlist = await playlistModel.findOne({ _id: playlistId, createdBy: userId });

            if (!playlist) {
                return responseHendlers.notFound(response, 'Плейлист не знайдено.');
            }
            const songsToAdd = Array.isArray(songIds) ? songIds : [songIds];

            const foundSongs = await songModel.find({
                _id: { $in: songsToAdd },
                uploadedBy: userId
            });

            if (foundSongs.length !== songsToAdd.length) {
                return responseHendlers.notFound(response, 'Деякі з пісень не знайдено або вони не завантажені вами.');
            }
            const newSongs = songsToAdd.filter(songId => !playlist.songs.includes(songId));
            if (newSongs.length === 0) {
                return responseHendlers.badRequest(response, 'Усі пісні вже додані до плейлиста.');
            }

            playlist.songs.push(...newSongs);
            await playlist.save();

            responseHendlers.ok(response, playlist)
        } catch (error) {
            console.log(error)
            responseHendlers.error(response)
        }
    }


    async deletePlaylist(request, response) {
        try {
            const { playlistId } = request.body
            const userId = request.user.id

            const playlist = await playlistModel.findOne(
                {
                    _id: playlistId,
                    createdBy: userId
                }
            )

            if (!playlist) {
                return responseHendlers.notFound(response, "Плейлист не знайдено або він неналежить користувачу.")
            }

            await playlist.deleteOne()

            await userModel.updateOne(
                { _id: userId },
                { $pull: { playlists: playlistId } }
            );

            responseHendlers.ok(response, 'Успішно видалено плейлист')

        } catch (error) {
            responseHendlers.error(response)
        }
    }


    async deleteSongFromPlaylist(request, response) {
        try {
            const { playlistId, songId } = request.body
            const userId = request.user.id

            const playlist = await playlistModel.findOne(
                {
                    _id: playlistId,
                    createdBy: userId
                }
            )
            if (!playlist) {
                return responseHendlers.notFound(response, "Плейлиста незнайдено або не налнжить користувачу")

            }

            playlist.songs = playlist.songs.filter(id => id.toString() !== songId.toString())
            await playlist.save()

            responseHendlers.ok(response, 'Пісня успішно видалена із плейлиста')

        } catch (error) {
            responseHendlers.error(response)
        }
    }

}

export default new PlaylistService()