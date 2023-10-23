// Splashscreen
import React, {useContext} from 'react'
import { SessionContext } from '@/app/utils/SessionProvider'
import Image from 'next/image'

// Styles
import styles from '../../styles/splashscreen.module.css'

// Assets
import LoadingImageDark from '../../../assets/images/SplashScreen.gif'
import LoadingImageLight from '../../../assets/images/SplashScreenLight.gif'

type Props = {}

export const SplashScreen = (props: Props) => {
  const { isLightTheme } = useContext(SessionContext);

  return (
    <div className={styles.splashscreen} data-theme={isLightTheme ? "true" : "false"}>
        <Image
            src={isLightTheme ? LoadingImageLight : LoadingImageDark }
            alt='ZJAVIER'
            width={512}
            height={512}
        />
    </div>
  )
}