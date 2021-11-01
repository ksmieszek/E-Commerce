import { Link } from "react-router-dom";
import heartIcon from "assets/icons/heart.svg";
import userIcon from "assets/icons/user.svg";
import cartIcon from "assets/icons/shopping-bag.svg";
import styles from "./Navigation.module.scss";

const UserMenu = () => (
  <div className={styles.userMenu}>
    <Link className={styles.userMenu__icon} to="/">
      <img src={heartIcon} alt="" />
    </Link>
    <Link className={styles.userMenu__icon} to="/">
      <img src={userIcon} alt="" />
    </Link>
    <Link className={styles.userMenu__icon} to="/">
      <img src={cartIcon} alt="" />
    </Link>
  </div>
);

export default UserMenu;
