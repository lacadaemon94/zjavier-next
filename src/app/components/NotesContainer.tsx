"use client";
// Core
import React from "react";
// Utils
import { useDropdownState } from "../utils/useDropDownState";
import useFilteredAndSortedPosts from "../utils/useFilteredAndSortedPosts";
import { FILTER_CATEGORIES as categories } from "../constants/postCategories";
import { sortings } from "../utils/useFilteredAndSortedPosts";
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
import type { PostWithStats } from "@/app/lib/posts/postWithStats";
import type { Locale } from "../i18n/config";
import type { Dictionary } from "../i18n/dictionaries";

type Props = {
  posts: PostWithStats[];
  locale: Locale;
  copy: Dictionary["notes"];
};

const NotesContainer = ({ posts, locale, copy }: Props) => {
  const {
    isOpen: isFilterOpen,
    toggleDropdown: toggleFilter,
    ref: filterRef,
  } = useDropdownState();

  const {
    isOpen: isSortOpen,
    toggleDropdown: toggleSort,
    ref: sortRef,
  } = useDropdownState();

  const {
    filteredAndSortedPosts,
    handleFilter,
    handleSort,
    selectedCategory,
    sortType,
  } = useFilteredAndSortedPosts(posts);

  return (
    <div className={styles.notescontainer}>
      <div className={styles.modifierswrapper}>
        <DropDown
          icon={<FilterIcon />}
          ariaLabel={copy.filter}
          isOpen={isFilterOpen}
          toggleDropdown={toggleFilter}
          ref={filterRef}
        >
          <DropDownOption
            icon={<AllIcon />}
            text={copy.all}
            ariaLabel={copy.showAll}
            action={() => handleFilter(categories.ALL)}
            isActive={selectedCategory === categories.ALL}
          />
          <DropDownOption
            icon={<TutorialIcon />}
            text={copy.tutorials}
            ariaLabel={copy.showTutorials}
            action={() => handleFilter(categories.TUTORIAL)}
            isActive={selectedCategory === categories.TUTORIAL}
          />
          <DropDownOption
            icon={<OpinionIcon />}
            text={copy.opinions}
            ariaLabel={copy.showOpinions}
            action={() => handleFilter(categories.OPINION)}
            isActive={selectedCategory === categories.OPINION}
          />
          <DropDownOption
            icon={<NoteIcon />}
            text={copy.notes}
            ariaLabel={copy.showNotes}
            action={() => handleFilter(categories.NOTE)}
            isActive={selectedCategory === categories.NOTE}
          />
        </DropDown>
        <DropDown
          icon={<SortIcon />}
          ariaLabel={copy.sort}
          isOpen={isSortOpen}
          toggleDropdown={toggleSort}
          ref={sortRef}
        >
          <DropDownOption
            icon={<DateSortIcon />}
            text={copy.byDate}
            ariaLabel={copy.byDate}
            action={() => handleSort("date")}
            isActive={sortType === sortings.DATE}
          />
          <DropDownOption
            icon={<LikeIcon />}
            text={copy.byLikes}
            ariaLabel={copy.byLikes}
            action={() => handleSort("likes")}
            isActive={sortType === sortings.LIKES}
          />
          <DropDownOption
            icon={<ViewIcon />}
            text={copy.byViews}
            ariaLabel={copy.byViews}
            action={() => handleSort("views")}
            isActive={sortType === sortings.VIEWS}
          />
        </DropDown>
      </div>
      <Posts locale={locale} posts={filteredAndSortedPosts} />
    </div>
  );
};

export default NotesContainer;
