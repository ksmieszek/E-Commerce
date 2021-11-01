import Overlay from "components/overlay/Overlay";
import Navigation from "components/navigation/Navigation";

const MainTemplate = ({ children }) => {
  return (
    <>
      <Overlay />
      <Navigation />
      {children}
    </>
  );
};

export default MainTemplate;
