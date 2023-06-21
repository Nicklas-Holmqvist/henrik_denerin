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
        className="px-5 lg:max-2xl:px-0"
        src={src}
        width={150}
        height={50}
        alt={`${alt}`}
        priority
      />
    </Link>
  );
};

export default Logo;
