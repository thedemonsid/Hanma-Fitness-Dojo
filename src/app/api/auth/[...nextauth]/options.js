import prisma from "@/utils/prisma";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    GithubProvider({
      clientId: process.env.GithubId,
      clientSecret: process.env.GithubSecret,
    }),

    GoogleProvider({
      clientId: process.env.GoogleId,
      clientSecret: process.env.GoogleSecret,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile }) {
      try {
        const userExist = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });
        if (!userExist) {
          await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name || "",
              imageUrl: profile.avatar_url || profile.picture || "",
            },
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session, token }) {
      if (session?.user?.email) {
        const sessionUser = await prisma.user.findUnique({
          where: {
            email: session.user.email,
          },
        });
        if (sessionUser) {
          session.user.id = sessionUser.id;
        }
      }
      return session;
    },
  },
};
