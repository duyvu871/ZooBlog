import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function createUser(req, res) {
   
    const CreateNextUser = gql`
        mutation CreateNextAuthUserByEmail($email: String!, $password: String!, $bio: String!, $name: String!) {
            newUser: createNextUser(data: { email: $email, password: $password, name: $name, bio: $bio }) {
                id
            }
        }
     `;

    const graphQLClient = new GraphQLClient(graphqlAPI, {
        Headers: {
            authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
        }
    });

    try {
        const result = await graphQLClient.request(CreateNextUser, req.body);

        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
}