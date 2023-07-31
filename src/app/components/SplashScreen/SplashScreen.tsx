// Splashscreen
import React from 'react'
import Image from 'next/image'

// Styles
import styles from '../../styles/splashscreen.module.css'

// Assets
import LoadingImage from '../../../assets/images/SplashScreen.gif'

type Props = {}

export const SplashScreen = (props: Props) => {
  return (
    <div className={styles.splashscreen}>
        <Image
            src={LoadingImage}
            alt='ZJAVIER'
            width={512}
            height={512}
        />
    </div>
  )
}