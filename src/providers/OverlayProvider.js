import { createContext, useContext } from "react";
import { useOverlay } from "components/overlay/useOverlay";

export const OverlayContext = createContext();

export const useOverlayContext = () => useContext(OverlayContext);

const OverlayProvider = ({ children }) => {
  const { isOverlayVisible, makeOverlayVisible, makeOverlayInvisible } = useOverlay();
  return <OverlayContext.Provider value={{ isOverlayVisible, makeOverlayVisible, makeOverlayInvisible }}>{children}</OverlayContext.Provider>;
};

export default OverlayProvider;
