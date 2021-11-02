import Overlay from "components/overlay/Overlay";
import Navigation from "components/navigation/Navigation";
import LoadingScreen from "components/loadingScreen/LoadingScreen";

const MainTemplate = ({ children }) => {
  return (
    <>
      <Overlay />
      <LoadingScreen />
      <Navigation />
      {children}
    </>
  );
};

export default MainTemplate;
