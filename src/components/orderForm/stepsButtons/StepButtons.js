import Button from "components/button/Button";
import styles from "./StepButtons.module.scss";

const FormStepButtons = ({ step, handleStep, nextButtonText, disableNextStep }) => {
  return (
    <div className={styles.wrapper}>
      <Button back hide={step === 1} onClick={() => handleStep(-1)}>
        Back
      </Button>
      <Button disableNextStep={disableNextStep} onClick={() => handleStep(1)}>
        {nextButtonText}
      </Button>
    </div>
  );
};

export default FormStepButtons;
