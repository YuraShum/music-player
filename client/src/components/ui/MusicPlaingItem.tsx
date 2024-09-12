'use client';

import { FaRegUser } from "react-icons/fa";
import { SiMixpanel } from "react-icons/si";
import { FaBackwardStep } from "react-icons/fa6";
import { FaPlayCircle } from "react-icons/fa";
import { FaForwardStep } from "react-icons/fa6";
import { TiArrowLoop } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";
import { FaCirclePause } from "react-icons/fa6";
import configURL from '../../const/config.ts'
import { CiVolumeHigh } from "react-icons/ci";
import { CiVolumeMute } from "react-icons/ci";
import { formatTime } from "@/utils/utils.ts";
import useCyclicalPlayback from "@/hooks/useCyclicalPlayback.ts";


type Props = {
    currentTrack: { mp3: string, cover: string, artist: string, title: string } | null,
    isPlaying: boolean,
    onPlay: () => void,
    onPause: () => void,
    nextTrack: () => void,
    previousTrack: () => void
}

const MusicPlaingItem = ({ currentTrack, isPlaying, onPlay, onPause, nextTrack, previousTrack }: Props) => {

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [musicVolume, setMusicVolume] = useState(0.5)
    const [isMuteMode, setIsMuteMode] = useState(false)
    //!! Спробувати оптимізувати 
    const [duration, setDuration] = useState<number | null>(null)
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [fixation, setFixation] = useState(false)

    useCyclicalPlayback(audioRef, onPlay, fixation)

    const handleFixation = () => {
        setFixation(prevValue => !prevValue)
    }

    console.log('Previos hand', previousTrack)


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


    useEffect(() => {
        const handleError = () => {
            console.error("Пісню не вдалося відтворити")
        }
        const audioElement = audioRef.current

        if (audioElement) {
            audioElement.addEventListener('error', handleError)
            return () => {
                audioElement.removeEventListener('error', handleError)
            }
        }
    }, [])

    useEffect(() => {
        if (currentTrack && audioRef.current) {
            audioRef.current.currentTime = 0
            playAudio()
        }
    }, [currentTrack])

    useEffect(() => {
        if (currentTrack && audioRef.current) {
            audioRef.current.volume = musicVolume

        }
    }, [musicVolume])

    useEffect(() => {
        if (audioRef.current) {

            const handleLoadedMetadata = () => {
                if (audioRef.current) {
                    setDuration(audioRef.current.duration)
                }
            }

            const handleTimeUpdate = () => {
                if (audioRef.current) {
                    setCurrentTime(audioRef.current.currentTime)
                }
            }

            audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
            audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

            return () => {
                if (audioRef.current) {
                    audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
                    audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                }
            };

        }
    }, [currentTrack])


    const handleMuteMode = () => {
        setIsMuteMode(true)
        setMusicVolume(0)
    }
    const handleLoudMode = () => {
        setIsMuteMode(false)
        setMusicVolume(0.5)
    }

    const handlePrevTrack = () => {
        console.log('prev')
        previousTrack()
    }

    

    const audioSrc = currentTrack ? `${configURL.BASE_URL}/${currentTrack.mp3}` : '';
    const progresWidthPercent = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div >
            {currentTrack && (

                <div className="flex justify-between items-center bg-gradient-to-t from-primary to-hovered p-3 rounded-lg text-white relative">
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
                    {/** !! Переглянути абсолютне позиціювання щоб точно по центру розміщувався блок*/}
                    <div className="flex flex-col items-center gap-3 justify-center">
                        <div className="flex gap-6 items-center">
                            <button>
                                <SiMixpanel className="w-4 h-4 cursor-pointer" />
                            </button>
                            <button
                                onClick={handlePrevTrack}>
                                <FaBackwardStep
                                    className="w-6 h-6 cursor-pointer" />
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
                            <button 
                            onClick={nextTrack}>
                                <FaForwardStep className="w-6 h-6 cursor-pointer" />
                            </button>
                            <button>
                                <TiArrowLoop className={`w-6 h-6 cursor-pointer`} style={{ color: `${fixation ? "#e28743" : 'white'}` }}
                                    onClick={handleFixation} />
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* Music timeline line can be added here */}
                            <span className="text-sm opacity-60">{formatTime(currentTime)}</span>
                            <div className="relative">
                                <div className="h-1 bg-white w-[30vw] opacity-50 rounded-md"></div>
                                <div className="h-1 bg-white rounded-md absolute top-0"
                                    style={{ width: `${progresWidthPercent}%`, maxWidth: '30vw' }}></div>
                            </div>

                            <span className="text-sm opacity-60">{formatTime(duration)}</span>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center justify-center">

                        {isMuteMode ?
                            <CiVolumeMute
                                className="w-6 h-6 cursor-pointer"
                                onClick={handleLoudMode}
                            /> :
                            <CiVolumeHigh
                                className="w-6 h-6 cursor-pointer"
                                onClick={handleMuteMode} />
                        }
                        <input
                            className="accent-white w-[50%] h-[5px] cursor-pointer"
                            type="range"
                            name="volume"
                            value={musicVolume}
                            min={0}
                            max={1}
                            step={0.02}
                            onChange={(e) => setMusicVolume(e.target.value)} />
                    </div>
                    <audio src={audioSrc} preload="auto" ref={audioRef} className="w-full h-6"></audio>
                </div>
            )}
        </div>
    );
}

export default MusicPlaingItem;
