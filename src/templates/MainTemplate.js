import Overlay from "components/overlay/Overlay";

const MainTemplate = ({ children }) => {
  return (
    <>
      <Overlay />
      {children}
    </>
  );
};

export default MainTemplate;
