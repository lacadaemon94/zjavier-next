"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";

// Styles
import styles from "../../../styles/home.module.css";

type Props = {
  type: "text" | "image" | "empty";
  text?: string;
  imageUrl?: StaticImageData;
  imageUrlLight?: StaticImageData;
  data?: string;
};

const BentoText = ({ type, text, imageUrl, imageUrlLight, data }: Props) => {
  return (
    <>
      {type === "text" ? (
        <div className={styles.bentotext} data-is={data}>
          <p>{text}</p>
        </div>
      ) : type === "image" ? (
        <div className={styles.bentoimage}>
          {imageUrl && imageUrlLight && (
            <Image src={imageUrl} alt="Javier Extrude" />
          )}
        </div>
      ) : (
        <div className={styles.bentospace}></div>
      )}
    </>
  );
};

export default BentoText;
