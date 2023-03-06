import { styles } from "./header.styles"

export const Header = () => {
    return (
        <div>
            <div style={styles.header}>
                Podcaster
            </div>
            {/*<Link  to="/" replace={true} />*/}
            <hr style={styles.separatingLine}/>
        </div>
    )
}