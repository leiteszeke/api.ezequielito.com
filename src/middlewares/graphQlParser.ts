import gql from 'graphql-tag';

export const parseQuery = (query: string) => {
  if (!query) {
    return false;
  }

  const parsed = gql`
    ${query}
  `;

  const value =
    // @ts-expect-error Check later
    parsed?.definitions?.[0].selectionSet?.selections?.[0]?.name?.value;

  return value;
};
