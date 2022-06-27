import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { getUserProfileById } from '../../services/user';
import Profile from '../../components/User/Profile';
import { getSession } from 'next-auth/react';



export async function getServerSideProps(context) {
  const uid = context.params.id;
  const session = await getSession(context);

  if (session?.userId === uid) {
    return {
      redirect: {
        destination: '/account',
        permanent: false,
      },
    };
  }

  const user = await getUserProfileById(uid);
  
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

  return (
    <div>
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