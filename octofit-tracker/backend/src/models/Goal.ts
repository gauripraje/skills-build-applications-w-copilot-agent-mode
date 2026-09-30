import mongoose, { Schema, Document } from 'mongoose';

export interface IGoal extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  type: 'weight' | 'strength' | 'endurance' | 'flexibility' | 'custom';
  targetValue: number;
  currentValue: number;
  unit: string; // kg, reps, miles, etc.
  deadline: Date;
  status: 'active' | 'completed' | 'abandoned';
  createdAt: Date;
  updatedAt: Date;
}

const goalSchema = new Schema<IGoal>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    type: {
      type: String,
      enum: ['weight', 'strength', 'endurance', 'flexibility', 'custom'],
      required: true,
    },
    targetValue: { type: Number, required: true },
    currentValue: { type: Number, required: true },
    unit: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: {
      type: String,
      enum: ['active', 'completed', 'abandoned'],
      default: 'active',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IGoal>('Goal', goalSchema);
