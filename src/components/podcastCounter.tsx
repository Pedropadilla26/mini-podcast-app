

import { styles } from "./podcastCounter.styles";

type Props = {
}

export const PodcastCounter = ({  }: Props) => {
    const podcastNumber = 100
  return (
    <div style={styles.container}>
        {podcastNumber}
    </div>
  );
}
