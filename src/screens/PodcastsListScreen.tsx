import { useState } from "react";
import { styles } from "./podcastsListScreen.styles";
import { TextField } from "@mui/material";
import { PodcastList } from "../components/podcastList"
import { PodcastCounter } from "../components/podcastCounter";

export const PodcastListScreen = () => {
    const [filterText, setFilterText] = useState("");
    let filterHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
      //convert input text to lower case
      var lowerCase = e.target.value.toLowerCase();
      setFilterText(lowerCase);
    };
  return (
    <div style={styles.container}>
        <div style={styles.searchBarAndCounterContainer}>
            <PodcastCounter/>
            <TextField
            id="outlined-basic"
            onChange={filterHandle}
            variant="outlined"
            label="Filter podcasts..."
            style={styles.searchBar}
            />
        </div>
        <div style={styles.podcastsListContainer}>
            <PodcastList filterText={filterText.toLowerCase()}/>
        </div>
    </div>
  );
}
