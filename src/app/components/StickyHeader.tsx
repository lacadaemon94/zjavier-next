"use client";
// Core
import React from "react";
import Image from "next/image";
// Utils
// Ui Elements
import SocialLink from "./SocialLink";
import LanguageSwitcher from "./LanguageSwitcher";
// Styles
import styles from "../styles/stickyheader.module.css";
// Assets
import XIcon from "@/assets/icons/XIcon";
import YouTubeIcon from "@/assets/icons/YouTubeIcon";
import GitHubIcon from "@/assets/icons/GitHubIcon";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import TikTokIcon from "@/assets/icons/TikTokIcon";
import AvatarImage from "../../assets/images/avatar.png";
import type { Locale } from "../i18n/config";
import type { Dictionary } from "../i18n/dictionaries";

type Props = {
  locale: Locale;
  avatarAlt: string;
  language: Dictionary["language"];
};

const StickyHeader = ({ locale, avatarAlt, language }: Props) => {
  return (
    <div className={styles.stickyheader}>
      <div className={styles.avatar}>
        <Image
          src={AvatarImage}
          alt={avatarAlt}
          width={128}
          height={128}
        />
      </div>
      <div className={styles.linkswrapper}>
        <SocialLink
          icon={<XIcon />}
          text="Not Twitter"
          href="https://x.com/zj_javier94"
          ariaLabel="Not Twitter"
          className={styles.shsociallink}
        />
        <SocialLink
          icon={<YouTubeIcon />}
          text="YouTube"
          href="https://www.youtube.com/@zjavier94"
          ariaLabel="YouTube"
          className={styles.shsociallink}
        />
        <SocialLink
          icon={<GitHubIcon />}
          text="GitHub"
          href="https://github.com/lacadaemon94"
          ariaLabel="GitHub"
          className={styles.shsociallink}
        />
        <SocialLink
          icon={<InstagramIcon />}
          text="Instagram"
          href="https://www.instagram.com/zjavier94/"
          ariaLabel="Instagram"
          className={styles.shsociallink}
        />
        {/* <SocialLink
          icon={<TikTokIcon />}
          text="TikTok"
          href="https://www.tiktok.com/@zjavier94"
          ariaLabel="TikTok"
          className={styles.shsociallink}
        /> */}
        <LanguageSwitcher locale={locale} labels={language} />
      </div>
    </div>
  );
};

export default StickyHeader;
