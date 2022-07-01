import { gql, GraphQLClient } from 'graphql-request';
import { getSession } from 'next-auth/react';

const UpdateNextAuthUser = gql`
  mutation UpdateNextAuthUser($userId: ID!, $name: String, $bio: String) {
    user: updateNextUser(
      data: { name: $name, bio: $bio }
      where: { id: $userId }
    ) {
      name
      email
      bio
    }
  }
`;


const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const graphQLClient = new GraphQLClient(graphqlAPI, {
  Headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
  }
})

 const update =  async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    const { name, bio } = JSON.parse(req.body);

    const { user } = await graphQLClient.request(UpdateNextAuthUser, {
      userId: session.userId,
      name,
      bio,
    });

    res.json(user);
  } else {
    res.send({
      error: 'You must be sign in to update your account.',
    });
  }
};
export default update;