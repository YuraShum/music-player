
import { FavoriteInfo, FavoriteParams } from "@/interfaces/apiInterfaces"
import privateUser from "../user/private"
import favoriteEndpointsConfig from "../endpoints/favorite/config"


const favoriteApi = {
    addToFavorites: async ({ songId }: FavoriteParams) => {
        try {
            const response = await privateUser.post(
                favoriteEndpointsConfig.addToFavorites,
                { songId }
            )
            return { response }
        } catch (error) {
            return { error }
        }
    },
    removeFromFavorites: async ({ songId }: FavoriteParams) => {
        try {
            const response = await privateUser.delete(
                favoriteEndpointsConfig.removeFromFavorites,
                {
                    data: {
                        songId
                    }
                }
            )
            return { response }
        } catch (error) {
            return { error }
        }
    },
    getAllUserFavoritesSongs: async (): Promise<{ response: string[] } | { error: any }> => {
        try {
            const response = await privateUser.get(
                favoriteEndpointsConfig.getAllUserFavoritesSongs
            )

            const songsId: string[] = response.songs;
            return { response: songsId };
        } catch (error) {
            return { error }
        }
    },
    isSongIsFavorites: async ({songId}: FavoriteParams):  Promise<{ response: FavoriteInfo}|{error: any }>  => {
        
        try {
            const response = await privateUser.get(
                favoriteEndpointsConfig.isSongIsFavorites(songId),
                {
                    params: {songId}
                }
            )
            return { response } as unknown as FavoriteInfo
        } catch (error) {
            return {error}
        }
    }
}

export default favoriteApi