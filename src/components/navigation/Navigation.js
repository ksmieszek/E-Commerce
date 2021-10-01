import { useRef, useEffect } from "react";
import debounce from "lodash.debounce";
import "./Navigation.scss";
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
        if (lastScrollPosition > window.scrollY) navbarRef.current.classList.add("showNavbar");
        else if (lastScrollPosition < window.scrollY) navbarRef.current.classList.remove("showNavbar");
      } else {
        navbarRef.current.classList.remove("showNavbar");
      }
    lastScrollPosition = window.scrollY;
  }

  return (
    <div className="navbar" ref={navbarRef}>
      <nav className="navbar__inner">
        <Logo />
        <UserMenu />
        <Search />
        <MainMenu />
      </nav>
    </div>
  );
};

export default Navigation;
