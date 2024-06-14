"use client";
// Core
import React from "react";
// Utils
import { useDropdownState } from "../utils/useDropDownState";
import useFilteredAndSortedPosts from "../utils/useFilteredAndSortedPosts";
import { categories, sortings } from "../utils/useFilteredAndSortedPosts";
// Ui Elements
import { Posts } from "./notes/Posts";
import DropDown from "./DropDown/DropDown";
import DropDownOption from "./DropDown/DropDownOption";
// Styles
import styles from "../styles/home.module.css";
// Assets
import FilterIcon from "@/assets/icons/FilterIcon";
import AllIcon from "@/assets/icons/AllIcon";
import TutorialIcon from "@/assets/icons/TutorialIcon";
import OpinionIcon from "@/assets/icons/OpinionIcon";
import NoteIcon from "@/assets/icons/NoteIcon";
import SortIcon from "@/assets/icons/SortIcon";
import DateSortIcon from "@/assets/icons/DateSortIcon";
import LikeIcon from "@/assets/icons/LikeIcon";
import ViewIcon from "@/assets/icons/ViewIcon";

type Props = {};

const NotesContainer = (props: Props) => {
  const filterDropDown = useDropdownState();
  const sortDropDown = useDropdownState();

  const {
    filteredAndSortedPosts,
    handleFilter,
    handleSort,
    selectedCategory,
    sortType,
  } = useFilteredAndSortedPosts();

  return (
    <div className={styles.notescontainer}>
      <div className={styles.modifierswrapper}>
        <DropDown
          icon={<FilterIcon />}
          ariaLabel="Filter"
          isOpen={filterDropDown.isOpen}
          toggleDropdown={filterDropDown.toggleDropdown}
          ref={filterDropDown.ref}
        >
          <DropDownOption
            icon={<AllIcon />}
            text="All"
            ariaLabel="Show All"
            action={() => handleFilter(categories.ALL)}
            isActive={selectedCategory === categories.ALL}
          />
          <DropDownOption
            icon={<TutorialIcon />}
            text="Tutorials"
            ariaLabel="Show Tutorials"
            action={() => handleFilter(categories.TUTORIAL)}
            isActive={selectedCategory === categories.TUTORIAL}
          />
          <DropDownOption
            icon={<OpinionIcon />}
            text="Opinions"
            ariaLabel="Show Opinions"
            action={() => handleFilter(categories.OPINION)}
            isActive={selectedCategory === categories.OPINION}
          />
          <DropDownOption
            icon={<NoteIcon />}
            text="Notes"
            ariaLabel="Show Notes"
            action={() => handleFilter(categories.NOTE)}
            isActive={selectedCategory === categories.NOTE}
          />
        </DropDown>
        <DropDown
          icon={<SortIcon />}
          ariaLabel="Sort"
          isOpen={sortDropDown.isOpen}
          toggleDropdown={sortDropDown.toggleDropdown}
          ref={sortDropDown.ref}
        >
          <DropDownOption
            icon={<DateSortIcon />}
            text="By Date"
            ariaLabel="By Date"
            action={() => handleSort("date")}
            isActive={sortType === sortings.DATE}
          />
          <DropDownOption
            icon={<LikeIcon />}
            text="By Likes"
            ariaLabel="By Likes"
            action={() => handleSort("likes")}
            isActive={sortType === sortings.LIKES}
          />
          <DropDownOption
            icon={<ViewIcon />}
            text="By Views"
            ariaLabel="By Views"
            action={() => handleSort("views")}
            isActive={sortType === sortings.VIEWS}
          />
        </DropDown>
      </div>
      <Posts posts={filteredAndSortedPosts} />
    </div>
  );
};

export default NotesContainer;
