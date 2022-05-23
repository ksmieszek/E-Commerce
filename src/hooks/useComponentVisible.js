import { useState, createContext, useContext } from "react";
import Overlay from "components/overlay/Overlay";

export const ComponentVisibleContext = createContext();
export const useComponentVisible = () => useContext(ComponentVisibleContext);

const ComponentVisibleProvider = ({ hideOnWidth, children }) => {
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const makeComponentVisible = () => setIsComponentVisible(true);
  const makeComponentInvisible = () => setIsComponentVisible(false);

  return (
    <ComponentVisibleContext.Provider value={{ isComponentVisible, makeComponentVisible, makeComponentInvisible }}>
      {isComponentVisible && <Overlay hideOnWidth={hideOnWidth} />}
      {children}
    </ComponentVisibleContext.Provider>
  );
};

export default ComponentVisibleProvider;
