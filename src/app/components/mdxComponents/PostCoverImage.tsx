"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "../../styles/postcoverimage.module.css";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
};

const blurDataURL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

export function PostCoverImage({
  src,
  alt,
  caption,
  priority = false,
}: Props) {
  const [isLoaded, setLoaded] = useState(false);

  return (
    <figure className={styles.cover} data-loaded={isLoaded}>
      <div className={styles.imageFrame}>
        <Image
          src={src}
          alt={alt}
          width={1672}
          height={941}
          sizes="(max-width: 768px) 100vw, 964px"
          placeholder="blur"
          blurDataURL={blurDataURL}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
        />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
