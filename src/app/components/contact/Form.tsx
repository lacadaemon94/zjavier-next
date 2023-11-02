// Core
"use client";
import React, { useReducer, useState, useEffect, useContext } from "react";
import { SessionContext } from "@/app/utils/SessionProvider";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
// Custom Hooks
import { formReducer, initialState } from "@/app/utils/formReducer";
import { useHandlers } from "@/app/utils/formHandlers";
// Styles
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/contact.module.css";
// Ui Elements
import { Input } from "./Input";
import Button from "@/app/elements/buttons/Button";
import { TextArea } from "./TextArea";

type Props = {
  onSubmitSuccess?: () => void;
};

const Form: React.FC<Props> = ({ onSubmitSuccess }) => {
  const { isLightTheme } = useContext(SessionContext);

  const [reset, setReset] = useState<boolean>(false);
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { handleChange, handleSubmit } = useHandlers(initialState, dispatch);

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => handleSubmit(e, dispatch, state)}
    >
      <div className={styles.fandlname}>
        <Input
          type="text"
          id="fname"
          label={"first name"}
          placeholder="E.G. JOSEPH"
          className={styles.input}
          pattern="^[a-zA-Z]{2,}$"
          onChange={handleChange}
          resetTrigger={reset}
        />
        <Input
          type="text"
          id="lname"
          label={"last name"}
          placeholder="E.G. MCCOY"
          className={styles.input}
          pattern="^[a-zA-Z]{2,}$"
          onChange={handleChange}
          resetTrigger={reset}
        />
      </div>
      <Input
        type="email"
        id="email"
        label={"email"}
        placeholder="E.G. joseph.mccoy@gmail.com"
        className={styles.input}
        onChange={handleChange}
        resetTrigger={reset}
      />
      <Input
        type="tel"
        id="phone"
        label={"telephone"}
        placeholder="E.G. +503 7456-6445"
        className={styles.input}
        onChange={handleChange}
        resetTrigger={reset}
      />
      <TextArea
        className={styles.textarea}
        id="message"
        label="message"
        minLength={20}
        maxLength={250}
        placeholder="What you doing?..."
        onChange={handleChange}
        resetTrigger={reset}
        state={state}
      />
      <div className={styles.formactions}>
        <Button
          type="button"
          className={styles.formaction}
          disabled={state.status === "sending" ? true : false}
          onClick={() => setReset(true)}
        >
          <p>reset</p>
        </Button>
        <Button
          type="submit"
          className={styles.formaction}
          disabled={state.status === "sent" ? true : false}
          data-sending={state.status === "sending" ? true : false}
        >
          <p>send</p>
        </Button>
      </div>
      <ToastContainer theme={isLightTheme ? "light" : "dark"} position="top-center" />
    </form>
  );
};

export default Form;
