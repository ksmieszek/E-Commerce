import { useState, useEffect } from "react";
import { useAuth } from "hooks/useAuth";
import { useCart } from "hooks/useCart";
import { db } from "firebase";
import { doc, addDoc, collection, updateDoc, arrayUnion } from "firebase/firestore";
import styles from "./Order.module.scss";
import Cart from "components/orderForm/cart/Cart";
import PersonalDataForm from "components/orderForm/personalDataForm/PersonalDataForm";
import ShipmentDataForm from "components/orderForm/shipmentDataForm/ShipmentDataForm";
import Preview from "components/orderForm/preview/Preview";
import StepButtons from "components/orderForm/stepsButtons/StepButtons";
import ContentTemplate from "templates/contentTemplate/ContentTemplate";
import LackOfItemsInfo from "components/lackOfItemsInfo/LackOfItemsInfo";
import CompletedOrderModal from "components/modal/CompletedOrderModal";
import { useForm } from "react-hook-form";

const Order = () => {
  const [step, setStep] = useState(1);
  const [disableNextStep, setDisableNextStep] = useState(true);
  const [shipment, setShipment] = useState(undefined);
  const { uid, orderPersData, savePersonalOrderData } = useAuth();
  const { userCart, resetCart, fetchAllCartProductsInfo, getCartValue } = useCart();
  const [total, setTotal] = useState(0);
  const [cartWithProdInfo, setCartWithProdInfo] = useState([]);
  const [cartValue, setCartValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const {
    handleSubmit,
    formState: { isSubmitted, isSubmitting },
  } = useForm();

  const handleStep = (action) => {
    if (step === 1 && action === -1) return;
    if (step === 4 && action === 1) {
      handleSubmit(onSubmit)();
      return;
    }
    setStep(step + action);
  };

  const nextStepButtonTexts = ["Continue to delivery", "Continue to shipping", "Check order", "Pay & Order"];
  const StepPagesTitles = ["Cart", "Delivery address", "Shipping", "Check order"];

  useEffect(() => {
    (async () => {
      const allCartProdInfo = await fetchAllCartProductsInfo();
      const selectedCartInfo = [...allCartProdInfo].map(({ id, quantity, size, price }) => ({
        id,
        quantity,
        size,
        price,
      }));
      setCartWithProdInfo(selectedCartInfo);
      const cartValueInfo = await getCartValue();
      setCartValue(cartValueInfo);
    })();
  }, [userCart]);

  useEffect(() => {
    if (shipment === undefined) return;
    //total
    setTotal((parseFloat(cartValue) + parseFloat(shipment.price)).toFixed(2));
  }, [shipment]);

  const onSubmit = async () => {
    if (isSubmitted || isSubmitting) return;
    savePersonalOrderData();

    //add order
    const docRef = await addDoc(collection(db, "orders"), {
      cart: cartWithProdInfo,
      cartValue: cartValue,
      deliveryInfo: orderPersData,
      shipment: {
        name: shipment.name,
        price: shipment.price,
      },
      date: new Date(),
      totalValue: total,
    });
    console.log("Document written with ID: ", docRef.id);

    // add to users order history if logged in
    if (uid !== undefined)
      await updateDoc(doc(db, "users", uid), {
        orders: arrayUnion(docRef.id),
      });

    // reset cart
    resetCart();
    setIsModalOpen(true);
    setOrderCompleted(true);
  };

  const redirectFn = () => {
    if (uid === undefined) window.location = "/";
    else window.location = "/orders";
  };

  return (
    <ContentTemplate>
      <main className={styles.wrapper}>
        {orderCompleted ? (
          isModalOpen ? (
            <CompletedOrderModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}></CompletedOrderModal>
          ) : (
            <>{redirectFn()}</>
          )
        ) : userCart.length > 0 ? (
          <>
            <div className={styles.title}>{StepPagesTitles[step - 1]}</div>
            {step === 1 && <Cart setDisableNextStep={setDisableNextStep} />}
            {step === 2 && <PersonalDataForm setDisableNextStep={setDisableNextStep} />}
            {step === 3 && <ShipmentDataForm setDisableNextStep={setDisableNextStep} shipment={shipment} setShipment={setShipment} />}
            {step === 4 && <Preview cartValue={cartValue} shipment={shipment} total={total} />}
            <StepButtons
              step={step}
              handleStep={handleStep}
              nextButtonText={nextStepButtonTexts[step - 1]}
              disableNextStep={disableNextStep}
            ></StepButtons>
          </>
        ) : (
          <LackOfItemsInfo text="There are no items in your shopping cart."></LackOfItemsInfo>
        )}
      </main>
    </ContentTemplate>
  );
};

export default Order;
