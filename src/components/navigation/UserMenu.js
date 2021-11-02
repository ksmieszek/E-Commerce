import { Link } from "react-router-dom";
import heartIcon from "assets/icons/heart.svg";
import userIcon from "assets/icons/user.svg";
import cartIcon from "assets/icons/shopping-bag.svg";
import styles from "./Navigation.module.scss";
import { useCart } from "hooks/useCart";

const UserMenu = () => {
  const { userCart } = useCart();
  return (
    <div className={styles.userMenu}>
      <Link className={styles.userMenu__icon} to="/404">
        <img src={heartIcon} alt="" />
      </Link>
      <Link className={styles.userMenu__icon} to="/404">
        <img src={userIcon} alt="" />
      </Link>
      <Link className={`${styles.userMenu__icon} ${styles.cart}`} to="/order">
        <img src={cartIcon} alt="" />
        {userCart.length > 0 && <div className={styles.counter}>{userCart.length}</div>}
      </Link>
    </div>
  );
};

export default UserMenu;
