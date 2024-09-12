import React from 'react'

type Props = {
    songsLength: number,
    userRang: {
        rank: number,
        totalUsers: number
    },
    playlistLength: number

}

const Statistic = ({songsLength, userRang, playlistLength}: Props) => {
    return (
        <>
            <h1 className="text-center text-4xl mt-3">Statistic</h1>
            <div className="flex gap-8 justify-center mt-16">
                <div className="p-[4px] relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-orange-600 rounded-lg" />
                    <div className="bg-transparent rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                        <div className="bg-gray-200 w-fit p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
                            <h2 className="text-xl font-semibold text-orange-600 tracking-wide">
                                Downloaded tracks
                            </h2>
                            <div className="w-40 h-40 bg-orange-400 border-[10px] border-orange-500 rounded-full flex justify-center items-center text-6xl font-bold text-white">
                                {songsLength}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-[4px] relative scale-125">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-600 rounded-lg" />
                    <div className="bg-transparent rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                        <div className="bg-gray-200 w-fit p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
                            <h2 className="text-xl font-semibold text-yellow-600 tracking-wide ">
                                User rating
                            </h2>
                            <div className="w-40 h-40 bg-yellow-400 border-[10px] border-yellow-500 rounded-full flex justify-center items-center text-6xl font-bold text-white">
                                <div className="relative">
                                    <span>{userRang?.rank}</span>
                                    <span>/</span>
                                    <span>{userRang?.totalUsers}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-[4px] relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-cyan-600 rounded-lg" />
                    <div className="bg-transparent rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                        <div className="bg-gray-200 w-fit p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
                            <h2 className="text-xl font-semibold text-cyan-600 tracking-wide">
                                Created playlists
                            </h2>
                            <div className="w-40 h-40 bg-cyan-400 border-[10px] border-cyan-500 rounded-full flex justify-center items-center text-6xl font-bold text-white">
                                {playlistLength}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Statistic