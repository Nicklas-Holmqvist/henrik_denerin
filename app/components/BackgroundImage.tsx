import Image from 'next/image';
import React from 'react';

interface BackgroundImageProps {}

const BackgroundImage: React.FC<BackgroundImageProps> = ({}) => {
  return (
    <div className="animate-fadeInBg background">
      <div className="static">
        <div className="flex justify-center m-auto ">
          <Image
            className="absolute"
            src={`/images/landing-score.gif`}
            width={900}
            height={500}
            alt="notes"
            quality={10}
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default BackgroundImage;
