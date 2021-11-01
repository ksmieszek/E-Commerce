import styles from "./Button.module.scss";

const Button = ({ children, wide, rubik, ...rest }) => {
  return (
    <button className={`${styles.button}  ${wide ? styles.wide : ""}  ${rubik ? styles.rubik : ""}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
