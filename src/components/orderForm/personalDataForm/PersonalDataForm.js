import styles from "./PersonalDataForm.module.scss";
import { useAuth } from "hooks/useAuth";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

const schema = yup.object().shape({
  firstName: yup.string().trim().required(),
  surname: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  phoneNumber: yup.string().trim().required(),
  street: yup.string().trim().required(),
  no: yup.number().positive().integer().required(),
  postalCode: yup.string().trim().required(),
  city: yup.string().trim().required(),
});

const PersonalDataForm = ({ setDisableNextStep }) => {
  const { orderPersData, setOrderPersData } = useAuth();

  const {
    formState: { errors, isValid },
    trigger,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: orderPersData?.firstName || "",
      surname: orderPersData?.surname || "",
      email: orderPersData?.email || "",
      phoneNumber: orderPersData?.phoneNumber || "",
      street: orderPersData?.street || "",
      no: orderPersData?.no || "",
      postalCode: orderPersData?.postalCode || "",
      city: orderPersData?.city || "",
    },
  });

  useEffect(() => {
    if (isValid) setDisableNextStep(false);
    else setDisableNextStep(true);
  }, [isValid]);

  async function handleControllerChange(e, field) {
    const {
      target: { value },
    } = e;
    field.onChange(value);
    const valid = await trigger(field.name);
    if (valid) setOrderPersData({ ...orderPersData, [field.name]: value });
  }

  return (
    <div className={styles.wrapper}>
      <form>
        <div className={styles.input__group}>
          <div className={`${styles.input__box} ${styles[`flex-1`]}`}>
            <label>
              <span className={styles.input__title}>First name</span>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => <input {...field} onChange={(e) => handleControllerChange(e, field)} onBlur={() => trigger(field.name)} />}
              />
            </label>
          </div>
          <div className={`${styles.input__box} ${styles[`flex-1`]}`}>
            <label>
              <span className={styles.input__title}>Surname</span>
              <Controller
                name="surname"
                control={control}
                render={({ field }) => <input {...field} onChange={(e) => handleControllerChange(e, field)} onBlur={() => trigger(field.name)} />}
              />
            </label>
          </div>
        </div>
        <div className={styles.input__box}>
          <label>
            <span className={styles.input__title}>Email</span>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <input {...field} onChange={(e) => handleControllerChange(e, field)} onBlur={() => trigger(field.name)} />}
            />
          </label>
          {errors?.email?.type === "required" && <p>This field is required</p>}
          {errors?.email?.type === "email" && <p>Email not valid</p>}
        </div>
        <div className={styles.input__box}>
          <label>
            <span className={styles.input__title}>Phone number</span>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => <input {...field} onChange={(e) => handleControllerChange(e, field)} onBlur={() => trigger(field.name)} />}
            />
          </label>
        </div>
        <div className={styles.input__group}>
          <div className={`${styles.input__box} ${styles[`flex-3`]}`}>
            <label>
              <span className={styles.input__title}>Street</span>
              <Controller
                name="street"
                control={control}
                render={({ field }) => <input {...field} onChange={(e) => handleControllerChange(e, field)} onBlur={() => trigger(field.name)} />}
              />
            </label>
          </div>
          <div className={`${styles.input__box} ${styles[`flex-1`]}`}>
            <label>
              <span className={styles.input__title}>No</span>
              <Controller
                name="no"
                control={control}
                render={({ field }) => <input {...field} onChange={(e) => handleControllerChange(e, field)} onBlur={() => trigger(field.name)} />}
              />
            </label>
          </div>
        </div>
        <div className={styles.input__group}>
          <div className={`${styles.input__box} ${styles[`flex-2`]}`}>
            <label>
              <span className={styles.input__title}>Postal code</span>
              <Controller
                name="postalCode"
                control={control}
                render={({ field }) => <input {...field} onChange={(e) => handleControllerChange(e, field)} onBlur={() => trigger(field.name)} />}
              />
            </label>
          </div>
          <div className={`${styles.input__box} ${styles[`flex-4`]}`}>
            <label>
              <span className={styles.input__title}>City</span>
              <Controller
                name="city"
                control={control}
                render={({ field }) => <input {...field} onChange={(e) => handleControllerChange(e, field)} onBlur={() => trigger(field.name)} />}
              />
            </label>
            {errors?.city?.type === "required" && <p>This field is required</p>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalDataForm;
