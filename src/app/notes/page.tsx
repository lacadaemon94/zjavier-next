// Notes
import React from "react";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";

// Styles
import styles from "../styles/notes.module.css";
import { Notes } from "../components/notes/Notes";

export default function Page() {
  return (
    <div className={styles.notes}>
      <Notes posts={allPosts} />
    </div>
  );
}
