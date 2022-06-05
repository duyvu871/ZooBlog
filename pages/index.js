import Head from 'next/head';
import { PostCard, Categories, PostWidget, FeaturedPosts, ScrollToTop, Author} from '../components';
import { getPosts} from '../services';

const Home = ({ posts }) => {


  return (
    <div className="container mx-auto mb-8 ">
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
      
>>>>>>> f26851b (add some feature in postcard and login page)
=======
      
>>>>>>> eb93c9b6dbac04344a67d537f9850680ea46dea8
=======
      
>>>>>>> eb93c9b6dbac04344a67d537f9850680ea46dea8
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12"> 
        <div className='col-span-1 lg:col-span-8'>
          <h3 className='text-xl mb-8 font-semibold border-b pb-4 mx-8'>
            Bài viết
          </h3>
          <div className="lg:col-span-8 col-span-1">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            {posts.reverse().map((post, index) => <PostCard post={post.node} key={post.node.title} /> )}
=======
            {posts.slice().reverse().map((post, index) => <PostCard post={post.node} key={post.node.title} /> )}
>>>>>>> f26851b (add some feature in postcard and login page)
=======
            {posts.slice().reverse().map((post, index) => <PostCard post={post.node} key={post.node.title} /> )}
>>>>>>> eb93c9b6dbac04344a67d537f9850680ea46dea8
=======
            {posts.slice().reverse().map((post, index) => <PostCard post={post.node} key={post.node.title} /> )}
>>>>>>> eb93c9b6dbac04344a67d537f9850680ea46dea8
          </div>
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
              <PostWidget />
              <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

export async function getStaticProps() {
  const posts =  (await getPosts())  || [];

  return {
    props: { posts }
  }
}
