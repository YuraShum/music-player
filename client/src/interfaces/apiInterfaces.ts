import { PlaylistType, SongType } from "@/types/types"

export interface SongParams {
    title: string,
    artist: string
}
export interface DeleteSongParams {
    songId: string
}

export interface CreatePlaylistParams {
    name: string,
    description: string,
    songs: string[]
}

export interface PlaylistSongActionParams {
    playlistId: string,
    songId: string
}

export interface DeletePlaylistParams {
    playlistId: string,
}

export interface UserSignInParams {
    username: string,
    password: string
}

export interface UserSignUpParams {
    username: string,
    password: string,
    confirmPassword: string
}

export interface GetSongsInformationParams {
    songsId: string[];
}

export interface updateUserPasswordParams {
    password: string,
    newPassword: string,
    confirmNewPassword: string
}

export interface UpdateUserNameParams {
    newUserName: string
}

export interface FavoriteParams {
    songId: string
}

export interface AddSongsToPlaylistParams{
    playlistId: string,
    songIds: string[]
}

export interface UserRaiting{
    rank: number,
    totalUsers: number
} 

export interface UserInformation{
    playlists: PlaylistType[],
    songs: SongType[],
    username: string
}

export interface FavoriteInfo {
    isFavorite: boolean
}