// Core
import React, { useState, useEffect } from "react";
// Styles
import styles from "../../styles/notes.module.css";
// Icons
import CodeIcon from "@/assets/icons/CodeIcon";
import { DropDown, Option } from "@/app/elements/DropDown";
import { getDropDownOptions } from "@/app/utils/getDropDownOptions";
import { DropDownPill } from "@/app/elements/DropDownPill";
import FilterIcon from "@/assets/icons/FilterIcon";

type Props = {
  posts_projects: string[];
};

export const NotesFilter = ({ posts_projects }: Props) => {
  const defaultOption = { name: "none", icon: <CodeIcon /> };
  const [selectedOption, setSelectedOption] = useState<Option>(defaultOption);
  const options = getDropDownOptions(posts_projects);

  const handleSelectedOption = (selected: Option) => {
    setSelectedOption(selected)
  };

  return (
    <div className={styles.filterwrapper}>
      <DropDownPill options={options} selectedOption={selectedOption} className={styles.selectedpill} />
      <DropDown
        options={options}
        className={styles.filterbutton}
        icon={<FilterIcon />}
        optionsIcon={false}
        setSelected={handleSelectedOption}
      />
    </div>
  );
};
