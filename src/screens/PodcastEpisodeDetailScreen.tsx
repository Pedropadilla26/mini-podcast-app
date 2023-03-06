import { useEffect } from "react";
import { styles } from "./podcastEpisodeDetailScreen.styles";
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchEpisodesAsync, fetchPodcastAsync, selectPodcastDetailed, selectPodcastEpisode, selectPodcastEpisodes } from "../features/podcasts/podcastsSlice";
import { Card } from "@mui/material";
import { PodcastInfoCard } from "../components/podcastInfoCard";
import ReactAudioPlayer from 'react-audio-player';

export const PodcastEpisodeDetailScreen = () => {
  const { podcastId, episodeId } = useParams();
  const podcast = useAppSelector(selectPodcastDetailed(podcastId ?? ""))
  const episode = useAppSelector(selectPodcastEpisode(podcastId ?? "", episodeId ?? ""))
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if (podcastId) {
      dispatch(fetchPodcastAsync(podcastId))
      if (episodeId) {
        dispatch(fetchEpisodesAsync(episodeId))
      }
    }
  }, [])

  return (
    <div style={styles.container}>
      <PodcastInfoCard podcastInfo={podcast}/>
      <div style={styles.detailsContainer}>
        <Card style={styles.cardDetails}>
          <div style={styles.titleContainer}>
            {episode?.title}
          </div>
          <div style={styles.descriptionContainer}>
            {episode?.description}
          </div>
          <ReactAudioPlayer
            src={episode?.episodeUrl}
            autoPlay={false}
            controls
            style={styles.audioPlayer}
          />
        </Card>
       </div>
    </div>
  );
}
