

import { useEffect, useState } from "react";
import { styles } from "./podcastList.styles";
import { Grid, TextField } from "@mui/material";
import { PodcastCard } from "./podcastCard";
import { PodcastInfo } from "../constants/types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchPodcastsAsync, selectPodcastsList } from "../features/podcasts/podcastsSlice";

type Props = {
    filterText: string
}

export const PodcastList = ({ filterText }: Props) => {

  const podcasts = useAppSelector(selectPodcastsList);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchPodcastsAsync())
  }, [dispatch])

  const podcastsFiltered = podcasts.filter((podcast: PodcastInfo) => {
    return podcast.title.toLowerCase().includes(filterText) || podcast.author.toLowerCase().includes(filterText);
  })

  const podcastsComponents = podcastsFiltered.map((podcast: PodcastInfo) => {
    return (
      <Grid item xs={3} key={podcast.id}>
        <PodcastCard podcastInfo={podcast}/>
      </Grid>
    )
  })

  return (
    <Grid container rowSpacing={20} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={styles.container}>
           {podcastsComponents}
    </Grid>
  );
}
