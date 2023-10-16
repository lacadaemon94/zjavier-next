// Core
import React from "react";

// Styles
import styles from '../../styles/sideimage.module.css'

// Ui Elements
import { BlurImage } from "./BlurImage";

type Props = {
  src: string;
  alt: string;
  caption: string;
};

export const AsideImage = (props: Props) => {
  return (
    <div className={styles.sideimage}>
      <BlurImage
        src={props.src}
        alt={props.alt}
        caption={props.caption}
      />
    </div>
  );
};
