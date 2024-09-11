import { RefObject, useEffect } from "react";

const useCyclicalPlayback = (
    audioRef: RefObject<HTMLAudioElement>,
    onPlay: () => void,
    fixation: boolean
) => {
    useEffect(() => {
        const handleEnded = () => {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().then(onPlay).catch((error) => console.error('Error playing track:', error));
            }
        };

        // Додаємо обробник подій тільки якщо fixation активний
        if (fixation && audioRef.current) {
            audioRef.current.addEventListener('ended', handleEnded);
        }

        // Очищення обробника подій
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('ended', handleEnded);
            }
        };
    }, [fixation, audioRef, onPlay]);
};

export default useCyclicalPlayback;
