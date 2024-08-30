import Link from 'next/link';
import Image from 'next/image';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

import MediaPlayer from '../../../components/MediaPlayer';
import WorkInfoText from './WorkInfoText';
import { WorkInterface } from '@/types/work';
import SpotifyPlayer from '@/app/components/SpotifyPlayer';

const WorkInfo = ({ data }: { data: WorkInterface }) => {
  return (
    <>
      <h1 key={data!.workinfo.id} className="text-center pb-1">
        {data!.workinfo.title}
      </h1>
      <h2 key={data!.workinfo.id} className="text-center pb-1">
        [{data!.workinfo.year}]
      </h2>
      <h3 className="text-center pb-20 pt-2 font-normal">
        for {data!.workinfo.instrument}
      </h3>
      <p className="text-center py-1.5">
        <span className="font-bold">duration:</span> {data!.workinfo.duration}
      </p>
      <WorkInfoText
        title={'written for'}
        text={data!.workinfo.dedication}
        haveText={data!.workinfo.dedication}
      />
      <WorkInfoText
        title={'commissioned by'}
        text={data!.workinfo.commision}
        haveText={data!.workinfo.commision}
      />
      <WorkInfoText
        title={'first performance'}
        text={data!.workinfo.premiere}
        haveText={data!.workinfo.premiere}
      />
      {data!.workinfo.babelscore ? (
        <p className="text-center font-bold py-1.5 pt-8">
          score published by{' '}
          <Link
            className="underline"
            href={`${data!.workinfo.babelscore}`}
            rel="noopener noreferrer"
            target="_blank">
            Babelscores
          </Link>
        </p>
      ) : null}
      {data!.workinfo.media ? <MediaPlayer url={data!.workinfo.media} /> : null}
      {data!.workinfo.spotify ? (
        <SpotifyPlayer url={data!.workinfo.spotify} />
      ) : null}
      {data!.workinfo.programnote ? (
        <ReactMarkdown className="max-w-2xl m-auto py-4 pb-16 markdown">
          {data!.workinfo.programnote}
        </ReactMarkdown>
      ) : null}
      {data!.workinfo.excerpt ? (
        <Image
          className="m-auto py-1.5"
          src={data!.workinfo.excerpt?.url}
          width={672}
          height={200}
          alt={`${data!.workinfo.excerpt?.title}`}
          priority
          quality={80}
        />
      ) : null}
    </>
  );
};

export default WorkInfo;
