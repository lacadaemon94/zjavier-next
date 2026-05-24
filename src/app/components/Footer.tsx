// Core
import React from "react";
// Utils
// Ui Elements
import SocialLink from "./SocialLink";
// Styles
import styles from "../styles/footer.module.css";
// Assets
import type { Dictionary } from "../i18n/dictionaries";

type Props = {
  copy: Dictionary["footer"];
};

const Footer = ({ copy }: Props) => {
  return (
    <div className={styles.footer}>
      <div className={styles.links}>
        <SocialLink
          text="X"
          ariaLabel="X Social"
          href="https://x.com/zjavier94"
          className={styles.footerlink}
        />
        <SocialLink
          text="YouTube"
          ariaLabel="YouTube"
          href="https://www.youtube.com/@zjavier94"
          className={styles.footerlink}
        />
        <SocialLink
          text="GitHub"
          ariaLabel="GitHub"
          href="https://github.com/lacadaemon94"
          className={styles.footerlink}
        />
        <SocialLink
          text="Instagram"
          ariaLabel="Instagram"
          href="https://www.instagram.com/zjavier94/"
          className={styles.footerlink}
        />
        <SocialLink
          text="TikTok"
          ariaLabel="TikTok"
          href="https://www.tiktok.com/@zjavier94"
          className={styles.footerlink}
        />
      </div>
      <div className={styles.disclaimer}>
        <p>{copy.builtWith}</p>
      </div>
    </div>
  );
};

export default Footer;
