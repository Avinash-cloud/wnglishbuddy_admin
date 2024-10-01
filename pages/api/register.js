import { mongooseConnect } from '../../lib/mongoose';
import Admin from '../../models/admin';
import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';

export default async function POST(request,res) {
  try {
    
    // Connect to MongoDB
    await mongooseConnect();

    // Get request body data
    const { name, email, password } = await request.body;

    

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
