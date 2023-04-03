import React, { ReactElement } from 'react';

export const RightArrow: React.FC = (props): ReactElement => {
  return (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7"></path>
    </svg>
  );
}

RightArrow.displayName = "RightArrow";

RightArrow.defaultProps = {
};

RightArrow.propTypes = {
};


export default RightArrow;
