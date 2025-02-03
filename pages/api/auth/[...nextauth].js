import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectMongo from "../../../lib/mongodb";
import User from "../../../models/User";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await connectMongo();
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        const newUser = new User({
          email: user.email,
          name: user.name,
          role: 'customer', // Default to customer
        });
        await newUser.save();
      }
      return true;
    },
    async session({ session, user }) {
      const currentUser = await User.findOne({ email: session.user.email });
      session.user.role = currentUser.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});