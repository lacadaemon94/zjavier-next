"use client"
import React, { useContext } from "react";
import { SessionContext } from "@/app/utils/SessionProvider";
import Image, { StaticImageData } from "next/image";

// Styles
import styles from "../../../styles/home.module.css";

type Props = {
  type: "text" | "image" | "empty";
  text?: string;
  imageUrl?: StaticImageData;
  imageUrlLight?: StaticImageData;
};

const BentoText = ({ type, text, imageUrl, imageUrlLight }: Props) => {
  const isLightTheme = useContext(SessionContext);

  return (
    <>
      {type === "text" ? (
        <div className={styles.bentotext}>
          <p>{text}</p>
        </div>
      ) : type === "image" ? (
        <div className={styles.bentoimage}>
          {imageUrl && imageUrlLight && <Image src={isLightTheme.isLightTheme ? imageUrlLight : imageUrl} alt="Javier Extrude" />}
        </div>
      ) : (
        <div className={styles.bentospace}></div>
      )}
    </>
  );
};

export default BentoText;
