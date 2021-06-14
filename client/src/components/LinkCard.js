import React from 'react';

export const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Link</h2>
      <p>Shorted link: <a href={link.to} target="_blank" rel="noreferrer">{link.to}</a></p>
      <p>Link before: <a href={link.from} target="_blank" rel="noreferrer">{link.from}</a></p>
      <p>Clicks on link: <strong>{link.clicks}</strong></p>
      <p>Date create: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
    </>
  )
}
