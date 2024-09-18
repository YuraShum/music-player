
import { FavoriteParams } from "@/interfaces/apiInterfaces"
import privateUser from "../user/private"


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
    getAllUserFavoritesSongs: async () => {
        try {
            const response = await privateUser.get(
                favoriteEndpointsConfig.getAllUserFavoritesSongs
            )
            return { response }
        } catch (error) {
            return { error }
        }
    },
    isSongIsFavorites: async ({songId}: FavoriteParams) => {
        try {
            const response = await privateUser.get(
                favoriteEndpointsConfig.isSongIsFavorites,
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

export default favoriteApi