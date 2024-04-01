import Head from 'next/head';
import { PostCard, Categories, PostWidget, FeaturedPosts, Footer } from '../components';
import MenuUser from '../components/User/MenuUser'
import { getPosts} from '../services';
import { getSession } from 'next-auth/react';
import { getUserProfileById } from '../services/user';
import { useState }  from 'react'

const Home = ({ posts, user }) => {
  
  return (
    <div className="container mx-auto mb-8 ">
      <Head>
        <title>My Blog</title>
        <link rel="icon" href="/bg.jpg" />
      </Head>
     

      <MenuUser user={user} />
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12"> 
        <div className='col-span-1 lg:col-span-8'>
          <h3 className='text-xl mb-8 font-semibold border-b pb-4 mx-8'>
            Bài viết
          </h3>
          <div className="lg:col-span-8 col-span-1">
            {posts.slice().reverse().map((post, index) => <PostCard post={post.node} key={post.node.title} /> )}
          </div>
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
              <PostWidget />
              <Categories />
              <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps(context) {
  const posts =  (await getPosts())  || [];
  const session = await getSession(context);  
  const id = session ? session.userId : undefined;
  const user = id ? (await getUserProfileById(id)) || undefined : null;

  return {
    props: { 
      posts,
      user 
    }
  }
}
