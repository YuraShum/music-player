export function getHexColorByText(text: string) {
    let hash = 0;

    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).slice(-2);
    }

    return color;
}

export function formatTime(time: number): string {
    const timeInSeconds = Math.floor(time);
    const seconds = timeInSeconds % 60
    const minute = Math.floor(time / 60)
    return `${minute}:${10 > seconds ? `0${seconds}` : seconds}`

}


export function randomNonRepeatingIndex(currentIndex: number, dataLength: number): number {
    const newIndex = Math.floor(Math.random() * dataLength)
    if (newIndex === currentIndex) {
        return randomNonRepeatingIndex(currentIndex, dataLength)
    } else {
        return newIndex
    }
}