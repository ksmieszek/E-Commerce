import styles from "./CloseButton.module.scss";

const CloseButton = ({ hideOnWide, ...rest }) => <button className={`${styles.closeButton} ${hideOnWide ? styles.hide : ""}`} {...rest}></button>;

export default CloseButton;
