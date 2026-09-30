import mongoose, { Schema, Document } from 'mongoose';

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  weight: number; // in kg
  bodyMeasurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    legs?: number;
  };
  mood: 'great' | 'good' | 'okay' | 'poor';
  energyLevel: number; // 1-10
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const progressSchema = new Schema<IProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    weight: { type: Number, required: true },
    bodyMeasurements: {
      chest: { type: Number },
      waist: { type: Number },
      hips: { type: Number },
      arms: { type: Number },
      legs: { type: Number },
    },
    mood: {
      type: String,
      enum: ['great', 'good', 'okay', 'poor'],
      default: 'good',
    },
    energyLevel: { type: Number, min: 1, max: 10, default: 5 },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IProgress>('Progress', progressSchema);
