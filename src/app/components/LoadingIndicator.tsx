import React, { ReactElement, useRef, useState } from 'react';
import useTimeout from '@/hooks/useTimeout';

type LoadingIndicatorProps = {
};
export const LoadingIndicator: React.FC<LoadingIndicatorProps> = (props): ReactElement => {
  const [visible, setVisible] = useState(false)

  const show = () => setVisible(true)

  useTimeout(show, 1200)

  return (
    <div>
      <p>
        {visible
          ? "Loading..."
          : ''}
      </p>
    </div>
  )
}
