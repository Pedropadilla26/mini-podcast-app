
import { styles } from "./podcastInfoCard.styles";
import { Card } from "@mui/material";
import { PodcastInfo, PodcastInfoDetailed } from "../constants/types";

interface Props {
    podcastInfo: PodcastInfoDetailed
}

export const PodcastInfoCard = ({ podcastInfo }: Props) => {
    return (
        <Card>
            <div style={styles.infoCard}>
                <div style={styles.podcastImageContainer}>
                    <img style={styles.image} src={podcastInfo?.image} alt={`${podcastInfo?.title} image`}/>
                </div>
                <hr style={styles.separatingLine}/>
                <div style={styles.podcastTitleContainer}>
                    {podcastInfo?.title}
                </div>
                <div style={styles.podcastAuthorContainer}>
                    {`by ${podcastInfo?.author}`}
                </div>
                <hr style={styles.separatingLine}/>
                    <p style={styles.descriptionTitle}>
                    Description:
                    </p>
                <div style={styles.podcastDescriptionContainer}>
                    {podcastInfo?.description}
                </div>
            </div>
      </Card>
    )
}
    