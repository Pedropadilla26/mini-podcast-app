

import { useState } from "react";
import { styles } from "./podcastCard.styles";
import { Card, CardActionArea, TextField } from "@mui/material";
import { PodcastInfo } from "../constants/types";

type Props = {
    podcastInfo: PodcastInfo
}

export const PodcastCard = ({ podcastInfo }: Props) => {

    const handleOnClick = () => {
        console.log("clicked on podcast")
    }
  return (
    <Card onClick={handleOnClick}>
        <CardActionArea style={styles.container}>
        <img style={styles.image} src={podcastInfo.image} alt={`${podcastInfo.title} image`}/>
        <div style={styles.title}>
            {podcastInfo.title}
        </div>
        <div style={styles.author}>
            {`Author: ${podcastInfo.author}`}
        </div>
        </CardActionArea>
    </Card  >
  );
}
