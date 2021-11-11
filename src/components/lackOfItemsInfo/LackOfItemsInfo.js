import styles from "./LackOfItemsInfo.module.scss";
import Hyperlink from "components/button/Hyperlink";

const LackOfItemsInfo = ({ text }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.message}>{text}</div>
      <Hyperlink href="/">Shop now</Hyperlink>
    </div>
  );
};

export default LackOfItemsInfo;
