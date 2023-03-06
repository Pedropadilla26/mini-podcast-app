
export type PodcastInfo = {
    id: string;
    title: string;
    image: string;
    author: string;
    description: string
}

export type PodcastInfoDetailed = {
    id: string;
    artistId: string;
    artistName: string;
    collectionId: string;
    collectionName: string;
    trackId: string;
    trackName: string;
    fetchedAt: Date;
}

export type PodcastEpisode = {
    id: string;
    title: string;
    description: string;
    duration: number;
    episodeUrl: string;
    releaseDate: Date;
}

export type PodcastEpisodesList = {
    podcastId: string;
    episodes: PodcastEpisode[];
    fetchedAt: Date;
}

export type DataHandler<T> = {
    data: T;
}