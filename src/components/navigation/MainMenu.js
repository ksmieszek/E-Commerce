import { useEffect, useRef } from "react";
import MobileElements from "./MobileElements";
import { Link } from "react-router-dom";

const MainMenu = () => {
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const hamburgerRef = useRef(null);

  const disableScroll = () => {
    document.body.style.maxHeight = "100%";
    document.body.style.overflow = "hidden";
    overlayRef.current.classList.add("show");
  };

  const allowScroll = () => {
    document.body.style.maxHeight = "unset";
    document.body.style.overflow = "unset";
    overlayRef.current.classList.remove("show");
  };

  useEffect(() => {
    overlayRef.current.addEventListener("click", (e) => {
      e.stopPropagation();
      menuRef.current.classList.remove("open");
      allowScroll();
    });

    hamburgerRef.current.addEventListener("click", (e) => {
      e.stopPropagation();
      menuRef.current.classList.add("open");
      disableScroll();
    });

    menuRef.current.querySelectorAll(".header__back").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const parentWrapper = e.target.closest(".open");
        if (parentWrapper === menuRef.current) allowScroll();
        parentWrapper.classList.remove("open");
      });
    });

    menuRef.current.querySelectorAll(".header__close").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        menuRef.current.classList.remove("open");
        allowScroll();
      });
    });

    menuRef.current.querySelectorAll(".submenus__item").forEach((item) =>
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        e.currentTarget.classList.add("open");
      })
    );

    menuRef.current.querySelectorAll(".categories__item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        e.currentTarget.classList.add("open");
      });
    });
  });

  return (
    <nav className="menu">
      <div className="menu__overlay" ref={overlayRef}></div>
      <div className="menu__hamburger" ref={hamburgerRef}>
        <div></div>
      </div>
      <div className="menu__container" ref={menuRef}>
        <MobileElements>Wybierz kategorię</MobileElements>
        <ul className="submenus">
          <li className="submenus__item">
            <Link to="/">Mężczyźni</Link>
            <div className="categories">
              <MobileElements>Męskie</MobileElements>
              <ul className="categories__list">
                <li className="categories__item">
                  <Link to="/">Koszulki</Link>
                  <div className="links">
                    <MobileElements>Koszulki</MobileElements>
                    <ul className="links__list">
                      <li className="links__item">
                        <Link to="/">T-shirty</Link>
                      </li>
                      <li className="links__item">
                        <Link to="/">Koszulki polo</Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="categories__item">
                  <Link to="/">Koszule</Link>
                  <div className="links">
                    <MobileElements>Koszule</MobileElements>
                    <ul className="links__list">
                      <li className="links__item">
                        <Link to="/">Koszule z krótkim rękawem</Link>
                      </li>
                      <li className="links__item">
                        <Link to="/">Koszule z długim rękawem</Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="categories__item">
                  <Link to="/">Spodnie</Link>
                  <div className="links">
                    <MobileElements>
                      <Link to="/">Spodnie</Link>
                    </MobileElements>
                    <ul className="links__list">
                      <li className="links__item">
                        <Link to="/">Jeansy</Link>
                      </li>
                      <li className="links__item">
                        <Link to="/">Spodnie dresowe</Link>
                      </li>
                      <li className="links__item">
                        <Link to="/">Szorty</Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li className="submenus__item">
            <Link to="/">Kobiety</Link>
            <div className="categories">
              <MobileElements>Damskie</MobileElements>
              <ul className="categories__list">
                <li className="categories__item">
                  <Link to="/">Koszulki</Link>
                  <div className="links">
                    <MobileElements>Koszulki</MobileElements>
                    <ul className="links__list">
                      <li className="links__item">
                        <Link to="/">T-shirty</Link>
                      </li>
                      <li className="links__item">
                        <Link to="/">Koszulki polo</Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="categories__item">
                  <Link to="/">Koszule</Link>
                  <div className="links">
                    <MobileElements>Koszule</MobileElements>
                    <ul className="links__list">
                      <li className="links__item">
                        <Link to="/">Koszule z krótkim rękawem</Link>
                      </li>
                      <li className="links__item">
                        <Link to="/">Koszule z długim rękawem</Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="categories__item">
                  <Link to="/">Spodnie</Link>
                  <div className="links">
                    <MobileElements>
                      <Link to="/">Spodnie</Link>
                    </MobileElements>
                    <ul className="links__list">
                      <li className="links__item">
                        <Link to="/">Jeansy</Link>
                      </li>
                      <li className="links__item">
                        <Link to="/">Spodnie dresowe</Link>
                      </li>
                      <li className="links__item">
                        <Link to="/">Szorty</Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="categories__item">
                  <Link to="/">Spodnie</Link>
                  <div className="links">
                    <MobileElements>
                      <Link to="/">Spodnie</Link>
                    </MobileElements>
                    <ul className="links__list">
                      <li className="links__item">
                        <Link to="/">Jeansy</Link>
                      </li>
                      <li className="links__item">
                        <Link to="/">Spodnie dresowe</Link>
                      </li>
                      <li className="links__item">
                        <Link to="/">Szorty</Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="categories__item">
                  <Link to="/">Spodnie</Link>
                  <div className="links">
                    <MobileElements>
                      <Link to="/">Spodnie</Link>
                    </MobileElements>
                    <ul className="links__list">
                      <li className="links__item">
                        <Link to="/">Jeansy</Link>
                      </li>
                      <li className="links__item">
                        <Link to="/">Spodnie dresowe</Link>
                      </li>
                      <li className="links__item">
                        <Link to="/">Szorty</Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="categories__item">
                  <Link to="/">Spodnie</Link>
                  <div className="links">
                    <MobileElements>
                      <Link to="/">Spodnie</Link>
                    </MobileElements>
                    <ul className="links__list">
                      <li className="links__item">
                        <Link to="/">Jeansy</Link>
                      </li>
                      <li className="links__item">
                        <Link to="/">Spodnie dresowe</Link>
                      </li>
                      <li className="links__item">
                        <Link to="/">Szorty</Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="categories__item">
                  <Link to="/">Spodnie</Link>
                  <div className="links">
                    <MobileElements>
                      <Link to="/">Spodnie</Link>
                    </MobileElements>
                    <ul className="links__list">
                      <li className="links__item">
                        <Link to="/">Jeansy</Link>
                      </li>
                      <li className="links__item">
                        <Link to="/">Spodnie dresowe</Link>
                      </li>
                      <li className="links__item">
                        <Link to="/">Szorty</Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </li>

          <li className="submenus__item last">
            <Link to="/">Akcesoria</Link>
          </li>
          <li className="submenus__item last">
            <Link to="/">Nowości</Link>
          </li>
          <li className="submenus__item last">
            <Link to="/">Promocje</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainMenu;
