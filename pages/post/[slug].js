import React from 'react'
import { useRouter } from 'next/router';
import {getPosts, getPostsDetails } from '../../services'
import * as Page from '../../components';

const PostDetails = ({ post }) =>  {
   const router = useRouter()
   if (router.isFallback) {
       return <Page.Loader />
   }

  return (
    <div className='container mx-auto mb-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 lg:gap-12'>
            <div className='col-span-1 lg:col-span-8'>
                <Page.PostDetail post={post} />
                <h3 className='text-cl mb-8 font-semibold border-b pb-4 mx-8'>Tác giả</h3>
                <Page.Author author={post.author} />
                {/* <Page.CommentsForm slug={post.slug} />
                <Page.Comments slug={post.slug} /> */}
                <Page.Comment slug={post.slug} />
            </div>
            <div className='col-span-1 lg:col-span-4'>
                <div className='relative lg:sticky top-8'>
                    <Page.PostWidget 
                        categories={post.categories.map(category => category.slug)} 
                        slug={post.slug} 
                    />
                    <Page.Categories />
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostDetails

export async function getServerSideProps({ params }) {
    const data = await getPostsDetails(params.slug);
    
    return {
      props: { post: data }
    }
}

// export async function getStaticPaths() {
//     const posts = await getPosts();
//     console.log(posts.map(
//         ({ node: { slug } }) => ({params: {slug}})
//     ))
//     return {
//         paths: posts.map(
//             ({ node: { slug } }) => ({params: {slug}})
//         ),
//         fallback: true
//     }
// }