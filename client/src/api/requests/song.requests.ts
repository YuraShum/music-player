import { DeleteSongParams, GetSongsInformationParams, SongParams } from "@/interfaces/apiInterfaces"
import songEndpointsConfig from "../endpoints/song/config"
import privateUser from "../user/private"





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
    getUserSongs: async () => {
        try {
            const response = await privateUser.get(
                songEndpointsConfig.getUserSong
            )
            return { response }
        } catch (error) {
            return { error }
        }
    },
    getSongsInformation: async ( songsId : GetSongsInformationParams) => {
        console.log("songsId", songsId);

        try {
            const response = await privateUser.get(
                songEndpointsConfig.getSongsInfromation,
                {
                    data: {songsId}
                }
            );
            return { response };
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