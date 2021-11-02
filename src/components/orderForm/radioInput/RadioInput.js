import styles from "./RadioInput.module.scss";

const Checkbox = ({ item, field, handleControllerChange, editable = true }) => {
  return (
    <>
      <div className={styles.option} key={item.id}>
        <div className={styles.value}>
          {editable && (
            <input
              {...field}
              type="radio"
              value={item.id}
              checked={item.id === field.value?.id}
              onChange={(e) => handleControllerChange(e, field)}
              id={item.id}
            />
          )}
          {editable ? <label className={styles.checkable} htmlFor={item.id}></label> : <label></label>}
          <div>{item.name}</div>
        </div>
        <div className={styles.price}>PLN {item.price}</div>
      </div>
    </>
  );
};

export default Checkbox;
