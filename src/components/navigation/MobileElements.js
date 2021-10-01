import { Link } from "react-router-dom";
import CloseButton from "components/closeButton/CloseButton";

const MobileElements = ({ children, link }) => (
  <div className="header">
    <div className="header__back"></div>
    {link ? (
      <Link className="header__title" to={link}>
        {children}
      </Link>
    ) : (
      <div className="header__title">{children}</div>
    )}
    <CloseButton data-header-close />
  </div>
);

export default MobileElements;
