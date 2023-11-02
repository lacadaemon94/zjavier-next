"use client";
// Core
import React, { useState, useEffect } from "react";
import Link from "next/link";
// Types
import { Post } from "contentlayer/generated";
// Styles
import styles from "../../styles/notes.module.css";
import { NotesFilter } from "./NotesFilter";
import { NoteLink } from "./NoteLink";
// Icons
// Ui Elements
type Props = {
  posts: Post[];
};

export const Notes = ({ posts }: Props) => {
  const postsProjects = posts.map((post) => post.project);

  return (
    <div className={styles.wrapper}>
      <div className={styles.notesheader}>
        <NotesFilter posts_projects={postsProjects} />
      </div>
      <div className={styles.noteswrapper}>
        {posts.map((post, index) => (
          <NoteLink key={index} post={post} />
        ))}
      </div>
    </div>
  );
};
