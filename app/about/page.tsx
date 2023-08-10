import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

import { AboutInterface } from '@/types/about';
import { Metadata } from 'next';

async function getAbout() {
  const res = await fetch(
    'https://stupendous-cobbler-4ff55e.netlify.app/api/about',
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return notFound();

  return res.json();
}

export const metadata: Metadata = {
  title: 'Composer Henrik Denerin | Aboutpage',
  description:
    'Henrik Denerin born 1978, is a Swedish composer and improvising performer whose works often prioritizes exploration over predictability, aiming to expand musical expression and meaning, challenging the relationship between score and sound while engaging performers as collaborators.',
};

export default async function About() {
  const about: AboutInterface = await getAbout();

  return (
    <main className="px-5 lg:max-2xl:px-0 pt-16">
      <div className="flex flex-col text-center pb-16">
        <div className="flex flex-row m-auto pb-1">
          <a href={about.about.image.url} download>
            <Image
              src={`${about.about.image.url}`}
              width={336}
              height={300}
              alt="Henrik Denerin 1"
            />
          </a>
          <a href={`${about.about.image2.url}`}>
            <Image
              src={`${about.about.image2.url}`}
              width={336}
              height={300}
              alt="Henrik Denerin 2"
            />
          </a>
        </div>
        <small>Click on pictures to download</small>
      </div>
      <ReactMarkdown className="max-w-2xl m-auto py-4 pb-16 markdown">
        {about.about.text}
      </ReactMarkdown>
      <ReactMarkdown className="max-w-2xl m-auto py-4 pb-16 markdown awards">
        {about.about.awardstext}
      </ReactMarkdown>
    </main>
  );
}
