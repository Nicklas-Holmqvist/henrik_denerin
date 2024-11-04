import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import ReactMarkdown from 'react-markdown';
import { datoRequest } from '@/lib/datocms';
import Image from 'next/image';

import { AboutInterface } from '@/types/about';

export const metadata = {
  title: 'About | HENRIK DENERIN – composer',
};

const query = `query About {
  about {
      image {
        url
        alt
      }
      image2 {
        url
        alt
      }
      text(markdown: false)
      awardstext
    }
}`;

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getAbout() {
  const res: any = await datoRequest({
    query: query,
  });

  if (!res) return notFound();

  return res;
}

const About = async () => {
  const about: AboutInterface = await getAbout();

  return (
    <main className="">
      <Suspense fallback={<div></div>}>
        <div className="flex flex-col text-center pb-16">
          <div className="flex flex-row m-auto pb-1">
            <a href={about.about.image.url} download>
              <Image
                src={`${about.about.image.url}`}
                width={336}
                height={300}
                alt="Henrik Denerin 1"
                quality={80}
                priority
              />
            </a>
            <a href={`${about.about.image2.url}`}>
              <Image
                src={`${about.about.image2.url}`}
                width={336}
                height={300}
                alt="Henrik Denerin 2"
                quality={80}
                priority
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
      </Suspense>
    </main>
  );
};

export default About;
