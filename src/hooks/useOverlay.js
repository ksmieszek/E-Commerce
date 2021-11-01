import { createContext, useContext, useState } from "react";

export const OverlayContext = createContext();

export const useOverlay = () => useContext(OverlayContext);

const OverlayProvider = ({ children }) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const makeOverlayVisible = () => setIsOverlayVisible(true);
  const makeOverlayInvisible = () => setIsOverlayVisible(false);

  return <OverlayContext.Provider value={{ isOverlayVisible, makeOverlayVisible, makeOverlayInvisible }}>{children}</OverlayContext.Provider>;
};

export default OverlayProvider;
