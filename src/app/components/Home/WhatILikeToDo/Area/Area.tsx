import React from 'react'
import { motion } from 'framer-motion';

// Styles
import styles from '../../../../styles/home.module.css'

type Props = {
    icon: JSX.Element;
    text: string;
}

const Area = ({ icon, text }: Props) => {
  return (
    <motion.div layout className={styles.area}>
        <div className={styles.areaicon}>
            {icon}
        </div>
        <div className={styles.areatext}>
            <p>{text}</p>
        </div>
    </motion.div>
  )
}

export default Area