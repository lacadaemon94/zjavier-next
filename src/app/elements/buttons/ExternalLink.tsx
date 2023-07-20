import React from 'react'

type Props = {
  linkUrl: string;
  ariaLabel: string;
  children: React.ReactNode
}

const ExternalLink = ({ linkUrl, ariaLabel, children }: Props) => {
  return (
    <a href={linkUrl} aria-label={ariaLabel} rel="noopener noreferrer" target="_blank">
      {children}
      <div></div>
    </a>
  )
}

export default ExternalLink