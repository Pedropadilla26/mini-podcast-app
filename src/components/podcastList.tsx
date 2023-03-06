

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

const podcastsData: PodcastInfo[] = [
  {
    id: "1",
    title: "The Joe Rogan Experience",
    author: "Joe Rogan",
    image: "https://picsum.photos/200/300",
  },
  {
    id: "2",
    title: "The Joe Rogan 2 Experience",
    author: "Joe Rogan",
    image: "https://picsum.photos/200/300",
  },
  {
    id: "3",
    title: "The Mcdonalds Experience",
    author: "Joe Rogan",
    image: "https://picsum.photos/200/300",
  },
  {
    id: "4",
    title: "The Joe Rogan 3 Experience",
    author: "Joe Rogan",
    image: "https://picsum.photos/200/300",
  },
  {
    id: "5",
    title: "The Joe Rogan 4 Experience",
    author: "Joe Rogan",
    image: "https://picsum.photos/200/300",
  },
]

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
