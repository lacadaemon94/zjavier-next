"use client";
import React from "react";
import { useSelectedLayoutSegments } from "next/navigation";
import { motion } from "framer-motion";

// Styles
import styles from "../../styles/topbar.module.css";

// Icons
import LogoIcon from "@/assets/icons/LogoIcon";
import GithubIcon from "@/assets/icons/GithubIcon";
import TwitterIcon from "@/assets/icons/TwitterIcon";
import CodesandboxIcon from "@/assets/icons/CodesandboxIcon";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import DribbbleIcon from "@/assets/icons/DribbbleIcon";
import BehanceIcon from "@/assets/icons/BehanceIcon";
import LeftArrowIcon from "@/assets/icons/LeftArrowIcon";

// Elements
import Button from "@/app/elements/buttons/Button";
import ExternalLink from "@/app/elements/buttons/ExternalLink";
import NavButton from "@/app/elements/buttons/NavButton";

type Props = {};

export const Topbar = (props: Props) => {
  const segment = useSelectedLayoutSegments();
  const isNote = segment.length > 1;

  return (
    <div className={styles.topbar} data-isnote={isNote ? "true" : "false"}>
      <Button
        type="button"
        className={styles.logo}
        ariaLabel="Change Theme"
      >
        <motion.div
          whileHover={{
            scale: 2,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            mass: 1,
          }}
        >
          <LogoIcon />
        </motion.div>
      </Button>
      <motion.div whileHover={{ scale: 1.1, transition: { duration: 0.2 } }} whileTap={{ scale: 0.9 }} style={{ display: isNote ? 'flex' : 'none' }}>
        <NavButton href="/notes" ariaLabel="Back to Notes" icon={<LeftArrowIcon />} className={styles.backnotes}/>
      </motion.div>
      <div className={styles.socialsbar}>
        <ExternalLink
          linkUrl="https://twitter.com/zjavier94"
          ariaLabel="Twitter Profile"
        >
          <TwitterIcon />
        </ExternalLink>
        <ExternalLink
          linkUrl="https://github.com/lacadaemon94"
          ariaLabel="Github Profile"
        >
          <GithubIcon />
        </ExternalLink>
        <ExternalLink
          linkUrl="https://codesandbox.io/u/lacadaemon94"
          ariaLabel="Codesandbox Profile"
        >
          <CodesandboxIcon />
        </ExternalLink>
        <ExternalLink
          linkUrl="https://www.instagram.com/zjavier94/"
          ariaLabel="Instagram Profile"
        >
          <InstagramIcon />
        </ExternalLink>
        <ExternalLink
          linkUrl="https://www.facebook.com/zjavier22"
          ariaLabel="Facebook Profile"
        >
          <FacebookIcon />
        </ExternalLink>
        <ExternalLink
          linkUrl="https://dribbble.com/zjavier94"
          ariaLabel="Dribbble Profile"
        >
          <DribbbleIcon />
        </ExternalLink>
        <ExternalLink
          linkUrl="https://www.behance.net/famflores1094fb"
          ariaLabel="Dribbble Profile"
        >
          <BehanceIcon />
        </ExternalLink>
      </div>
    </div>
  );
};
