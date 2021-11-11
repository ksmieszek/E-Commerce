import styles from "./LackOfItemsInfo.module.scss";
import Hyperlink from "components/button/Hyperlink";

const LackOfItemsInfo = ({ text, showHyperlink = true }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.message}>{text}</div>
      {showHyperlink && <Hyperlink href="/">Shop now</Hyperlink>}
    </div>
  );
};

export default LackOfItemsInfo;
