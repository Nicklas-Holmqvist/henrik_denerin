import React from 'react';
import { Spotify } from 'react-spotify-embed';

interface SpotifyProps {
  url: string;
}

const SpotifyPlayer: React.FC<SpotifyProps> = ({ url }) => {
  return (
    <div className="py-16">
      <Spotify wide link={`${url}`} />
    </div>
  );
};

export default SpotifyPlayer;
