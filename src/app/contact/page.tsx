// Core
import React from "react";
// Styles
import styles from "../styles/contact.module.css";
import Form from "../components/contact/Form";

export default function Page() {
  return (
    <div className={styles.contact}>
      <Form />
    </div>
  );
}
