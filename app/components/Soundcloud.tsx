'use client';

import React from 'react';
import ReactPlayer from 'react-player/soundcloud';

interface SoundcloudProps {
  url: string;
}

const Soundcloud: React.FC<SoundcloudProps> = ({ url }) => {
  return <ReactPlayer url={`${url}`} />;
};

export default Soundcloud;
