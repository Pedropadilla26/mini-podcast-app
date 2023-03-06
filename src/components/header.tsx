import { CircularProgress } from "@mui/material"
import { useAppSelector } from "../app/hooks"
import { selectPodcastApiStatus } from "../features/podcasts/podcastsSlice"
import { styles } from "./header.styles"

export const Header = (router: any) => {
    const loadingAPI = useAppSelector(selectPodcastApiStatus())

    const loading = loadingAPI == "loading"

    return (
        <div>
            <div style={styles.header}>
                Podcaster
                {loading && <CircularProgress size={30}/>}
            </div>
            {/*<Link  to="/" replace={true} />*/}
            <hr style={styles.separatingLine}/>
        </div>
    )
}