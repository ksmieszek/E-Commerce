import styles from "./FormField.module.scss";
import { Controller } from "react-hook-form";

const FormField = ({ title, name, control, handleControllerChange, trigger, error }) => (
  <label className={styles.wrapper}>
    <span className={styles.title}>{title}</span>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          onChange={(e) => handleControllerChange(e, field)}
          onBlur={() => trigger(field.name)}
          className={`${error !== undefined ? styles.invalid : ""}`}
        />
      )}
    />
    <p className={styles.error}>{error !== undefined && error?.message}</p>
  </label>
);

export default FormField;
