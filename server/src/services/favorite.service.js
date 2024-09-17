import responseHendlers from "../handlers/response.js";
import favoriteModel from "../models/favorite.model.js";
import userModel from "../models/user.model.js";


class FavoriteService {
    async addToFavorites(request, response) {
        try {
            const { songId } = request.body;
            console.log("add to favorite", songId);
    
            const userId = request.user.id;
            console.log(userId);
    
            let favorite = await favoriteModel.findOne({ user: userId });
            console.log("favorite", favorite);
    
            if (!favorite) {
                favorite = new favoriteModel({
                    user: userId,
                    songs: [songId]
                });
                await favorite.save();
            } else {
                if (favorite.songs.includes(songId)) {
                    return responseHendlers.badRequest(response, 'Ця пісня вже додана до улюблених.');
                }
    
                favorite.songs.addToSet(songId);
                await favorite.save();
            }
    
            await userModel.findByIdAndUpdate(userId, {
                $addToSet: { favorites: favorite._id }
            });
    
            return responseHendlers.created(response, 'Успішно додано пісню до улюблених.');
        } catch (error) {
            console.error("Error adding to favorites:", error);
            responseHendlers.error(response, 'Сталася помилка при додаванні пісні до улюблених.');
        }
    }

    async removeFromFavorites(request, response) {
        try {
            const userId = request.user.id
            const { songId } = request.body

            const favorite = await favoriteModel.findOne({ user: userId })

            console.log("favorite remove", favorite)
            if (favorite) {
                favorite.songs.pull(songId)
                await favorite.save()
                if (favorite.songs.length === 0) {
                    await favoriteModel.deleteOne({ user: userId });
                    await userModel.findByIdAndUpdate(userId, {
                        $pull: { favorites: favorite._id }
                    });
                }
                return responseHendlers.ok(response, favorite)
            } else {
                responseHendlers.notFound(response, 'Не знайдено улюблених')
            }
        } catch (error) {
            responseHendlers.error(response)
        }
    }
    async getAllUserFavoritesSongs(request, response) {
        try {
            const userId = request.user.id;

            const favorite = await favoriteModel.findOne({ user: userId })

            if (favorite) {
                return responseHendlers.ok(response, favorite)
            } else {
                return responseHendlers.notFound(response, 'У користувача немає створених улюблених')
            }
        } catch (error) {
            responseHendlers.error(response)
        }
    }
}

export default new FavoriteService()