import React, { useState, useContext } from 'react'
import { SessionContext } from '@/app/utils/SessionProvider'
import Image from 'next/image'

// Styles
import styles from '../../../styles/projects.module.css'

// Icons
import DesktopIcon from '@/assets/icons/DesktopIcon'
import MobileIcon from '@/assets/icons/MobileIcon'

// Elements
import Button from '@/app/elements/buttons/Button'


type ImageData = {
    dark: string;
    light: string;
  };
  
  type ProjectDetails = {
    designPhase: string;
    codingPhase: string;
    released: boolean;
  };
  
  type ProjectData = {
    name: string;
    link: string;
    type: string;
    framework: string;
    details: ProjectDetails;
    description: string;
    images: {
      desktop: ImageData;
      mobile: ImageData;
    };
    logos: ImageData;
  };
  
  type Props = {
    data: ProjectData[];
    activeProject: number;
  };

export const Preview = ({ data, activeProject }: Props) => {
  const [viewType, setViewType] = useState('desktop');
  const isLightTheme = useContext(SessionContext).isLightTheme ? 'light' : 'dark';

  return (
    <div className={styles.preview}>
        <div className={styles.device} data-isview={viewType}>
            <Button type='button' ariaLabel='Mobile View' onClick={() => setViewType('mobile')}>
                <MobileIcon />
            </Button>
            <Button type='button' ariaLabel='Desktop View' onClick={() => setViewType('desktop')}>
                <DesktopIcon />
            </Button>
        </div>
        <div className={styles.container} data-isview={viewType}>
            <Image
                src={data[activeProject].images[viewType as 'desktop' | 'mobile'][isLightTheme]}
                alt={`${viewType} - ${data[activeProject].name}`}
                width={2208}
                height={1824}
            />
        </div>
    </div>
  )
}