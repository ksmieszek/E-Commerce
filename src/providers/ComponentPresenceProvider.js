import { createContext, useContext, useState, useEffect } from "react";
import { useOverlayContext } from "providers/OverlayProvider";

export const ComponentPresenceContext = createContext();

export const useComponentPresenceContext = () => useContext(ComponentPresenceContext);

const ComponentPresenceProvider = ({ children }) => {
  const { isOverlayVisible, makeOverlayVisible, makeOverlayInvisible } = useOverlayContext();

  const [isNavVisible, setIsNavVisible] = useState(false);
  const makeNavVisible = () => {
    setIsNavVisible(true);
    makeOverlayVisible();
  };
  const makeNavInvisible = () => {
    setIsNavVisible(false);
    makeOverlayInvisible();
  };

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const makeSidebarVisible = () => {
    setIsSidebarVisible(true);
    makeOverlayVisible();
  };
  const makeSidebarInvisible = () => {
    setIsSidebarVisible(false);
    makeOverlayInvisible();
  };

  useEffect(() => {
    if (!isOverlayVisible) {
      makeSidebarInvisible();
      makeNavInvisible();
    }
  }, [isOverlayVisible]);

  return (
    <ComponentPresenceContext.Provider
      value={{ isNavVisible, makeNavVisible, makeNavInvisible, isSidebarVisible, makeSidebarVisible, makeSidebarInvisible }}
    >
      {children}
    </ComponentPresenceContext.Provider>
  );
};

export default ComponentPresenceProvider;
