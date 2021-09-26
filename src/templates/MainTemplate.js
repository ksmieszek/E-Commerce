import Navigation from "components/navigation/Navigation";

const MainTemplate = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default MainTemplate;
