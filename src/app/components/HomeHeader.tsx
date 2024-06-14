"use client";
// Core
import React from "react";
import Image from "next/image";
// Utils
// Ui Elements
import Badge from "./Badge";
import SocialLink from "./SocialLink";
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

const HomeHeader = () => {
  return (
    <div className={styles.homeHeader}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <Image
            src={AvatarImage}
            alt="Notion Avatar -  Javier Flores"
            width={256}
            height={256}
          />
        </div>
        <div className={styles.nameandtitle}>
          <h2>Javier Flores</h2>
          <div className={styles.titleandbadges}>
            <h4>
              Full Stack Developer<span>, with experience in</span>
            </h4>
            <div className={styles.badgeswrapper}>
              <Badge icon={<WebDesignIcon />} tooltipText="Web Design" />
              <Badge icon={<ApiDesignIcon />} tooltipText="API Development" />
              <Badge icon={<DbDesignIcon />} tooltipText="Database Design" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.aboutandlinks}>
        <div className={styles.itsabout}>
          <h4>
            Some of my learning experiences, note-worthy code, tutorials about
            common development patterns and general opinions about stuff.
          </h4>
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
              href="https://x.com/zjavier94"
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
            <SocialLink
              icon={<TikTokIcon />}
              href="https://www.tiktok.com/@zjavier94"
              ariaLabel="TikTok"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
