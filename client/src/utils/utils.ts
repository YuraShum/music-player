export function getRandomHexColor() {

    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
}

export function formatTime(time: number): string{
    const timeInSeconds = Math.floor(time);
    const seconds = timeInSeconds % 60
    const minute = Math.floor(time/60)
    return `${minute}:${10> seconds ? `0${seconds}`: seconds}`

}
