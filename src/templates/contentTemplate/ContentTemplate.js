import styles from "./ContentTemplate.module.scss";

const ContentTemplate = ({ children }) => <div className={styles.wrapper}>{children}</div>;

export default ContentTemplate;
