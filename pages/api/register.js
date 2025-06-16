import { mongooseConnect } from '../../lib/mongoose';
import Admin from '../../models/admin';
import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";



export default async function handler(req,res) {

  const method = req.method;

  if (method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    
    // Connect to MongoDB
    await mongooseConnect();
    // const session = await getServerSession(req, res, authOptions);
    // if (!session) {
    //   return res.status(401).json({ success: false, message: "Not authenticated" });
    // }
    // Get request body data
    const { name, email, password } = await req.body;

    

    // Check if user already exists
    const user = await Admin.findOne({ email });

    if (user) {
      return res.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    return res.json({
      message: 'User created successfully',
      success: true,
      name,
      email,
    });
  } catch (error) {
    console.error(error);
    return res.json({ error: error.message }, { status: 500 });
  }
}
