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

  const handleScroll = () => {
    if (window.scrollY > defaultNavHeight.current + 100) {
      if (lastScrollPosition > window.scrollY) navbarRef.current.classList.add("showNavbar");
      else if (lastScrollPosition < window.scrollY) navbarRef.current.classList.remove("showNavbar");
    } else {
      navbarRef.current.classList.remove("showNavbar");
    }
    lastScrollPosition = window.scrollY;
  };

  useEffect(() => {
    defaultNavHeight.current = navbarRef.current.getBoundingClientRect().height;

    window.addEventListener(
      "scroll",
      debounce(handleScroll, 100, {
        leading: true,
      })
    );
  }, []);

  return (
    <div className="navbar" ref={navbarRef}>
      <div className="navbar__inner">
        <Logo />
        <UserMenu />
        <Search />
        <MainMenu />
      </div>
    </div>
  );
};

export default Navigation;
