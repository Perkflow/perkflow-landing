import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/signup/login",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      session.id_token = token.id_token;
      session.provider = token.provider;
      return session;
    },
  },
} satisfies Parameters<typeof NextAuth>[0];
