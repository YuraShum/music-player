'use client';
import { FaRegUser } from "react-icons/fa";
import { SiMixpanel } from "react-icons/si";
import { FaBackwardStep } from "react-icons/fa6";
import { FaPlayCircle } from "react-icons/fa";
import { FaForwardStep } from "react-icons/fa6";
import { TiArrowLoop } from "react-icons/ti";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaCirclePause } from "react-icons/fa6";
import configURL from '../../const/config.ts'
import { CiVolumeHigh } from "react-icons/ci";
import { CiVolumeMute } from "react-icons/ci";
import { formatTime } from "@/utils/utils.ts";
import useCyclicalPlayback from "@/hooks/useCyclicalPlayback.ts";
import useRandomTrackPlayback from "@/hooks/useRandomTrackPlayback.ts";
import { SongType } from "@/types/types.ts";

type Props = {
    currentTrack: SongType| null,
    isPlaying: boolean,
    onPlay: () => void,
    onPause: () => void,
    nextTrack: () => void,
    previousTrack: () => void,
    nextRandomTrack: () => void
}
interface FixationParam {
    loop: boolean,
    random: boolean
}

const MusicPlaingItem = ({ currentTrack, isPlaying, onPlay, onPause, nextTrack, previousTrack, nextRandomTrack }: Props) => {

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [musicVolume, setMusicVolume] = useState(0.5)
    const [isMuteMode, setIsMuteMode] = useState<boolean>(false)
    const [duration, setDuration] = useState<number | null>(null)
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [fixation, setFixation] = useState<FixationParam>({
        loop: false,
        random: false
    })
    const audioSrc = currentTrack ? `${configURL.BASE_URL}/${currentTrack.mp3}` : '';

    useCyclicalPlayback(audioRef, onPlay, fixation.loop)
    useRandomTrackPlayback({ audioRef, nextRandomTrack, randomeMode: fixation.random })

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

    const handleFixationLoop = () => {
        setFixation(prevValue => {
            return {
                random: false,
                loop: !prevValue.loop
            }
        })
    }

    const handleFixationRandom = () => {
        setFixation(prevValue => {
            return {
                random: !prevValue.random,
                loop: false
            }
        })
    }

    const handleProgressChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newTime = Number(event.target.value)
        if (audioRef.current) {
            audioRef.current.currentTime = newTime
            setCurrentTime(newTime)
        }
    }

    return (
        <div >
            {currentTrack && (
                <div className="flex justify-between items-center bg-gradient-to-t from-primary to-hovered p-3 rounded-lg text-white relative">
                    <div className="flex items-center gap-6 w-full max-w-[300px]">
                        <div>
                            {currentTrack.cover ? (
                                <img src={`${configURL.BASE_URL}/${currentTrack.cover}`} alt={currentTrack.title} className="w-16 h-16 rounded-xl" />
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
                            <button
                                onClick={handleFixationRandom}>
                                <SiMixpanel
                                    className="w-4 h-4 cursor-pointer"
                                    style={{ color: `${fixation.random ? "#e28743" : 'white'}` }} />
                            </button>
                            <button
                                onClick={previousTrack}>
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
                                <TiArrowLoop className={`w-6 h-6 cursor-pointer`} style={{ color: `${fixation.loop ? "#e28743" : 'white'}` }}
                                    onClick={handleFixationLoop} />
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* Music timeline line can be added here */}
                            <span className="text-sm opacity-60">{formatTime(currentTime)}</span>
                            <div className="relative w-[30vw]">
                                <input
                                    type="range"
                                    min={0}
                                    max={duration || 0}
                                    step={0.02}
                                    value={currentTime}
                                    onChange={handleProgressChange}
                                    className="w-full  h-1 bg-transparent cursor-pointer accent-white" />
                                <div>
                                </div>
                            </div>
                            <span className="text-sm opacity-60">{formatTime(duration || 0)}</span>
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
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setMusicVolume(Number(e.target.value))} />
                    </div>
                    <audio src={audioSrc} preload="auto" ref={audioRef} className="w-full h-6"></audio>
                </div>
            )}
        </div>
    );
}

export default MusicPlaingItem;
