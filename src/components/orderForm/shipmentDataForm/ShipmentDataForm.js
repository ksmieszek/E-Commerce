import styles from "./ShipmentDataForm.module.scss";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import RadioInput from "../radioInput/RadioInput";

const shipmentTypes = [
  {
    id: "1",
    name: "Transport type: A",
    price: 14.99,
  },
  {
    id: "2",
    name: "Transport type: B",
    price: 6.81,
  },
  {
    id: "3",
    name: "Transport type: C",
    price: 10,
  },
];

const schema = yup.object().shape({
  shipment: yup.object({
    id: yup.string().required(),
    name: yup.string().required(),
    price: yup.number().required(),
  }),
});

const ShipmentDataForm = ({ setDisableNextStep, shipment, setShipment }) => {
  const {
    formState: { isValid },
    trigger,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      shipment: shipment || undefined,
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
    const selectedShipment = shipmentTypes.find((item) => item.id === value);
    field.onChange(selectedShipment);
    const valid = await trigger(field.name);
    if (valid) setShipment(selectedShipment);
    else setShipment(undefined);
  }

  return (
    <div className={styles.wrapper}>
      <form>
        <Controller
          render={({ field }) => (
            <div className={styles.options}>
              {shipmentTypes.map((item) => (
                <RadioInput key={item.id} item={item} field={field} handleControllerChange={handleControllerChange} />
              ))}
            </div>
          )}
          name="shipment"
          control={control}
        />
      </form>
    </div>
  );
};

export default ShipmentDataForm;
