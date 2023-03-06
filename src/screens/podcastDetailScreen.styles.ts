export const styles = {
    container: {
        display: "flex",
        flex: 1,
        padding: 20,
        flexDirection: "row" as const,
        justifyContent: "space-between",
    },
    podcastImageContainer: {

    },
    podcastTitleContainer: {
        fontWeight: "bold" as const,
    },
    podcastTitle: {
        fontSize: 20,
        fontWeight: "bold" as const,
    },
    podcastDescriptionContainer: {
        fontStyle: "italic" as const,
    },
    episodesCountContainer: {
        fontWeight: "bold" as const,
        fontSize: 20,
        padding: 10
    },
    episodesListContainer: {
        marginTop: 20,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
        alignSelf: "center",
    },
    podcastAuthorContainer: {
        fontStyle: "italic" as const,
    },
    descriptionTitle: {
        fontWeight: "bold" as const,
    },
    countAndEpisodesContainer: {
        width: "60%"
    },
    infoCard: {
        padding: 20,
        width: 300,
        minHeight: 400,
    },
    separatingLine: {
        color: "lightgray",
        backgroundColor: "lightgray",
        height: 1,
        borderWidth: 0,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 20
    },

}
