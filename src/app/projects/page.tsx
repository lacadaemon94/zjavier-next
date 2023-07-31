// Projects
"use client"
import React, { useState } from 'react'

// Styles
import styles from '../styles/projects.module.css'

// Data
import data from './json/data.json'

// Elements
import { FileSystem } from '../components/projects/FileSystem/FileSystem'
import { Preview } from '../components/projects/Preview/Preview'

export default function Page() {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <div className={styles.projects}>
      <FileSystem data={data.projects} activeProject={activeProject} setActiveProject={setActiveProject} />
      <Preview data={data.projects} activeProject={activeProject} />
    </div>
  )
}