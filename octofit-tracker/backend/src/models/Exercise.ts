import mongoose, { Schema, Document } from 'mongoose';

export interface IExercise extends Document {
  name: string;
  category: string;
  description: string;
  targetMuscleGroup: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  caloriesBurned: number; // per 10 minutes
  createdAt: Date;
  updatedAt: Date;
}

const exerciseSchema = new Schema<IExercise>(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    targetMuscleGroup: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    caloriesBurned: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IExercise>('Exercise', exerciseSchema);
