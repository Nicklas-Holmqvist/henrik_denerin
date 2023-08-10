import { datoRequest } from '../../../lib/datocms';
import { NextResponse } from 'next/server';

export interface Error {
  msg: string;
  status: boolean;
}

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

export async function GET() {
  const errorMsg: Error = {
    msg: 'No data to be found',
    status: false,
  };
  try {
    const response = await datoRequest({
      query: query,
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ errorMsg });
  }
}
