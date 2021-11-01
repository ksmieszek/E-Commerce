import { useHistory } from "react-router-dom";
import ContentTemplate from "templates/contentTemplate/ContentTemplate";
import styles from "./NotFound.module.scss";
import Button from "components/button/Button";

const NotFound = () => {
  let history = useHistory();
  return (
    <ContentTemplate>
      <div className={styles.wrapper}>
        <div className={styles.number}>404</div>
        <div className={styles.message}>Page not found</div>
        <Button onClick={() => history.push("/")}>Back to store</Button>
      </div>
    </ContentTemplate>
  );
};

export default NotFound;
