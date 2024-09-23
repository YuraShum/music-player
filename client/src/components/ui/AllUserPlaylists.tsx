import React from 'react'
import Playlist from './Playlist'

type Props = {
    playlists: any[]
}

const AllUserPlaylists = ({playlists}: Props) => {
    return (
        <div className='flex flex-col gap-8 mt-10'>
            {playlists.map(playlist => (
                <Playlist
                key={playlist._id}
                    name={playlist.name}
                    songs={playlist.songs}
                    description={playlist.description}
                    id={playlist._id}
                />
            ))}
        </div>
    )
}

export default AllUserPlaylists