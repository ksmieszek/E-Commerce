import { Link } from "react-router-dom";
import CloseButton from "components/closeButton/CloseButton";
import styles from "./Navigation.module.scss";

const MobileElements = ({ children, link }) => (
  <div className={styles.header}>
    <div className={styles.header__back}></div>
    {link ? (
      <Link className={styles.header__title} to={link}>
        {children}
      </Link>
    ) : (
      <div className={styles.header__title}>{children}</div>
    )}
    <CloseButton data-header-close />
  </div>
);

export default MobileElements;
