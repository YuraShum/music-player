'use client'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from "react";
import userApi from "@/api/requests/user.requests";
import Song from "@/components/ui/Song";
import Playlist from "@/components/ui/Playlist";
import MusicPlaingItem from "@/components/ui/MusicPlaingItem";
import { randomNonRepeatingIndex } from "@/utils/utils";
import Statistic from "@/components/ui/Statistic";
import { UserInformation, UserRaiting } from '@/interfaces/apiInterfaces';
import { SongType } from '@/types/types';

export default function Home() {

  const [data, setData] = useState<UserInformation | null>(null)
  const [userRating, setUserRating] = useState<UserRaiting | null>(null)
  const [currentTrack, setCurrentTrack] = useState<SongType | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const getUserInfo = async () => {
    try {
      const [resultRating, resultInfo] = await Promise.all([
        userApi.getUserRating(),
        userApi.getUserInformation(),
      ]);

      if ('response' in resultRating) {
        setUserRating(resultRating.response);
      } else if ('error' in resultRating) {
        console.log(resultRating.error);
      }

      if ('response' in resultInfo) {
        setData(resultInfo.response);
      } else if ('error' in resultInfo) {
        console.log(resultInfo.error);
      }
    } catch (err) {
      console.error('Помилка при отриманні інформації про користувача:', err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handlePlay = () => setIsPlaying(true);

  const handlePause = () => setIsPlaying(false);

  const handlePreviousTrack = () => {
    if (data) {
      if (!currentTrack || data.songs.length === 0) return

      const currentIndex = data.songs.findIndex(song => song.mp3 === currentTrack.mp3 && song.title === currentTrack.title)
      const previosIndex = (currentIndex - 1 + data.songs.length) % data.songs.length;
      setCurrentTrack(data.songs[previosIndex])
    }
  }

  const handleNextTrack = () => {
    if (data) {
      if (!currentTrack || data.songs.length === 0) return
      const currentIndex = data.songs.findIndex(song => song.mp3 === currentTrack.mp3 && song.title === currentTrack.title)
      const nextIndex = (currentIndex + 1) % data.songs.length;
      setCurrentTrack(data.songs[nextIndex])
    }
  }

  const handleNextRandomTrack = () => {
    if (data) {
      if (!currentTrack || data.songs.length === 0) return
      const currentIndex = data.songs.findIndex(song => song.mp3 === currentTrack.mp3 && song.title === currentTrack.title)
      const newIndex = randomNonRepeatingIndex(currentIndex, data.songs.length)
      setCurrentTrack(data.songs?.[newIndex])
    }
  }

  const handleUserInfo = () => {
    getUserInfo()
  }

  return (
    <div className="rounded-3xl h-[95vh] overflow-auto p-6">
      <Statistic
        songsLength={data ? data.songs.length : 0}
        userRang={userRating}
        playlistLength={data ? data.playlists.length : 0} />
      <div className="flex flex-col relative ">
        <div className="mt-20">
          {/** Download music section */}
          <h2 className="text-2xl font-bold absolute mt-[-45px] ">Recently downloaded songs</h2>
          <div className="relative max-h-[40vh] overflow-auto border-2 rounded-t-lg border-b-0">
            <div className="flex flex-col">
              {data && data.songs.map((song, index) => (
                <Song
                  key={song._id}
                  title={song.title}
                  artist={song.artist}
                  mp3={song.mp3}
                  cover={song.cover}
                  index={index}
                  id={song._id}
                  onPlay={() => setCurrentTrack(song)}
                  currentTrack={currentTrack}
                  isPlaying={isPlaying}
                  deletedSong={handleUserInfo}
                />
              ))}
            </div>
          </div>
        </div>
        <MusicPlaingItem
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlay={handlePlay}
          onPause={handlePause}
          previousTrack={handlePreviousTrack}
          nextTrack={handleNextTrack}
          nextRandomTrack={handleNextRandomTrack} />
        {/** Created playlists */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Recently created playlists</h2>
          <div className="flex flex-col gap-6">
            {data && data.playlists.map((playlist) => (
              <Playlist
                key={playlist._id}
                name={playlist.name}
                description={playlist.description}
                songsId={playlist.songs}
                id={playlist._id}
                handlePlaylist={handleUserInfo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
