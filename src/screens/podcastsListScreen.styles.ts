import { colors } from "../constants/colors";

export const styles = {
    container: {
        display: "flex",
        flex: 1,
        padding: 20,
        flexDirection: "column" as const,
    },
    searchBarAndCounterContainer: {
        display: "flex",
        flexDirection: "row" as const,
        alignSelf: "flex-end",
        justifyContent: "space-between",
        alignItems: "center",
    },
    podcastsListContainer: {
        flex: 1,
        flexDirection: "row" as const,
        selfAlign: "flex-end",
        marginTop: 60
    },
    searchBar: {
        marginLeft: 20,
        width: 300
    }

}