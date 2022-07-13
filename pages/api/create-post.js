import { GraphQLClient, gql } from "graphql-request";
import { htmlToSlateAST } from '@graphcms/html-to-slate-ast';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function createUser(req, res) {
   
    const createPost = gql`
        mutation CreatePost(
            $title: String!, 
            $slug: String!,
            $excerpt: String!,
            $content: RichTextAST!,
            $featuredImageUrl: String!,
            $categories: [CategoryWhereUniqueInput!],
            $author: ID!,
            $like: Int!,
            $dislike: Int!
        ) {
            createPost(
                data: {
                    title: $title, 
                    slug: $slug, 
                    excerpt: $excerpt, 
                    content: $content, 
                    featuredPost: true, 
                    featuredImageUrl: $featuredImageUrl,
                    like: $like,
                    dislike: $dislike, 
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
        const ast = await htmlToSlateAST(req.body.content)
        const data = {
            title: req.body.title, 
            slug: req.body.slug, 
            excerpt: req.body.excerpt, 
            content: {
                children: ast
            }, 
            featuredPost: true, 
            featuredImageUrl: req.body.featuredImageUrl, 
            like: 0,
            dislike: 0,
            categories: req.body.categories, 
            author: req.body.authorID
        }
        // console.log(data);

        const result = await graphQLClient.request(createPost, data);

        return res.status(200).send(result);
        
    } catch (error) {
        return res.status(500).send(error);
    }
}