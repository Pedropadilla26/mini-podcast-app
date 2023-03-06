// Fetches the top 100 podcasts from the iTunes API
export const fetchPodcasts = async (limit = 100) => {
  const data = await fetch(`https://itunes.apple.com/us/rss/toppodcasts/limit=${limit}/genre=1310/json`).then((res) => res.json())
  const mappedData = data.feed.entry.map((podcast: any) => {
    return {
      id: podcast.id.attributes['im:id'],
      title: podcast['im:name'].label,
      image: podcast['im:image'][2].label,
      author: podcast['im:artist'].label,
    }})
  return {
    data: mappedData
  }
}
