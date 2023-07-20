"use client";
import React, { useContext } from "react";
import { SessionContext } from "@/app/utils/SessionProvider";
import { motion } from "framer-motion";

// Styles
import styles from "../../styles/topbar.module.css";

// Icons
import LogoIcon from "@/assets/icons/LogoIcon";
import HomeIcon from "@/assets/icons/HomeIcon";
import ProjectsIcon from "@/assets/icons/ProjectsIcon";
import NotesIcon from "@/assets/icons/NotesIcon";
import ContactIcon from "@/assets/icons/ContactIcon";
import GithubIcon from "@/assets/icons/GithubIcon";
import TwitterIcon from "@/assets/icons/TwitterIcon";
import CodesandboxIcon from "@/assets/icons/CodesandboxIcon";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import DribbbleIcon from "@/assets/icons/DribbbleIcon";
import BehanceIcon from "@/assets/icons/BehanceIcon";

// Elements
import Button from "@/app/elements/buttons/Button";
import NavButton from "@/app/elements/buttons/NavButton";
import ExternalLink from "@/app/elements/buttons/ExternalLink";

type Props = {};

export const Topbar = (props: Props) => {
  const { toggleTheme } = useContext(SessionContext);
  // const isLightTheme = useContext(SessionContext);

  return (
    <div className={styles.xmenu}>
      <div className={styles.topbar}>
        <Button
          type="button"
          className={styles.logo}
          ariaLabel="Change Theme"
          onClick={toggleTheme}
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
      <div className={styles.navbar}>
        <div className={styles.wrapper}>
          <NavButton href="/" ariaLabel={"Home"} icon={<HomeIcon />} />
          <NavButton href="/projects" ariaLabel={"Projects"} icon={<ProjectsIcon />} />
          <NavButton href="/notes" ariaLabel={"Notes"} icon={<NotesIcon />} />
          <NavButton href="/contact" ariaLabel={"Contact"} icon={<ContactIcon />} />
        </div>
      </div>
    </div>
  );
};
