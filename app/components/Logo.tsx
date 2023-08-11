import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

interface LogoProps {
  src: string;
  alt: string;
}

const Logo: React.FC<LogoProps> = ({ src, alt }) => {
  return (
    <Link href="/">
      <Image
        className="px-5 lg:max-2xl:px-0 animate-fadeIn z-30"
        src={src}
        width={180}
        height={60}
        alt={`${alt}`}
        priority
      />
    </Link>
  );
};

export default Logo;
