
export const encodeWithAllOrigins = (url: string, baseUrl = "https://itunes.apple.com") => {
    return `https://api.allorigins.win/get?url=${baseUrl + url}`;
}