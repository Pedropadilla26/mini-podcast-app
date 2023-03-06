import { styles } from "./header.styles"


export const Header = () => {
    return (
        <div>
            <div style={styles.header}>
                Podcaster
            </div>
            <hr style={styles.separatingLine}/>
        </div>
    )
}