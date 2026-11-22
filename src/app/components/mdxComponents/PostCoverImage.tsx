"use client";

import React, { useEffect, useRef, useState } from "react";
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
  priority = true,
}: Props) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isLoaded, setLoaded] = useState(priority);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <figure
      className={styles.cover}
      data-loaded={isLoaded}
      data-priority={priority}
    >
      <div className={styles.imageFrame}>
        <Image
          ref={imgRef}
          src={src}
          alt={alt}
          width={1672}
          height={941}
          sizes="(max-width: 768px) 100vw, 964px"
          placeholder="blur"
          blurDataURL={blurDataURL}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          onLoad={() => setLoaded(true)}
        />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
