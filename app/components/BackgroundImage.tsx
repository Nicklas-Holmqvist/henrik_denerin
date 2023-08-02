'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
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
      }, 2500);
      return () => clearInterval(interval);
    } else {
      return;
    }
  }, [image, images.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 2 },
      }}>
      <Image src={`${images[image]}`} width={900} height={500} alt="notes" />
    </motion.div>
  );
};

export default BackgroundImage;
