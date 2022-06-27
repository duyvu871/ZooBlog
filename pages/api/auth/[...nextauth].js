import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import { compare, hash } from 'bcrypt';
import { gql, GraphQLClient} from 'graphql-request';
import { getUserByEmail } from '../../../services/user';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const graphQLClient = new GraphQLClient(graphqlAPI, {
  Headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
  }
})



export default NextAuth({
  pages: {
    signIn: '/auth/credentials-signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: null // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'abc@def.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      authorize: async ({ email, password }) => {
          
        const user = await getUserByEmail(email);
      
        if (!user) {
          // const { newUser } = await graphQLClient.request(
          //   CreateNextAuthUserByEmail,
          //   {
          //     email,
          //     password: await hash(password, 12),
          //   }
          // );
          throw new Error('Email không tồn tại trong hệ thống');
        }
        const isValid = user?.password === password//await compare(password, user.password);

        if (!isValid) {
          throw new Error('Mật khẩu không đúng , vui lòng thử lại');
        }

        

        return {
          id: user.id,
          username: email,
          email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.userId = token.sub;
      return Promise.resolve(session);
    },
    // async credentials({email, password}) {
    //   console.log(email, password);
    //   return true
    // }
  },
  events: {
      createUser({user}) {
        console.log(`User: ${user}`);
      }
  }
});
