import { colors } from "../constants/colors";

export const styles = {
    header: {
        color: colors.lightBlue,
        fontSize: 23,
        fontWeight: "bold",
        display: "flex",
        flex: 1,
        justifyContent: "space-between"
    },
    container: {
        flex: 1,
        padding: 50
    },
    separatingLine: {
        color: "lightgray",
        backgroundColor: "lightgray",
        height: 3,
        borderWidth: 0,
        borderRadius: 5
    },
}