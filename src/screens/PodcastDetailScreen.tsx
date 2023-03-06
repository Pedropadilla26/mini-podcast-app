import { useEffect } from "react";
import { styles } from "./podcastDetailScreen.styles";
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchEpisodesAsync, fetchPodcastAsync, fetchPodcastsAsync, selectPodcastDetailed, selectPodcastEpisodes } from "../features/podcasts/podcastsSlice";
import { Card } from "@mui/material";
import { PodcastInfoCard } from "../components/podcastInfoCard";
import { EpisodesList } from "../components/episodesList";

export const PodcastDetailScreen = () => {
  const { id } = useParams();
  const podcast = useAppSelector(selectPodcastDetailed(id ?? ""))
  const episodes = useAppSelector(selectPodcastEpisodes(id ?? ""))
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if (id) {
      dispatch(fetchPodcastAsync(id))
      dispatch(fetchEpisodesAsync(id))
    }
  }, [])

  return (
    <div style={styles.container}>
     <PodcastInfoCard podcastInfo={podcast}/>
      <div style={styles.countAndEpisodesContainer}>
        <Card>
          <div style={styles.episodesCountContainer}>
            {`Episodes: ${episodes?.length}`}
          </div>
        </Card>
        <div style={styles.episodesListContainer}>
          {episodes && <EpisodesList episodes={episodes} podcastId={id ?? ''} />}
        </div>
      </div>
       
    </div>
  );
}
