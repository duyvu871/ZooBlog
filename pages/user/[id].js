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

