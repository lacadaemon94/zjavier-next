// Core
import React from "react"
import Image from "next/image";

// Styles
import styles from '../../styles/sideimage.module.css'

type Props = {
  src: string;
  alt: string;
  caption: string;
};

export const BlurImage = ({ caption, ...imageProps }: Props) => {
  return (
    <div className={styles.blurimage}>
      <Image
        {...imageProps}
        src={imageProps.src}
        alt={imageProps.alt}
        placeholder="blur"
        blurDataURL={`data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==`}
        fill={true}
      />
      <caption>{caption}</caption>
    </div>
  );
};
