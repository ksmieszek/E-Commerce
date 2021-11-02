import styles from "./LoadingScreen.module.scss";
import { useAuth } from "hooks/useAuth";
import logoIcon from "assets/icons/logo.svg";

const LoadingScreen = () => {
  const { loading } = useAuth();

  return (
    <div className={`${styles.wrapper} ${loading ? styles.show : ""}`}>
      <div className={styles.loadingIndicator}>
        <img src={logoIcon} alt="" />
      </div>
    </div>
  );
};

export default LoadingScreen;
