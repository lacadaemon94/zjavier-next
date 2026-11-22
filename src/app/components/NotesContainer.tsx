"use client";
// Core
import React from "react";
// Utils
import { useDropdownState } from "../utils/useDropDownState";
import useFilteredAndSortedPosts, {
  sortings,
  type LanguageFilter,
} from "../utils/useFilteredAndSortedPosts";
import {
  FILTER_CATEGORIES as categories,
  type PostCategory,
} from "../constants/postCategories";
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

function getCategoryIcon(category: PostCategory) {
  switch (category) {
    case "Tutorial":
      return <TutorialIcon />;
    case "Opinion":
      return <OpinionIcon />;
    default:
      return <NoteIcon />;
  }
}

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
    availableCategories,
    availableLanguages,
    handleFilter,
    handleLanguageFilter,
    handleSort,
    resetFilters,
    selectedCategory,
    selectedLanguage,
    sortType,
  } = useFilteredAndSortedPosts(posts);

  const languageOptions: Array<{ value: LanguageFilter; label: string }> = [
    { value: "all", label: copy.allLanguages },
    { value: "en", label: copy.englishPosts },
    { value: "es", label: copy.spanishPosts },
  ];

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
          {availableCategories.map((category) => {
            const label = copy.categories[category] ?? category;
            return (
              <DropDownOption
                key={category}
                icon={getCategoryIcon(category)}
                text={label}
                ariaLabel={`${copy.filter}: ${label}`}
                action={() => handleFilter(category)}
                isActive={selectedCategory === category}
              />
            );
          })}
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
        {availableLanguages.length > 1 && (
          <div
            className={styles.languageFilter}
            role="group"
            aria-label={copy.languageFilter}
          >
            {languageOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleLanguageFilter(option.value)}
                data-isactive={selectedLanguage === option.value}
                aria-pressed={selectedLanguage === option.value}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {filteredAndSortedPosts.length > 0 ? (
        <Posts locale={locale} posts={filteredAndSortedPosts} />
      ) : (
        <div className={styles.emptyState}>
          <p>{copy.emptyState}</p>
          <button
            type="button"
            className={styles.resetButton}
            onClick={resetFilters}
          >
            {copy.resetFilters}
          </button>
        </div>
      )}
    </div>
  );
};

export default NotesContainer;
