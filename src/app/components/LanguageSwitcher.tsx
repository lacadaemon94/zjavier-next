"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LANGUAGE_COOKIE, type Locale } from "../i18n/config";
import styles from "../styles/languageswitcher.module.css";

type Props = {
  locale: Locale;
  labels: {
    label: string;
    english: string;
    spanish: string;
    setEnglish: string;
    setSpanish: string;
  };
  className?: string;
};

const cookieMaxAge = 60 * 60 * 24 * 365;

const LanguageSwitcher = ({ locale, labels, className }: Props) => {
  const router = useRouter();

  const setLocale = (nextLocale: Locale) => {
    document.cookie = `${LANGUAGE_COOKIE}=${nextLocale}; path=/; max-age=${cookieMaxAge}; samesite=lax`;
    router.refresh();
  };

  return (
    <div
      className={`${styles.switcher}${className ? ` ${className}` : ""}`}
      aria-label={labels.label}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-label={labels.setEnglish}
        data-isactive={locale === "en"}
      >
        {labels.english}
      </button>
      <button
        type="button"
        onClick={() => setLocale("es")}
        aria-label={labels.setSpanish}
        data-isactive={locale === "es"}
      >
        {labels.spanish}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
