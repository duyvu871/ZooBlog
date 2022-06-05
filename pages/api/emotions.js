import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function emotions(req, res) {

    let query;

    if (req.body.dislike) {
        const { dislike } = req.body;

        query = gql`
            mutation SubmitEmotions($dislike: Int!, $id: ID!, $slug: String!) 
            {
                updatePost(data: {dislike: $dislike}, where: {id: $id, slug: $slug})
                {
                    id
                }
            }
        `;
    }
    if (req.body.like) {
        const { like } = req.body;

        query = gql`
            mutation SubmitEmotions($like: Int!, $id: ID!, $slug: String!) 
            {
                updatePost(data: {like: $like}, where: {id: $id, slug: $slug})
                {
                    id
                }
            }
        `;
    }

    const graphQLClient = new GraphQLClient(graphqlAPI, {
        Headers: {
            authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
        }
    });

    try {
        const result = await graphQLClient.request(query, req.body);

        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
}