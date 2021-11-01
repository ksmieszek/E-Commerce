import { Link } from "react-router-dom";
import logoIcon from "assets/icons/logo.svg";
import styles from "./Navigation.module.scss";

const Logo = () => (
  <Link className={styles.logo} to="/">
    <img src={logoIcon} alt="" />
  </Link>
);

export default Logo;
