import { Link } from "react-router-dom";
import logoIcon from "assets/icons/logo.svg";

const Logo = () => (
  <Link className="logo" to="/">
    <img src={logoIcon} alt="" />
  </Link>
);

export default Logo;
