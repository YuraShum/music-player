import React from 'react'
import Playlist from './Playlist'

type Props = {
    playlists: any[],
    handlePlaylist: () => void

}

const AllUserPlaylists = ({ playlists, handlePlaylist }: Props) => {
    return (
        <div className='flex flex-col gap-8 mt-10'>
            {playlists.map(playlist => (
                <Playlist
                    handlePlaylist={handlePlaylist}
                    key={playlist._id}
                    name={playlist.name}
                    songsId={playlist.songs}
                    description={playlist.description}
                    id={playlist._id}
                />
            ))}
        </div>
    )
}

export default AllUserPlaylists