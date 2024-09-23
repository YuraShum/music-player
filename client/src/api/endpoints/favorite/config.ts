const favoriteEndpointsConfig = {
    addToFavorites: 'favorite',
    removeFromFavorites: 'favorite',
    getAllUserFavoritesSongs: 'favorite',
    isSongIsFavorites: (songId:string) => `check-favorites/${songId}`
}

export default favoriteEndpointsConfig