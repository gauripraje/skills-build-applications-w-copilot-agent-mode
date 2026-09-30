import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  age: number;
  weight: number; // in kg
  height: number; // in cm
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    goals: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
