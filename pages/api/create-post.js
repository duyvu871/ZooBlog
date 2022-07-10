import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function createUser(req, res) {
   
    const CreateNextUser = gql`
        mutation UpdateEmotion(
            $title: String!, 
            $slug: String!,
            $excerpt: String!,
            $content: RichTextAST!,
            $featuredImageID: ID!,
            $categories: [ID!],
            $author: ID!
        ) {
            createPost(
                data: {
                    title: $title, 
                    slug: $slug, 
                    excerpt: $excerpt, 
                    content: $connect, 
                    featuredPost: true, 
                    featuredImage: {
                        connect: {
                            id: $featuredImageID
                        }
                    }, 
                    categories: {
                        connect: $categories
                    }, 
                    author: {
                        connect: {
                            id: $author
                        }
                    }
                }
            ) {
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
        // const result = await graphQLClient.request(CreateNextUser, req.body);
        console.log(req.body);
        // return res.status(200).send(result);
        return true;
    } catch (error) {
        return res.status(500).send(error);
    }
}