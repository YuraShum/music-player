import { RefObject, useEffect } from "react"

interface RandomTrackParams{
    audioRef: RefObject<HTMLAudioElement>,
    nextRandomTrack: () => void,
    randomeMode: boolean
}
const useRandomTrackPlayback = ({audioRef, nextRandomTrack, randomeMode}:RandomTrackParams) => {
    useEffect(() => {
        const audioElement= audioRef.current

        if(audioElement && randomeMode){
            const handleTrackEnd = () => {
                nextRandomTrack()
            }
            audioElement.addEventListener('ended', handleTrackEnd)

            return () =>{
                audioElement.removeEventListener('ended', handleTrackEnd)
            }
        }
    }, [audioRef, nextRandomTrack, randomeMode])

}

export default useRandomTrackPlayback