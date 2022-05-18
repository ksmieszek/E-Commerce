import Navigation from "components/navigation/Navigation";
import LoadingScreen from "components/loadingScreen/LoadingScreen";

const MainTemplate = ({ children }) => {
  return (
    <>
      <LoadingScreen />
      <Navigation />
      {children}
    </>
  );
};

export default MainTemplate;
