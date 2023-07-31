import React, { useState, useContext } from "react";
import { SessionContext } from "@/app/utils/SessionProvider";
import Image from "next/image";

// Styles
import styles from "../../../styles/projects.module.css";

// Icons
import ArrowUpIcon from "@/assets/icons/ArrowUpIcon";
import ArrowDownIcon from "@/assets/icons/ArrowDownIcon";
import LinkIcon from "@/assets/icons/LinkIcon";

// Elements
import Button from "@/app/elements/buttons/Button";
import ExternalLink from "@/app/elements/buttons/ExternalLink";

// Helpers
import { renderSquares } from "./helpers/renderSquares";

type ImageData = {
  dark: string;
  light: string;
};

type ProjectDetails = {
  designPhase: string;
  codingPhase: string;
  released: boolean;
};

type ProjectData = {
  name: string;
  link: string;
  type: string;
  framework: string;
  details: ProjectDetails;
  description: string;
  images: {
    desktop: ImageData;
    mobile: ImageData;
  };
  logos: ImageData;
};

type Props = {
  data: ProjectData[];
  activeProject: number;
  setActiveProject: React.Dispatch<React.SetStateAction<number>>
};

export const FileSystem = ({ data, activeProject, setActiveProject }: Props) => {
  const isLightTheme = useContext(SessionContext).isLightTheme ? 'light' : 'dark';

  return (
    <div className={styles.filesystem}>
      <div className={styles.navigator}>
        <div className={styles.title}>
          <ExternalLink linkUrl={data[activeProject].link} ariaLabel={`${data[activeProject].name} - External Link`}>
            <LinkIcon />
          </ExternalLink>
          <h3>PROJECTS FILE SYSTEM</h3>
          <div className={styles.selectors}>
            <Button
              type="button"
              ariaLabel="Up"
              className={styles.selector}
              onClick={() =>
                setActiveProject((prevProject) =>
                  prevProject === 0 ? data.length - 1 : prevProject - 1
                )
              }
            >
              <ArrowUpIcon />
            </Button>
            <Button
              type="button"
              ariaLabel="Down"
              className={styles.selector}
              onClick={() =>
                setActiveProject((prevProject) =>
                  prevProject === data.length - 1 ? 0 : prevProject + 1
                )
              }
            >
              <ArrowDownIcon />
            </Button>
          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.header}>
            <div>name</div>
            <div>type</div>
            <div>main framework</div>
          </div>
          {data.map((project, index) => (
            <div className={styles.row} key={index} data-isactive={index === activeProject}>
              <div className={styles.item}>{project.name}</div>
              <div className={styles.item}>{project.type}</div>
              <div className={styles.item}>{project.framework}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.title}>
          <h2>{data[activeProject].name}</h2>
        </div>
        <div className={styles.content}>
          <div className={styles.statusandlogo}>
            <div className={styles.status}>
              <div className={styles.design}>
                <h5>Design Phase</h5>
                <div className={styles.value}>
                  <p>{data[activeProject].details.designPhase}</p>
                  <div className={styles.progress}>
                    {renderSquares(
                      data[activeProject].details.designPhase,
                      styles.filledsquare,
                      styles.emptysquare
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.coding}>
                <h5>Coding Phase</h5>
                <div className={styles.value}>
                  <p>{data[activeProject].details.codingPhase}</p>
                  <div className={styles.progress}>
                    {renderSquares(
                      data[activeProject].details.designPhase,
                      styles.filledsquare,
                      styles.emptysquare
                    )}
                  </div>
                </div>
              </div>
              <div
                className={styles.released}
                data-isreleased={data[activeProject].details.released}
              >
                <h5>Released</h5>
                <div className={styles.yesorno}>
                  <p>Yes</p>
                  <p>No</p>
                </div>
              </div>
            </div>
            <div className={styles.logo}>
                <Image
                    src={data[activeProject].logos[isLightTheme]}
                    alt={`${data[activeProject].name} - Logo`}
                    width={512}
                    height={512}
                />
            </div>
          </div>
          <div className={styles.description}>
            <p>{data[activeProject].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
