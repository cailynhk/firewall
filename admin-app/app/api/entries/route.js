"use server";
// app/api/entries/route.js
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const adminSchema = new mongoose.Schema({}, { collection: 'admin', database: 'users'});
const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

export async function GET() {
  try {
    const entries = await Admin.find({}, { _id: 0, download_url: 1, longitude: 1, latitude: 1 });
    return NextResponse.json(entries);
  } catch (error) {
    return NextResponse.error();
  }
}
