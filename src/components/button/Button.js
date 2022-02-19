import styles from "./Button.module.scss";

const Button = ({ children, back, wide, disableNextStep, hide, rubik, invert, ...rest }) => (
  <button
    disabled={disableNextStep}
    className={`${styles.button} ${back ? styles.back : ""} ${wide ? styles.wide : ""} ${disableNextStep ? styles.disableNextStep : ""}
      ${hide ? styles.hide : ""} ${rubik ? styles.rubik : ""}   ${invert ? styles.invert : ""}`}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
