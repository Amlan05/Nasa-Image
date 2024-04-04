// api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import User from "@/models/userModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Find user by username
      const user = await User.findOne({ username });

      // If user not found
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);

      // If passwords don't match
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // If login successful
      return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // If request method is not POST
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
