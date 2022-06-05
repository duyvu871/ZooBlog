import React from 'react';
import { useRouter } from 'next/router';

import { getCategories, getCategoryPost } from '../../services';
import { PostCard, Categories, Loader } from '../../components';

const CategoryPost = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto lg:px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
      <div className='col-span-1 lg:col-span-8'>
          <h3 className='text-xl mb-8 font-semibold border-b pb-4 mx-8'>
            Bài viết
          </h3>
          <div className="lg:col-span-8 col-span-1">
            {posts.slice().reverse().map((post, index) => <PostCard post={post.node} key={post.node.title} /> )}
          </div>
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}

