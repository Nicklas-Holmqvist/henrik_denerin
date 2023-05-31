import React from 'react';

import Youtube from './Youtube';
import Soundcloud from './Soundcloud';

interface MediaPlayerProps {
  url: string;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ url }) => {
  return (
    <article className="flex justify-center m-auto py-4">
      {url.includes('soundcloud') ? (
        <Soundcloud url={url} />
      ) : (
        <Youtube url={url} />
      )}
    </article>
  );
};

export default MediaPlayer;
