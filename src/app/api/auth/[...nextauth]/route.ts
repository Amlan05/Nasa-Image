import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from "@/models/userModel";
import { connect } from '@/dbConfig/dbConfig';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    })
  ],
  callbacks: {
    async session({ session, user }) {
      // Fetch user data from the database and attach it to the session
      if (user) {
        const userData = await User.findOne({ email: user.email });
        session.user = userData; // Attach user data to the session
      }
      return session;
    },
    async signIn({ profile }) {
      try {
          await connect();
  
          if (!profile) {
              throw new Error("Profile data is missing");
          }
  
          // check if user already exists
          const userExists = await User.findOne({ email: profile.email });
  
          if (userExists) {
              console.log("User already exists");
              return false;
          }
  
          const newUser = await User.create({
              email: profile.email,
              username: profile.name,
              password: "defaultpassword"
          });
  
          console.log("New user created:", newUser);
          return true;
      } catch (error:any) {
          console.log("Error creating new user:", error.message);
          return false;
      }
  }
  }
});

export { handler as GET, handler as POST };
