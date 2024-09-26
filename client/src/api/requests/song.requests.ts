import { DeleteSongParams} from "@/interfaces/apiInterfaces"
import songEndpointsConfig from "../endpoints/song/config"
import privateUser from "../user/private"
import { SongType } from "@/types/types"





const songApi = {
    addSong: async (formData: FormData) => {
        try {
            const response = await privateUser.post(
                songEndpointsConfig.addSong,
                formData
            )
            return { response }
        } catch (error) {
            return { error }
        }
    },
    getUserSongs: async (): Promise<{ response: SongType[] } | { error: any }> => {
        try {
            const response = await privateUser.get(
                songEndpointsConfig.getUserSong
            )

            const userSong: SongType[] = response.map((song: any) => ({
                _id: song._id,
                title: song.title,
                artist: song.artist,
                mp3: song.mp3,
                cover: song.cover
            }))
            return { response: userSong }
        } catch (error) {
            return { error }
        }
    },
    getSongsInformation: async (songsId: string[]): Promise<{ response: SongType[] } | { error: any }> => {
        try {
            const response = await privateUser.get(
                songEndpointsConfig.getSongsInfromation,
                {
                    params: { songsId }
                }
            );

            // Extract only the relevant properties
            const songs: SongType[] = response.map((song: any) => ({
                _id: song._id,
                title: song.title,
                artist: song.artist,
                mp3: song.mp3,
                cover: song.cover
            }));

            return { response: songs };
        } catch (error) {
            return { error };
        }
    },

    deleteSong: async ({ songId }: DeleteSongParams) => {
        try {
            const response = await privateUser.delete(
                songEndpointsConfig.deleteSong,
                {
                    data: { songId }
                }
            )
            return { response }
        } catch (error) {
            return { error }
        }
    }
}

export default songApi