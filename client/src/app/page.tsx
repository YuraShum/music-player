'use client'
import MainLayout from "@/components/layout/MainLayout";
import { store } from "@/redux/app/store";
import { Provider, useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";
import userApi from "@/api/requests/user.requests";
import Song from "@/components/ui/Song";
import Playlist from "@/components/ui/Playlist";

export default function Home() {
  const { user } = useSelector((state: any) => state.user)

  const [data, setData] = useState({})
  const [userRating, setUserRating] = useState(null)

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

  return (
    <div className="rounded-3xl h-full p-6">
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
                {data?.songs?.length}
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
                  <span>{userRating?.rank}</span>
                  <span>/</span>
                  <span>{userRating?.totalUsers}</span>
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
                {data?.playlists?.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {/** Download music section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold">Recently downloaded songs</h2>
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
              />
            ))}
          </div>
        </div>

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
