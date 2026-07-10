"use client";
// Core
import React from "react";
import Image from "next/image";
// Utils
// Ui Elements
import Badge from "./Badge";
import SocialLink from "./SocialLink";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale } from "../i18n/config";
import type { Dictionary } from "../i18n/dictionaries";
// Assets
import WebDesignIcon from "@/assets/icons/WebDesignIcon";
import ApiDesignIcon from "@/assets/icons/ApiDesignIcon";
import DbDesignIcon from "@/assets/icons/DbDesignIcon";
import LinkedInIcon from "@/assets/icons/LinkedInIcon";
import WhatsAppIcon from "@/assets/icons/WhatsAppIcon";
import TelegramIcon from "@/assets/icons/TelegramIcon";
import GitHubIcon from "@/assets/icons/GitHubIcon";
import XIcon from "@/assets/icons/XIcon";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import YouTubeIcon from "@/assets/icons/YouTubeIcon";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import TikTokIcon from "@/assets/icons/TikTokIcon";
import AvatarImage from "../../assets/images/avatar.png";
// Styles
import styles from "../styles/homeheader.module.css";

type Props = {
  locale: Locale;
  copy: Dictionary["home"];
  language: Dictionary["language"];
};

const HomeHeader = ({ locale, copy, language }: Props) => {
  return (
    <div className={styles.homeHeader}>
      <LanguageSwitcher locale={locale} labels={language} />
      <div className={styles.header}>
        <div className={styles.avatar}>
          <Image
            src={AvatarImage}
            alt={copy.avatarAlt}
            width={256}
            height={256}
          />
        </div>
        <div className={styles.nameandtitle}>
          <h2>Javier Flores</h2>
          <div className={styles.titleandbadges}>
            <h4>
              {copy.title}
              <span>{copy.titleSuffix}</span>
            </h4>
            <div className={styles.badgeswrapper}>
              <Badge
                icon={<WebDesignIcon />}
                tooltipText={copy.badges.webDesign}
              />
              <Badge
                icon={<ApiDesignIcon />}
                tooltipText={copy.badges.apiDevelopment}
              />
              <Badge
                icon={<DbDesignIcon />}
                tooltipText={copy.badges.databaseDesign}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.aboutandlinks}>
        <div className={styles.itsabout}>
          <h4>{copy.about}</h4>
        </div>
        <div className={styles.linkswrapper}>
          <div className={styles.column}>
            <SocialLink
              icon={<LinkedInIcon />}
              href="https://www.linkedin.com/in/zjavier94/"
              ariaLabel="LinkedIn"
            />
            <SocialLink
              icon={<WhatsAppIcon />}
              href="https://api.whatsapp.com/send?phone=50370533409&text=Hola!"
              ariaLabel="WhatsApp"
            />
            <SocialLink
              icon={<TelegramIcon />}
              href="https://t.me/zjavier94"
              ariaLabel="Telegram"
            />
            <SocialLink
              icon={<GitHubIcon />}
              href="https://github.com/lacadaemon94"
              ariaLabel="GitHub"
            />
          </div>
          <div className={styles.column}>
            <SocialLink
              icon={<XIcon />}
              href="https://x.com/zj_javier94"
              ariaLabel="X/Twitter"
            />
            <SocialLink
              icon={<FacebookIcon />}
              href="https://www.facebook.com/zjavier22"
              ariaLabel="Facebook"
            />
            <SocialLink
              icon={<YouTubeIcon />}
              href="https://www.youtube.com/@zjavier94"
              ariaLabel="YouTube"
            />
            <SocialLink
              icon={<InstagramIcon />}
              href="https://www.instagram.com/zjavier94/"
              ariaLabel="Instagram"
            />
            {/* <SocialLink
              icon={<TikTokIcon />}
              href="https://www.tiktok.com/@zjavier94"
              ariaLabel="TikTok"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
