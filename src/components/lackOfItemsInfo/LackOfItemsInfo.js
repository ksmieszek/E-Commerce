import styles from "./LackOfItemsInfo.module.scss";
import Button from "components/button/Button";
import { useHistory } from "react-router";

const LackOfItemsInfo = ({ text }) => {
  let history = useHistory();

  return (
    <div className={styles.wrapper}>
      <div className={styles.message}>{text}</div>
      <Button onClick={() => history.push("/")}>Shop now</Button>
    </div>
  );
};

export default LackOfItemsInfo;
