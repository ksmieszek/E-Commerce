import { createContext, useContext, useState, useEffect } from "react";
import { useOverlay } from "hooks/useOverlay";

export const ComponentPresenceContext = createContext();

export const useComponentPresence = () => useContext(ComponentPresenceContext);

const ComponentPresenceProvider = ({ children }) => {
  const { isOverlayVisible, makeOverlayVisible, makeOverlayInvisible } = useOverlay();

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

  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const makeComponentVisible = () => {
    setIsComponentVisible(true);
    makeOverlayVisible();
  };
  const makeComponentInvisible = () => {
    setIsComponentVisible(false);
    makeOverlayInvisible();
  };

  useEffect(() => {
    if (!isOverlayVisible) {
      makeSidebarInvisible();
      makeNavInvisible();
      makeComponentInvisible();
    }
  }, [isOverlayVisible]);

  return (
    <ComponentPresenceContext.Provider
      value={{
        isNavVisible,
        makeNavVisible,
        makeNavInvisible,
        isSidebarVisible,
        makeSidebarVisible,
        makeSidebarInvisible,
        isComponentVisible,
        makeComponentVisible,
        makeComponentInvisible,
      }}
    >
      {children}
    </ComponentPresenceContext.Provider>
  );
};

export default ComponentPresenceProvider;
