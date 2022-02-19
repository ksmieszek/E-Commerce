import styles from "./Button.module.scss";

const Hyperlink = ({ children, back, wide, hide, rubik, invert, href, ...rest }) => (
  <a
    href={href}
    className={`${styles.button} ${back ? styles.back : ""} ${wide ? styles.wide : ""} 
      ${hide ? styles.hide : ""} ${rubik ? styles.rubik : ""}   ${invert ? styles.invert : ""}`}
    {...rest}
  >
    {children}
  </a>
);

export default Hyperlink;
