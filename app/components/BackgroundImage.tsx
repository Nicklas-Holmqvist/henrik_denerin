'use client';

import Image from 'next/image';
import { easeInOut, motion } from 'framer-motion';
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

  const BackgroundImg = ({ number }: { number: number }) => {
    return (
      <>
        {number === 6 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 1.5 },
            }}>
            <Image
              src={`/images/image-${image + 1}.png`}
              width={900}
              height={500}
              alt="notes"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 1 },
            }}>
            <Image
              src={`/images/image-${image + 1}.png`}
              width={900}
              height={500}
              alt="notes"
            />
          </motion.div>
        )}
      </>
    );
  };

  return <BackgroundImg number={image} />;
};

export default BackgroundImage;
