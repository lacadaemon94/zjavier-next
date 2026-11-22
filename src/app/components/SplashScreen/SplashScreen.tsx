"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../styles/splashscreen.module.css";
import LoadingImageDark from "../../../assets/images/SplashScreen.gif";

const HOLD_MS = 1200;
const FADE_MS = 300;
let hasPlayedSplash = false;

export const SplashScreen = () => {
  const [isFading, setIsFading] = useState(false);
  const [isMounted, setIsMounted] = useState(() => !hasPlayedSplash);

  useEffect(() => {
    if (!isMounted || hasPlayedSplash) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const holdMs = prefersReducedMotion ? 0 : HOLD_MS;
    const fadeMs = prefersReducedMotion ? 0 : FADE_MS;

    const fadeTimer = window.setTimeout(() => {
      setIsFading(true);
    }, holdMs);

    const unmountTimer = window.setTimeout(() => {
      hasPlayedSplash = true;
      setIsMounted(false);
    }, holdMs + fadeMs);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(unmountTimer);
    };
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={styles.splashscreen}
      data-theme="false"
      data-fading={isFading}
      aria-hidden="true"
    >
      <Image
        src={LoadingImageDark}
        alt=""
        width={512}
        height={512}
        priority
        unoptimized
      />
    </div>
  );
};