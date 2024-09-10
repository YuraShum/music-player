'use client';

import { FaRegUser } from "react-icons/fa";
import { SiMixpanel } from "react-icons/si";
import { FaBackwardStep } from "react-icons/fa6";
import { FaPlayCircle } from "react-icons/fa";
import { FaForwardStep } from "react-icons/fa6";
import { TiArrowLoop } from "react-icons/ti";
import { useRef, useState } from "react";
import { FaCirclePause } from "react-icons/fa6";
import configURL from '../../const/config.ts'

type Props = {
    mp3: string,
    cover: string,
    artist: string,
    title: string
}

const MusicPlaingItem = ({ mp3, cover, artist, title }: Props) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playAudio = () => {
        console.log()
        if (audioRef.current) {
            audioRef.current.play()
                .then(() => {
                    setIsPlaying(true);
                })
                .catch((error) => {
                    console.error('Помилка під час відтворення треку:', error);
                });
        }
    };

    const pauseAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const audioSrc = `${configURL.BASE_URL}/${encodeURI(mp3)}`
    console.log(audioSrc)
    return (
        <div className="flex justify-between items-center">
            {/* Music info section */}
            <div className="flex items-center gap-6">
                <div>
                    {cover ? (
                        <img src={cover} alt={title} className="w-16 h-16 rounded-xl" />
                    ) : (
                        <FaRegUser style={{ color: '#363558', backgroundColor: '#E0E0E0' }} className="w-16 h-16 bg-gray-200 rounded-xl" />
                    )}
                </div>
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <p className="text-gray-400 text-sm">{artist}</p>
                </div>
            </div>
            {/* Player section */}
            <div className="flex flex-col items-center gap-2">
                {/* Button group */}
                <div className="flex gap-6 items-center">
                    <button>
                        <SiMixpanel className="w-4 h-4 cursor-pointer" />
                    </button>
                    <button >
                        <FaBackwardStep className="w-6 h-6 cursor-pointer" />
                    </button>
                    {isPlaying ? (
                        <button onClick={pauseAudio}>
                            <FaCirclePause  className="w-6 h-6 scale-150 cursor-pointer" />
                        </button>
                    ) : (
                        <button onClick={playAudio}>
                            <FaPlayCircle className="w-6 h-6 scale-150 cursor-pointer" />
                        </button>
                    )}
                    <button >
                        <FaForwardStep className="w-6 h-6 cursor-pointer" />
                    </button>
                    <button>
                        <TiArrowLoop className="w-6 h-6 cursor-pointer" />
                    </button>
                </div>
                {/* Timeline of music */}
                <div>
                    {/* Music timeline line can be added here */}
                </div>
            </div>
            {/* Volume control */}
            <div>
                {/* Volume control can be implemented here */}
            </div>
            <audio src={audioSrc} preload="auto" ref={audioRef}></audio>
        </div>
    );
}

export default MusicPlaingItem;
