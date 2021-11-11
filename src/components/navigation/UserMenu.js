import { Link } from "react-router-dom";
import heartIcon from "assets/icons/heart.svg";
import userIcon from "assets/icons/user.svg";
import cartIcon from "assets/icons/shopping-bag.svg";
import { useAuth } from "hooks/useAuth";
import { useCart } from "hooks/useCart";
import styles from "./Navigation.module.scss";
import Button from "components/button/Button";
import Hyperlink from "components/button/Hyperlink";

const UserMenu = () => {
  const { uid, SignIn, SignOut } = useAuth();
  const { userCart } = useCart();

  return (
    <div className={styles.userMenu}>
      <Link className={styles.userMenu__icon} to="/404">
        <img src={heartIcon} alt="" />
      </Link>
      <div className={`${styles.userMenu__icon} ${styles.user}`}>
        <img src={userIcon} alt="" />
        <button className={styles.invisible}></button>
        <div className={styles.dropdown}>
          {uid === undefined ? (
            <Button onClick={SignIn} wide>
              Sign In
            </Button>
          ) : (
            <ul>
              <li>
                <Hyperlink href="/orders" wide invert>
                  Orders
                </Hyperlink>
              </li>
              <li>
                <Button onClick={SignOut} wide>
                  Logout
                </Button>
              </li>
            </ul>
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
