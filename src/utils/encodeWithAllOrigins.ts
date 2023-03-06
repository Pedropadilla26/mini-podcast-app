
export const encodeWithAllOrigins = (url: string, baseUrl = "https://itunes.apple.com") => {
    return `https://cors-anywhere.herokuapp.com/${baseUrl + url}`;
}