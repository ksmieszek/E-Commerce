import { Link } from "react-router-dom";
import heartIcon from "assets/icons/heart.svg";
import userIcon from "assets/icons/user.svg";
import cartIcon from "assets/icons/shopping-bag.svg";

const UserMenu = () => (
  <div className="userMenu">
    <Link className="userMenu__icon" to="/">
      <img src={heartIcon} alt="" />
    </Link>
    <Link className="userMenu__icon" to="/">
      <img src={userIcon} alt="" />
    </Link>
    <Link className="userMenu__icon" to="/">
      <img src={cartIcon} alt="" />
    </Link>
  </div>
);

export default UserMenu;
