import { request } from '../../../lib/datocms';
import { NextResponse } from 'next/server';

export interface Error {
  msg: string;
  status: boolean;
}

const query = `query header {
    allNavigations(orderBy:order_ASC) {
      text
      path
      categories{
        tagtitle
      }
    }
    logo {
      image {
        url
        alt
      }
    }
  }`;

export async function GET() {
  const errorMsg: Error = {
    msg: 'No data to be found',
    status: false,
  };

  try {
    const response = await request({
      query: query,
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ errorMsg });
  }
}
