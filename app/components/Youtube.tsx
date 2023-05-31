'use client';

import React from 'react';
import ReactPlayer from 'react-player';

interface YoutubeProps {
  url: string;
}

const Youtube: React.FC<YoutubeProps> = ({ url }) => {
  return <ReactPlayer url={`${url}`} />;
};

export default Youtube;
