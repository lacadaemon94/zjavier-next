"use client"
import React, { useState, useContext } from "react";
import { motion } from "framer-motion";

// Styles
import styles from "../../../styles/home.module.css";

// Icons
import GridIcon from "@/assets/icons/GridIcon";
import ListIcon from "@/assets/icons/ListIcon";
import LockIcon from "@/assets/icons/LockIcon";
import LeftArrowIcon from "@/assets/icons/LeftArrowIcon";
import RightArrowIcon from "@/assets/icons/RightArrowIcon";
import PencilIcon from "@/assets/icons/PencilIcon";
import CursorClickIcon from "@/assets/icons/CursorClickIcon";
import FireIcon from "@/assets/icons/FireIcon";
import TerminalIcon from "@/assets/icons/TerminalIcon";
import CodeIcon from "@/assets/icons/CodeIcon";
import SparklesOutlineIcon from "@/assets/icons/SparklesIcon";

// Elements
import Button from "@/app/elements/buttons/Button";
import Area from "./Area/Area";

type Props = {};

export const WhatiLikeToDo = (props: Props) => {
  const [isView, setIsView] = useState('grid');

  return (
    <div className={styles.whatiliketodo}>
      <div className={styles.navbar}>
        <div className={styles.controls}>
          <Button
            type="button"
            ariaLabel="Set Grid View"
            className={styles.gridview}
            onClick={() => setIsView('grid')}
          >
            <GridIcon />
          </Button>
          <Button
            type="button"
            ariaLabel="Set List View"
            className={styles.listview}
            onClick={() => setIsView('list')}
          >
            <ListIcon />
          </Button>
        </div>
        <div className={styles.addressbar}>
          <div className={styles.ssl}>
            <LockIcon />
          </div>
          <p>https://whatilike.todo/uiuxfrontbackenddev</p>
        </div>
        <div className={styles.navigation}>
          <Button
            type="button"
            ariaLabel="Go Back"
            className={styles.navbutton}
          >
            <LeftArrowIcon />
          </Button>
          <Button
            type="button"
            ariaLabel="Go Forward"
            className={styles.navbutton}
          >
            <RightArrowIcon />
          </Button>
        </div>
      </div>
      <motion.div layout data-isview={isView} className={styles.areas}>
        <Area icon={<PencilIcon />} text={"UI&UX Design"} />
        <Area icon={<CursorClickIcon />} text={"Prototyping"} />
        <Area icon={<FireIcon />} text={"Branding Guidelines"} />
        <Area icon={<TerminalIcon />} text={"Backend Support & Development"} />
        <Area icon={<CodeIcon />} text={"Frontend Support & Development"} />
        <Area icon={<SparklesOutlineIcon />} text={"AI Tuning & Integration"} />
      </motion.div>
    </div>
  );
};
