import { AddSongsToPlaylistParams, CreatePlaylistParams, DeletePlaylistParams, PlaylistSongActionParams } from "@/interfaces/apiInterfaces"
import playlistEndpointsConfig from "../endpoints/playlist/config"
import privateUser from "../user/private"
import { PlaylistType } from "@/types/types"



const playlistApi = {
    createPlayList: async ({ name, description, songs }: CreatePlaylistParams) => {
        try {
            const response = await privateUser.post(
                playlistEndpointsConfig.createPlayList,
                { name, description, songs }
            )
            return { response }
        } catch (error) {
            return { error }
        }
    },
    getUserPlayLists: async (): Promise<{ response: PlaylistType[] } | { error: any }> => {
        try {
            const response = await privateUser.get(
                playlistEndpointsConfig.getUserPlayLists
            )

            const userPlaylists: PlaylistType[] = response.map((playlist: PlaylistType) => ({
                _id: playlist._id,
                name: playlist.name,
                description: playlist.description,
                songs: playlist.songs
            }))

return { response: userPlaylists }
        } catch (error) {
    return { error }
}
    },
addSongsToPlaylist: async ({ playlistId, songIds }: AddSongsToPlaylistParams) => {
    try {
        const response = await privateUser.post(
            playlistEndpointsConfig.addSongsToPlaylist,
            { playlistId, songIds }
        )
        return { response }
    } catch (error) {
        return { error }
    }
},
    deletePlaylist: async ({ playlistId }: DeletePlaylistParams) => {
        try {
            const response = await privateUser.delete(
                playlistEndpointsConfig.deletePlaylist,
                {
                    data: { playlistId }
                })
            return { response }
        } catch (error) {
            return { error }
        }
    },
        deleteSongFromPlaylist: async ({ playlistId, songId }: PlaylistSongActionParams) => {
            try {
                const response = await privateUser.delete(
                    playlistEndpointsConfig.deleteSongFromPlaylist,
                    {
                        data: {
                            playlistId,
                            songId
                        }
                    }
                )
                return { response }
            } catch (error) {
                return { error }
            }
        }
}

export default playlistApi