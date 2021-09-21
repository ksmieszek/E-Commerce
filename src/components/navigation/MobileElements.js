const MobileElements = (props) => (
  <div className="header">
    <div className="header__back">
      <div></div>
    </div>
    <div className="header__title">{props.children}</div>
    <div className="header__close"></div>
  </div>
);

export default MobileElements;
