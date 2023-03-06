import { DataHandler, PodcastEpisodesList, PodcastInfo, PodcastInfoDetailed } from "../../constants/types"
import { encodeWithAllOrigins } from "../../utils/encodeWithAllOrigins"

// Fetches the top 100 podcasts from the iTunes API
export const fetchPodcasts = async (limit = 100): Promise<DataHandler<PodcastInfo[]>> => {
  const data = await fetch(`https://itunes.apple.com/us/rss/toppodcasts/limit=${limit}/genre=1310/json`).then((res) => res.json())
  const mappedData = data.feed.entry.map((podcast: any) => {
    return {
      id: podcast.id.attributes['im:id'],
      title: podcast['im:name'].label,
      image: podcast['im:image'][2].label,
      author: podcast['im:artist'].label,
      description: podcast.summary.label,
    }})
  return {
    data: mappedData
  }
}

export const fetchPodcast = async (id: string): Promise<DataHandler<PodcastInfoDetailed>> => {
  const data = await fetch(encodeWithAllOrigins(`/lookup?id=${id}`))
                .then((data) => data.json())
  const mappedObject = {
    id,
    collectionName: data.results[0].collectionName,
    artistName: data.results[0].artistName,
    artistId: data.results[0].artistId,
    collectionId: data.results[0].collectionId,
    trackId: data.results[0].trackId,
    trackName: data.results[0].trackName,
    fetchedAt: new Date().toLocaleString(),
  }
  return {
    data: mappedObject
  }
}

export const fetchEpisodes = async (podcastId: string): Promise<DataHandler<PodcastEpisodesList>> => {
  console.log("che ", encodeWithAllOrigins(`/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=500`))
  const data = await fetch(encodeWithAllOrigins(`/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=500`))
                .then((res) => res.json())
  const mappedData = data.results.map((episode: any) => {
    if (episode.wrapperType === 'track') { // Filter out the podcast info
      return null
    }
    return {
      id: episode.trackId,
      title: episode.trackName,
      description: episode.description,
      duration: episode.trackTimeMillis,
      episodeUrl: episode.trackViewUrl,
      releaseDate: new Date(episode.releaseDate),
    }})
    console.log(mappedData)
  return {
    data: {
      podcastId,
      episodes: mappedData.filter((ep: PodcastEpisodesList) => ep),
      fetchedAt: new Date().toLocaleString(),
    }
  }
}