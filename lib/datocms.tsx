import { GraphQLClient } from 'graphql-request';

interface requestProps {
  query: string;
}

export const datoRequest = ({ query }: requestProps) => {
  const headers = {
    authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
  };

  const client = new GraphQLClient('https://graphql.datocms.com', { headers });
  return client.request(query);
};
