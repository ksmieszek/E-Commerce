import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import menuLinks from "assets/data/menuLinks";
import MobileElements from "./MobileElements";

const MainMenu = () => {
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const menuRefCopy = menuRef.current;
    menuRefCopy.addEventListener("click", handleClick);
    return () => menuRefCopy.removeEventListener("click", handleClick);
  }, []);

  function handleClick(e) {
    e.stopPropagation();
    if (e.target === hamburgerRef.current) showMenu();
    if (e.target === overlayRef.current) hideMenu();
    if (e.target.classList.contains("header__close")) hideMenu();
    if (e.target.classList.contains("header__back")) {
      const parentWrapper = e.target.closest(".open");
      if (parentWrapper === menuRef.current) {
        hideMenu();
        return;
      }
      parentWrapper.classList.remove("open");
    }
    if (e.target.classList.contains("submenus__item") || e.target.classList.contains("categories__item")) e.target.classList.add("open");
  }

  const showMenu = () => {
    document.body.style.maxHeight = "100%";
    document.body.style.overflow = "hidden";
    overlayRef.current.classList.add("show");
    menuRef.current.classList.add("open");
  };

  const hideMenu = () => {
    document.body.style.maxHeight = "unset";
    document.body.style.overflow = "unset";
    overlayRef.current.classList.remove("show");
    menuRef.current.classList.remove("open");
  };

  return (
    <div className="menu" ref={menuRef}>
      <div className="menu__overlay" ref={overlayRef}></div>
      <div className="menu__hamburger" ref={hamburgerRef}>
        <div></div>
      </div>
      <div className="menu__container">
        <MobileElements>Choose category</MobileElements>
        <ul className="submenus">
          {menuLinks.map((submenu, index) =>
            submenu.categories?.length > 0 ? (
              <li className="submenus__item" key={index}>
                <Link to={submenu.link}>{submenu.title}</Link>
                <div className="categories">
                  <MobileElements link={submenu.link}>{submenu.title}</MobileElements>
                  <ul className="categories__list">
                    {submenu.categories.map((cat, index) =>
                      cat.podcategories?.length > 0 ? (
                        <li className="categories__item" key={index}>
                          <Link to={cat.link}>{cat.title}</Link>
                          <div className="links">
                            <MobileElements link={cat.link}>{cat.title}</MobileElements>
                            <ul className="links__list">
                              {cat.podcategories.map((podCat, index) => (
                                <li className="links__item" key={index}>
                                  <Link to={podCat.link}>{podCat.title}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      ) : (
                        <li className="categories__item--last" key={index}>
                          <Link to={cat.link}>{cat.title}</Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </li>
            ) : (
              <li className="submenus__item--last" key={index}>
                <Link to={submenu.link}>{submenu.title}</Link>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default MainMenu;
