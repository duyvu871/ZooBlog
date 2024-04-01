import { gql, GraphQLClient } from 'graphql-request';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import graphQLClient from '../lib/graphQLClient';
import { getSession } from 'next-auth/react';
import Profile from '../components/User/Profile';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';


const GetUserProfileById = gql`
  query GetUserProfileById($id: ID!) {
    user: nextUser(where: { id: $id }) {
      email
      name
      bio
      photo {
        url
      }
    }
  }
`;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/credentials-signin',
        permanent: false,
      },
    };
  }

  const { user } = await graphQLClient.request(GetUserProfileById, {
    id: session.userId,
  });

  return {
    props: {
      user,
    },
  };
}

export default function AccountPage({ user }) {

  const { handleSubmit, register } = useForm({ defaultValues: user });

  const onSubmit = async ({ name, bio }) => {
    try {
      const res = await fetch('/api/update-account', {
        method: 'POST',
        body: JSON.stringify({ name, bio }),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      toast.success('Account updated successfully');
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Try again!');
      console.log(err);
    }
  };

  const onSignOut = () => {
    if (window.confirm('Bạn có chắc muốn đăng xuất không ?')) {
      signOut();
      return;
    } 
    return;
  }

  return (
    <div>
      <button 
        onClick={onSignOut}
        className="
          py-2 px-4 bg-transparent font-semibold border border-red-600 rounded 
          bg-red-600 text-white  border-transparent
        "
      >Đăng xuất
      </button>
      <Profile user={user} />
    </div>
  );
}

{/* <div>
    
//   <h1>My Account</h1>

//   <form onSubmit={handleSubmit(onSubmit)}>
//     <div>
//       <label htmlFor="name">Name: {user.name}</label>
//       <br />
//       <input
//         type="text"
//         name="name"
//         {...register('name', { required: true })}
//         placeholder="name"
//         id="name"
//       />
//     </div>

//     <div>
//       <label htmlFor="bio">Bio: {user.bio}</label>
//       <br />
//       <textarea
//         name="bio"
//         {...register('bio')}
//         placeholder="Short bio"
//         id="bio"
//         rows={7}
//       />
//     </div>
//     <div>
//       <button type="submit">Save profile</button>
//     </div>
//   </form>
// </div> */}