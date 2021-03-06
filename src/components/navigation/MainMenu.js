import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "firebase";
import { doc, getDoc } from "firebase/firestore";
import MobileElements from "./MobileElements";
import styles from "./Navigation.module.scss";
import ComponentVisibleProvider, { useComponentVisible } from "hooks/useComponentVisible";
import scssExports from "sass/_exports.module.scss";

const MainMenuWrapper = () => (
  <ComponentVisibleProvider hideOnWidth={scssExports["screen-width-s"]}>
    <MainMenu />
  </ComponentVisibleProvider>
);

const MainMenu = () => {
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const { isComponentVisible, makeComponentVisible, makeComponentInvisible } = useComponentVisible();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    (async () => {
      const mainMenuSnapshot = await getDoc(doc(db, "menus", "main"));
      if (!mainMenuSnapshot.exists()) return;
      const mainMenuArray = Object.values(mainMenuSnapshot.data());
      mainMenuArray
        .sort((a, b) => a.order - b.order)
        .forEach((collection) =>
          collection.categories?.sort((a, b) => a.order - b.order).forEach((category) => category.podcategories?.sort((a, b) => a.order - b.order))
        );
      setMenu(mainMenuArray);
    })();
  }, []);

  useEffect(() => {
    const menuRefCopy = menuRef.current;
    menuRefCopy.addEventListener("click", handleClick);
    return () => menuRefCopy.removeEventListener("click", handleClick);
  }, []);

  function handleClick(e) {
    e.stopPropagation();
    if (e.target === hamburgerRef.current) makeComponentVisible();
    if (e.target.dataset.headerClose) makeComponentInvisible();
    if (e.target.classList.contains(styles.header__back)) {
      const parentWrapper = e.target.closest(`.${styles.open}`);
      if (parentWrapper === menuRef.current) {
        makeComponentInvisible();
        return;
      }
      parentWrapper.classList.remove(styles.open);
    }
    if (e.target.classList.contains(styles.submenus__item) || e.target.classList.contains(styles.categories__item))
      e.target.classList.add(styles.open);
  }

  return (
    <div className={`${styles.mainMenu} ${isComponentVisible ? styles.open : ``}`} ref={menuRef}>
      <button className={styles.mainMenu__hamburger} ref={hamburgerRef}>
        <div></div>
      </button>
      <div className={styles.mainMenu__container}>
        <MobileElements>Choose category</MobileElements>
        <ul className={styles.submenus}>
          {menu.map((submenu, index) =>
            submenu.categories?.length > 0 ? (
              <li className={styles.submenus__item} key={index}>
                <Link to={submenu.link}>{submenu.title}</Link>
                <div className={styles.categories}>
                  <MobileElements link={submenu.link}>{submenu.title}</MobileElements>
                  <ul className={styles.categories__list}>
                    {submenu.categories.map((cat, index) =>
                      cat.podcategories?.length > 0 ? (
                        <li className={styles.categories__item} key={index}>
                          <Link to={cat.link}>{cat.title}</Link>
                          <div className={styles.links}>
                            <MobileElements link={cat.link}>{cat.title}</MobileElements>
                            <ul className={styles.links__list}>
                              {cat.podcategories.map((podCat, index) => (
                                <li className={styles.links__item} key={index}>
                                  <Link to={podCat.link}>{podCat.title}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      ) : (
                        <li className={styles[`categories__item--last`]} key={index}>
                          <Link to={cat.link}>{cat.title}</Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </li>
            ) : (
              <li className={styles[`submenus__item--last`]} key={index}>
                <Link to={submenu.link}>{submenu.title}</Link>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default MainMenuWrapper;
