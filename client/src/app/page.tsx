'use client'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import userApi from "@/api/requests/user.requests";
import Song from "@/components/ui/Song";
import Playlist from "@/components/ui/Playlist";
import MusicPlaingItem from "@/components/ui/MusicPlaingItem";
import { randomNonRepeatingIndex } from "@/utils/utils";
import Statistic from "@/components/ui/Statistic";

export default function Home() {

  const [data, setData] = useState({})
  const [userRating, setUserRating] = useState(null)
  const [currentTrack, setCurrentTrack] = useState<{ mp3: string, cover: string, artist: string, title: string } | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ response: ratingResponse, error: ratingError }, { response: infoResponse, error: infoError }] = await Promise.all([
          userApi.getUserRating(),
          userApi.getUserInformation(),
        ]);

        if (ratingResponse) {
          setUserRating(ratingResponse);
        } else {
          console.log(ratingError);
        }

        if (infoResponse) {
          console.log(infoResponse)
          setData(infoResponse);
        } else {
          console.log(infoError);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch user data.");
      }
    };

    fetchData();
  }, []);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const handlePreviousTrack = () => {
    console.log("Prev Track")
    if (!currentTrack || data?.songs?.length === 0) return

    const currentIndex = data?.songs?.findIndex(song => song.mp3 === currentTrack.mp3 && song.title === currentTrack.title)
    const previosIndex = (currentIndex - 1 + data?.songs?.length) % data?.songs?.length;
    console.log("previos index", previosIndex)
    setCurrentTrack(data?.songs?.[previosIndex])
  }

  const handleNextTrack = () => {
    if (!currentTrack || data?.songs?.length === 0) return
    const currentIndex = data?.songs?.findIndex(song => song.mp3 === currentTrack.mp3 && song.title === currentTrack.title)
    const nextIndex = (currentIndex + 1) % data?.songs?.length;
    console.log("Next index", nextIndex)
    setCurrentTrack(data?.songs?.[nextIndex])
  }

  const handleNextRandomTrack = () => {
    if (!currentTrack || data?.songs?.length === 0) return
    const currentIndex = data?.songs?.findIndex(song => song.mp3 === currentTrack.mp3 && song.title === currentTrack.title)
    const newIndex = randomNonRepeatingIndex(currentIndex, data?.songs?.length)
    console.log("Next random index", newIndex)
    setCurrentTrack(data?.songs?.[newIndex])
  }

  return (
    <div className="rounded-3xl h-[95vh] overflow-auto p-6">

      <Statistic 
      songsLength={data?.songs?.length}
      userRang={userRating}
      playlistLength={data?.playlists?.length}/>

      <div className="flex flex-col relative">
        <div className="mt-20">
          {/** Download music section */}
          <h2 className="text-2xl font-bold absolute mt-[-35px]">Recently downloaded songs</h2>
          <div className="relative max-h-[40vh] overflow-auto ">

            <div className="flex flex-col gap-6 p-6">
              {data?.songs?.map((song, index) => (
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
          nextRandomTrack = {handleNextRandomTrack}/>


        {/** Created playlists */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold">Recently created playlists</h2>
          <div className="flex flex-col gap-6 p-6">
            {data?.playlists?.map((playlist, index) => (
              <Playlist
                key={playlist._id}
                name={playlist.name}
                description={playlist.description}
                songs={playlist.songs}
                id={playlist._id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
