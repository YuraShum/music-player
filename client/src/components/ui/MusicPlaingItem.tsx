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
    currentTrack: { mp3: string, cover: string, artist: string, title: string } | null,
    isPlaying: boolean,
    onPlay: () => void,
    onPause: () => void
}

const MusicPlaingItem = ({ currentTrack, isPlaying, onPlay, onPause }: Props) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);


    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play()
                .then(() => onPlay())
                .catch((error) => console.error('Error playing track:', error));
        }
    };

    const pauseAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            onPause();
        }
    };

    const audioSrc = currentTrack ? `${configURL.BASE_URL}/${encodeURI(currentTrack.mp3)}` : '';

    console.log(audioSrc)
    return (
        <div className="flex justify-between items-center">
            {currentTrack && (
                <>
                    <div className="flex items-center gap-6">
                        <div>
                            {currentTrack.cover ? (
                                <img src={currentTrack.cover} alt={currentTrack.title} className="w-16 h-16 rounded-xl" />
                            ) : (
                                <FaRegUser style={{ color: '#363558', backgroundColor: '#E0E0E0' }} className="w-16 h-16 bg-gray-200 rounded-xl" />
                            )}
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-lg font-bold">{currentTrack.title}</h2>
                            <p className="text-gray-400 text-sm">{currentTrack.artist}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex gap-6 items-center">
                            <button>
                                <SiMixpanel className="w-4 h-4 cursor-pointer" />
                            </button>
                            <button >
                                <FaBackwardStep className="w-6 h-6 cursor-pointer" />
                            </button>
                            {isPlaying ? (
                                <button onClick={pauseAudio}>
                                    <FaCirclePause className="w-6 h-6 scale-150 cursor-pointer" />
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
                        <div>
                            {/* Music timeline line can be added here */}
                        </div>
                    </div>
                    <audio src={audioSrc} preload="auto" ref={audioRef}></audio>
                </>
            )}
        </div>
    );
}

export default MusicPlaingItem;
