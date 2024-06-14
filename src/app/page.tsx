// Home
// Core
import React from "react";
// Utils
// Ui Elements
import HomeHeader from "./components/HomeHeader";
import NotesContainer from "./components/NotesContainer";
import Footer from "./components/Footer";
// Assets
// Styles
import styles from "./styles/home.module.css";

export default function Page() {
  return (
    <div className={styles.home}>
      <HomeHeader />
      <NotesContainer />
      <Footer />
    </div>
  );
}
