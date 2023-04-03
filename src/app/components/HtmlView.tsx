import * as React from 'react';

export const HtmlView = (props) => {
  const { html, className } = props;
  return (
    <div
      className={`myeditor prose max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
