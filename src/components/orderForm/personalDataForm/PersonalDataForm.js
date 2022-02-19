import styles from "./PersonalDataForm.module.scss";
import { useAuth } from "hooks/useAuth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import FormField from "components/formField/FormField";

const schema = yup.object().shape({
  firstName: yup.string().trim().required("First name is a required field"),
  surname: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  phoneNumber: yup
    .string()
    .trim()
    .required("Phone number is a required field")
    .matches(/^\d{9}$/, "Phone number must be 9 digits long"),
  street: yup.string().trim().required(),
  no: yup.string().trim().required(),
  postalCode: yup
    .string()
    .trim()
    .required("Postal code is a required field")
    .matches(/^\d{2}-\d{3}$/, "Postal code must match the following pattern: 00-000"),
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
            <FormField
              title="First name"
              name="firstName"
              control={control}
              handleControllerChange={handleControllerChange}
              trigger={trigger}
              error={errors?.firstName}
            />
          </div>
          <div className={`${styles.input__box} ${styles[`flex-1`]}`}>
            <FormField
              title="Surname"
              name="surname"
              control={control}
              handleControllerChange={handleControllerChange}
              trigger={trigger}
              error={errors?.surname}
            />
          </div>
        </div>
        <div className={styles.input__box}>
          <FormField
            title="Email"
            name="email"
            control={control}
            handleControllerChange={handleControllerChange}
            trigger={trigger}
            error={errors?.email}
          />
        </div>
        <div className={styles.input__box}>
          <FormField
            title="Phone number"
            name="phoneNumber"
            control={control}
            handleControllerChange={handleControllerChange}
            trigger={trigger}
            error={errors?.phoneNumber}
          />
        </div>
        <div className={styles.input__group}>
          <div className={`${styles.input__box} ${styles[`flex-3`]}`}>
            <FormField
              title="Street"
              name="street"
              control={control}
              handleControllerChange={handleControllerChange}
              trigger={trigger}
              error={errors?.street}
            />
          </div>
          <div className={`${styles.input__box} ${styles[`flex-1`]}`}>
            <FormField title="No" name="no" control={control} handleControllerChange={handleControllerChange} trigger={trigger} error={errors?.no} />
          </div>
        </div>
        <div className={styles.input__group}>
          <div className={`${styles.input__box} ${styles[`flex-2`]}`}>
            <FormField
              title="Postal code"
              name="postalCode"
              control={control}
              handleControllerChange={handleControllerChange}
              trigger={trigger}
              error={errors?.postalCode}
            />
          </div>
          <div className={`${styles.input__box} ${styles[`flex-4`]}`}>
            <FormField
              title="City"
              name="city"
              control={control}
              handleControllerChange={handleControllerChange}
              trigger={trigger}
              error={errors?.city}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalDataForm;
