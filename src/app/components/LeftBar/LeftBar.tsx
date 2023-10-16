"use client";
import React from "react";
import { useSelectedLayoutSegments } from "next/navigation";
import { motion } from "framer-motion";

// Styles
import styles from "../../styles/leftbar.module.css";

// Icons
import HomeIcon from "@/assets/icons/HomeIcon";
import ProjectsIcon from "@/assets/icons/ProjectsIcon";
import NotesIcon from "@/assets/icons/NotesIcon";
import ContactIcon from "@/assets/icons/ContactIcon";

// Elements
import NavButton from "@/app/elements/buttons/NavButton";

type Props = {};

export const Leftbar = (props: Props) => {
  const segment = useSelectedLayoutSegments();
  const isNote = segment.length > 1;

  return (
    <div className={styles.navbar} data-isnote={isNote === true ? "true" : "false"}>
      <div className={styles.wrapper}>
        <NavButton href="/" ariaLabel={"Home"} icon={<HomeIcon />} />
        <NavButton
          href="/projects"
          ariaLabel={"Projects"}
          icon={<ProjectsIcon />}
        />
        <NavButton href="/notes" ariaLabel={"Notes"} icon={<NotesIcon />} />
        <NavButton
          href="/contact"
          ariaLabel={"Contact"}
          icon={<ContactIcon />}
        />
      </div>
    </div>
  );
};
