'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface BackgroundImageProps {}

const BackgroundImage: React.FC<BackgroundImageProps> = ({}) => {
  const [image, setImage] = useState<number>(0);

  const images: string[] = [
    '/images/image-1.png',
    '/images/image-2.png',
    '/images/image-3.png',
    '/images/image-4.png',
    '/images/image-5.png',
    '/images/image-6.png',
    '/images/image-7.png',
  ];

  useEffect(() => {
    if (image < images.length - 1) {
      const interval = setInterval(() => {
        setImage(image + 1);
      }, 1500);
      return () => clearInterval(interval);
    } else {
      return;
    }
  }, [image, images.length]);

  return (
    <div className="animate-fadeInBg background">
      <div className="static">
        <div className="flex justify-center m-auto ">
          <Image
            className="absolute"
            src={`/images/image-${image === 0 ? image + 1 : image}.png`}
            width={900}
            height={500}
            alt="notes"
            quality={10}
            priority
          />
          <Image
            className="absolute"
            src={`/images/image-${image + 1}.png`}
            width={900}
            height={500}
            alt="notes"
            quality={10}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default BackgroundImage;
