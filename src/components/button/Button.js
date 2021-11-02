import styles from "./Button.module.scss";

const Button = ({ children, back, wide, disableNextStep, hide, rubik, ...rest }) => {
  return (
    <button
      disabled={disableNextStep}
      className={`${styles.button} ${back ? styles.back : ""} ${wide ? styles.wide : ""} ${disableNextStep ? styles.disableNextStep : ""}
      ${hide ? styles.hide : ""} ${rubik ? styles.rubik : ""}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
