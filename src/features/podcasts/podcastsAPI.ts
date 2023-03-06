import { DataHandler, PodcastEpisodesList, PodcastInfo, PodcastInfoDetailed } from "../../constants/types"
import { FetchEpisodesArgs } from "./podcastsSlice"

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
  const data = await fetch(`https://
  itunes.apple.com/lookup?id=${id}`).then((res) => res.json())
  const mappedData = data.results[0].map((podcast: any) => {
    return {
      artistId: podcast.artistId,
      artistName: podcast.artistName,
      collectionId: podcast.collectionId,
      collectionName: podcast.collectionName,
      trackId: podcast.trackId,
      trackName: podcast.trackName,
      fetchedAt: new Date(),
      podcastId: id
    }})
  return {
    data: mappedData
  }
}

export const fetchEpisodes = async ({podcastId, collectionId}: FetchEpisodesArgs): Promise<DataHandler<PodcastEpisodesList>> => {
  const data = await fetch(`https://itunes.apple.com/lookup?id=${collectionId}media=podcast&entity=podcastEpisode&limit=100`).then((res) => res.json())
  const mappedData = data.results.map((episode: any) => {
    if (episode.wrapperType === 'track') { // Filter out the podcast info
      return 
    }
    return {
      id: episode.trackId,
      title: episode.trackName,
      description: episode.description,
      duration: episode.trackTimeMillis,
      episodeUrl: episode.trackViewUrl,
      releaseDate: new Date(episode.releaseDate),
    }})
  return {
    data: {
      podcastId: collectionId,
      episodes: mappedData,
      fetchedAt: new Date(),
    }
  }
}