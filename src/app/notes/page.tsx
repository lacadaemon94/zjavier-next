// Notes
import React from "react";
import Link from "next/link";

// Styles
import styles from "../styles/notes.module.css";

export default function Page() {
  return (
    <div>
      Notes
      <Link href={"/notes/hello-world"} className="bg-amber-400 w-fit rounded-lg p-4">
        Optional
      </Link>
    </div>
  );
}
