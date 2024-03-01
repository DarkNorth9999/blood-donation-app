import type {NextAuthOptions} from 'next-auth'
import Google from 'next-auth/providers/google';
import  CredentialsProvider  from 'next-auth/providers/credentials';


// interface SessionWithToken extends Session{
//     accessToken:string
// }

export const options:NextAuthOptions = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),

        CredentialsProvider({
            name:"Credentials",
            credentials: {
                username:{
                    label:"Username:",
                    type:"text",
                    placeholder:"your-cool-username"
                },
                password:{
                    label:"Password:",
                    type:"password",
                    placeholder:"your-awesome-password"
                }
            },

            async authorize(credentials) {
                const user = {id:21,name:"Yash",password:"nextauth"}

                if(credentials?.username === user.name && credentials.password===user.password){
                    return user as any;
                }
                else{
                    return null
                }
            }
        }),
    ],

    callbacks: {

        async  jwt({ token, user, account }) {
            return { ...token, ...user, ...account };
        },

        async redirect({url,baseUrl}){
            if(url.startsWith("/")) return `${baseUrl}${url}`
            else if (new URL(url).origin == baseUrl) return url
            return baseUrl
        },

        async session({ session, token, user }) {
        session.user.accessToken = token.sub
          return session
        }
    },

    session:{
        strategy:"jwt"
    }

}