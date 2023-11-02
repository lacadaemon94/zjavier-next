// Types
import React from "react";
import { Option } from "../elements/DropDown";
// Icons
import CodeIcon from "@/assets/icons/CodeIcon";

const getIconForProject = (project: string): JSX.Element | undefined => {
  switch (project) {
    case "none":
      return <CodeIcon />;
    default:
      return undefined;
  }
};

export const getDropDownOptions = (postsProjects: string[]): Option[] => {
  return postsProjects
    .map((project) => ({
      name: project,
      icon: getIconForProject(project),
    }))
    .filter((option) => option.icon !== undefined);
};
