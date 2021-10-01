import Navigation from "components/navigation/Navigation";

const StoreTemplate = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default StoreTemplate;
