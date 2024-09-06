import { DeleteSongParams, SongParams } from "@/interfaces/apiInterfaces"
import songEndpointsConfig from "../endpoints/cong/config"
import privateUser from "../user/private"





const songApi = {
    addSong: async ({title, artist}: SongParams) => {
        try {
            const response = await privateUser.post(
                songEndpointsConfig.addSong,
                {title, artist}
            )
            return {response}
        } catch (error) {
            return {error}
        }
    },
    getUserSongs: async () => {
        try {
            const response = await privateUser.get(
                songEndpointsConfig.getUserSong
            )
            return {response}
        } catch (error) {
            return {error}
        }
    },
    deleteSong: async ({songId}: DeleteSongParams) => {
        try {
            const response = await privateUser.delete(
                songEndpointsConfig.deleteSong,
                {
                    data: {songId}
                }
            )
            return {response}
        } catch (error) {
            return {error}
        }
    }
}

export default songApi