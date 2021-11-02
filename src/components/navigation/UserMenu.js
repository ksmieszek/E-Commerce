import { Link } from "react-router-dom";
import heartIcon from "assets/icons/heart.svg";
import userIcon from "assets/icons/user.svg";
import cartIcon from "assets/icons/shopping-bag.svg";
import { useAuth } from "hooks/useAuth";
import { useCart } from "hooks/useCart";
import styles from "./Navigation.module.scss";
import Button from "components/button/Button";

const UserMenu = () => {
  const { uid, SignIn, SignOut } = useAuth();
  const { userCart } = useCart();

  return (
    <div className={styles.userMenu}>
      <Link className={styles.userMenu__icon} to="/404">
        <img src={heartIcon} alt="" />
      </Link>
      <div
        className={styles.userMenu__icon}
        onClick={(e) => {
          e.currentTarget.classList.toggle(styles.active);
        }}
      >
        <img src={userIcon} alt="" />
        <div className={styles.dropdown}>
          {uid === undefined ? (
            <Button onClick={SignIn} wide>
              Sign In
            </Button>
          ) : (
            <Button onClick={SignOut} wide>
              Logout
            </Button>
          )}
        </div>
      </div>
      <Link className={`${styles.userMenu__icon} ${styles.cart}`} to="/order">
        <img src={cartIcon} alt="" />
        {userCart.length > 0 && <div className={styles.counter}>{userCart.length}</div>}
      </Link>
    </div>
  );
};

export default UserMenu;
