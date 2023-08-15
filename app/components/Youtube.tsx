'use client';

import React from 'react';
import ReactPlayer from 'react-player';

interface YoutubeProps {
  url: string;
}

const Youtube: React.FC<YoutubeProps> = ({ url }) => {
  return <ReactPlayer controls url={`${url}`} />;
};

export default Youtube;
