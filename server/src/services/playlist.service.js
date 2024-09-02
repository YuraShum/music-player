import responseHendlers from "../handlers/response";
import PlaylistModel from "../models/playlist.model";


class PlaylistService {

    async createPlayList(request, response) {
        try {
            const { name, description, songs } = request.body
            const userId = request.user.userId

            const newPlaylist = new PlaylistModel({
                name,
                description,
                songs,
                createdBy: userId
            })

            await newPlaylist.save()
            responseHendlers.created(response, newPlaylist)
        } catch (error) {
            responseHendlers.error(response)
        }
    }

    async getUserPlayLists(request, response) {
        try {
            const userId = request.user.userId
            const playlists = await PlaylistModel.find({ createdBy: userId })
                .populate('song')

            responseHendlers.ok(response, playlists)
        } catch (error) {
            responseHendlers.error(response)
        }
    }

    async addSongToPlaylist(request, response) { 
        try {
            const {playlistId, sonsId} = request.body

            const playlist = await PlaylistModel.findById(playlistId)
            if(!playlist) responseHendlers.notFound(response, 'Плейлист не знайдено.')

            playlist.songs.push(sonsId)

            await playlist.save()
            responseHendlers.ok(response, playlist)

        } catch (error) {
            responseHendlers.error(response)
        }
    }
}

export default new PlaylistService()