import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export async function getUserProfileById(id) {
    const query =  gql`
    query GetNextUserById($id: ID!) {
        nextUser(where: {id: $id}) {
          bio
          name
          photo {
            url
          }
        }
      }
    `;

    const result = await request(graphqlAPI, query, { id });

    return result.nextUser;
}

export async function getUserByEmail(email) {
  const query = gql`
    query GetNextUserByEmail($email: String!) {
      nextUser(where: {email: $email}) {
        id
        password
      }
    }
  `;

  const result = await request(graphqlAPI, query, { email });

  return result.nextUser;
}