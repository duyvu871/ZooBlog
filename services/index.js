import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                    node {
                        author {
                            bio
                            id
                            name
                            email
                            follows
                            photo {
                                url
                            }
                            background {
                                url
                            }
                        }
                        comments {
                            id
                        }
                        id
                        like
                        dislike
                        createdAt
                        slug
                        excerpt
                        title
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }

    `
    const result = await request(graphqlAPI, query);

    return result.postsConnection.edges;
}
export const getRecentPosts = async () => {

    const query = gql`
        query GetPostDetails() {
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query);
    return result.posts;
}

export const getSimilarPosts = async (slug, categories) => {

    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: { 
                    slug_not: $slug, 
                    AND: {
                        categories_some: {
                            slug_in: $categories}
                        }
                    }
                last: 7
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query, {slug, categories});
    return result.posts;
}

export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
                id
              }
        }
    `

    const result = await request(graphqlAPI, query)
    
    return result.categories;
}

export const getPostsDetails = async (slug) => {
    const query = gql`
        query MyQuery($slug: String!) {
            post(where: {  slug: $slug }) {
                author {
                    bio
                    id
                    name
                    email
                    photo {
                      url
                    }
                    background {
                      url
                    }
                  }
                createdAt
                slug
                excerpt
                title
                featuredImage {
                    url
                }
                categories {
                    name
                    slug
                }
                content {
                    raw
                    html
                }
            }
        }

    `
    const result = await request(graphqlAPI, query, { slug });
    return result.post;
}

export const submitComment = async ( obj ) => {
    const result = await fetch('/api/comments',{
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body:JSON.stringify(obj),
    })

    return result.json();
}

export const getComments = async (slug) => {
    const query = gql`
        query GetComments($slug: String!) {
            comments(where: { post_some: {slug: $slug}}) {
                name
                createdAt
                comment
            }
        }
    `

    const result = await request(graphqlAPI, query, {slug})
    
    return result.comments;
}

export const getCategoryPost = async (slug) => {
    const query = gql`
      query GetCategoryPost($slug: String!) {
        postsConnection(where: {categories_some: {slug: $slug}}) {
          edges {
            cursor
            node {
              author {
                bio
                name
                id
                follows
                photo {
                  url
                }
              }
              like
              dislike
              comments {
                  id
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
    `;
  
    const result = await request(graphqlAPI, query, { slug });
  
    return result.postsConnection.edges;
  };
  
  export const getFeaturedPosts = async () => {
    const query = gql`
      query GetFeaturedPost() {
        posts(where: {featuredPost: true}) {
          author {
            name
            photo {
              url
            }
          }
          featuredImage {
            url
          }
          title
          slug
          createdAt
        }
      }   
    `;
  
    const result = await request(graphqlAPI, query);
  
    return result.posts;
  };


export const submitEmotions = async (obj) => {
    const result = await fetch('/api/emotions',{
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body:JSON.stringify(obj),
    })

    return result.json();
}

export const getEmotions = async (option) => {
    const query = gql`
        query GetEmotions($id: ID!, $slug: String!) {
            post(where: {id: $id, slug: $slug}) {
                dislike
                like
            }
        }
    `;

    const result = await request(graphqlAPI, query, option);

    return result.post
}

export const getAuthors = async () => {
    const query = gql`
        query GetAuthors {
            authors {
                name
                id
            }
        }
    `;

    const result = await request(graphqlAPI, query);

    return result.authors
}
