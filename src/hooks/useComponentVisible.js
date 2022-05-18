import { useState, createContext, useContext } from "react";
import Overlay from "components/overlay/Overlay";

export const ComponentVisibleContext = createContext();
export const useComponentVisible = () => useContext(ComponentVisibleContext);

const ComponentVisibleProvider = ({ hideOvarlayOnWide, children }) => {
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const makeComponentVisible = () => setIsComponentVisible(true);
  const makeComponentInvisible = () => setIsComponentVisible(false);

  return (
    <ComponentVisibleContext.Provider value={{ isComponentVisible, makeComponentVisible, makeComponentInvisible }}>
      <Overlay hideOvarlayOnWide />
      {children}
    </ComponentVisibleContext.Provider>
  );
};

export default ComponentVisibleProvider;
