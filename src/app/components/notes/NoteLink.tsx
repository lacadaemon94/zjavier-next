// Core
import React from "react";
import Link from "next/link";
import format from "date-fns/format";
// Types
import { Post } from "contentlayer/generated";
// Styles
import styles from "../../styles/notes.module.css";
// Ui Elements
import { DetailPill } from "./DetailPill";
import CalendarIcon from "@/assets/icons/CalendarIcon";
import EyeIcon from "@/assets/icons/EyeIcon";
import HeartIconFilled from "@/assets/icons/HeartIconFilled";
import RightArrowIcon from "@/assets/icons/RightArrowIcon";

type Props = {
  post: Post;
};

export const NoteLink = ({ post }: Props) => {
  return (
    <Link
      href={"/notes/nodemailer-zoho-integration"}
      className={styles.notelink}
    >
      <div className={styles.header}>
        <div className={styles.title}>
          <h3>{post.title}</h3>
          <div className={styles.gotohover}>
            <RightArrowIcon />
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.detailswrapper}>
            <DetailPill
              icon={<CalendarIcon />}
              value={format(new Date(post.publishedAt), "MMM dd")}
              className={styles.detailpill}
            />
            <DetailPill
              icon={<EyeIcon />}
              value={"5"}
              className={styles.detailpill}
            />
            <DetailPill
              icon={<HeartIconFilled />}
              value={"32"}
              className={styles.detailpill}
            />
          </div>
        </div>
      </div>
      <p className={styles.excerpt}>{post.excerpt}</p>
    </Link>
  );
};
