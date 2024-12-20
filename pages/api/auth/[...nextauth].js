import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('credentials', credentials);
        if('1' === credentials.username && '1' === credentials.password)
          return {id: '1', name: 'user', email: 'user@google.com'}
        return null
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)