import { colors } from "../constants/colors";

export const styles = {

    container: {
        display: "flex",
        borderWidth: 0,
        borderRadius: 5,
        shadowOffset: { width: 0, height:0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        flexDirection: "column" as const,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        padding: 20,
    },
    author: {
        fontSize: 15,
        color: colors.darkGray,
    },
    title: {
        fontSize: 17,
        color: colors.black,
    },
    image: {
        width: 130,
        height: 130,
        borderRadius: 130,
        borderWidth: 0,
    }
}