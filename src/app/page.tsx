// Home
import React from "react";

// Styles
import styles from "./styles/home.module.css";

// Elements
import { AboutMe } from "./components/Home/AboutMe/AboutMe";
import { WhatiLikeToDo } from "./components/Home/WhatILikeToDo/WhatiLikeToDo";
import BentoText from "./components/Home/BentoText/BentoText";

// Assets
import ExtrudeGif from "../assets/images/SplashScreen.gif";
import ExtrudeGifLight from '../assets/images/SplashScreenLight.gif'

export default function Page() {
  return (
    <div className={styles.home}>
      <div className={styles.rowone}>
        <AboutMe />
        <WhatiLikeToDo />
      </div>
      <div className={styles.rowtwo}>
        <div className={styles.bentoswrapper}>
          <div className={styles.brow}>
            <BentoText type="text" text="hello!" data={'hello'} />
            <BentoText type="empty" />
          </div>
          <div className={styles.brow}>
            <BentoText type="text" text="my name is" data={'name'}/>
            <BentoText type="image" imageUrl={ExtrudeGif} imageUrlLight={ExtrudeGifLight} />
            <BentoText type="empty" />
          </div>
          <div className={styles.brow}>
            <BentoText type="text" text="full stack developer" data={'fullstack'}/>
            <BentoText type="empty" />
          </div>
        </div>
        <div className={styles.banner}>
          <p>
            I LIKE TO TRANSFORM IDEAS INTO USEFUL & hAPPY EXPERIENCES THROUGH
            WEB APPS!
          </p>
        </div>
      </div>
    </div>
  );
}
