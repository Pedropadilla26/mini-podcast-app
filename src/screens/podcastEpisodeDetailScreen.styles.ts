export const styles = {
    container: {
        display: "flex",
        flex: 1,
        padding: 20,
        flexDirection: "row" as const,
        justifyContent: "space-between",
    },
    cardDetails: {
        padding: 20,
    },
    detailsContainer: {
        marginLeft: 40,
        width: "70%",
    },
    titleContainer: {
        fontWeight: "bold" as const,
        fontSize: 20,
        marginTop: 20
    },
    descriptionContainer: {
        fontStyle: "italic" as const,
        marginTop: 20,
    },
    audioPlayer: {
        width: "100%",
        marginTop: 60,
        borderRadius: 10
    }

}