import React from 'react';

interface WorkInfoTextProps {
  title: string;
  text: string | undefined;
  haveText?: string;
}

const WorkInfoText: React.FC<WorkInfoTextProps> = ({
  title,
  text,
  haveText = 'true',
}) => {
  return (
    <>
      {haveText ? (
        <p className="text-center py-2.5">
          <span className="font-bold">{title}: </span>
          {text}
        </p>
      ) : null}
    </>
  );
};

export default WorkInfoText;
