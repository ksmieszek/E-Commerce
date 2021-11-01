import { useRef, useEffect } from "react";
import debounce from "lodash.debounce";
import styles from "./Navigation.module.scss";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import MainMenu from "./MainMenu";

const Navigation = () => {
  const navbarRef = useRef(null);
  let lastScrollPosition = window.scrollY;
  let defaultNavHeight = useRef(null);
  const debouncedScrollListener = debounce(handleScroll, 100, {
    leading: true,
  });

  useEffect(() => {
    defaultNavHeight.current = navbarRef.current.getBoundingClientRect().height;
    window.addEventListener("scroll", debouncedScrollListener);
    return () => window.removeEventListener("scroll", debouncedScrollListener);
  }, []);

  function handleScroll() {
    if (navbarRef.current !== null)
      if (window.scrollY > defaultNavHeight.current + 100) {
        if (lastScrollPosition > window.scrollY) navbarRef.current.classList.add(styles.showNavbar);
        else if (lastScrollPosition < window.scrollY) navbarRef.current.classList.remove(styles.showNavbar);
      } else {
        navbarRef.current.classList.remove(styles.showNavbar);
      }
    lastScrollPosition = window.scrollY;
  }

  return (
    <div className={styles.navbar} ref={navbarRef}>
      <nav className={styles.navbar__inner}>
        <Logo />
        <UserMenu />
        <Search />
        <MainMenu />
      </nav>
    </div>
  );
};

export default Navigation;
