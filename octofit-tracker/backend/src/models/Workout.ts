import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkoutExercise {
  exerciseId: mongoose.Types.ObjectId;
  sets: number;
  reps: number;
  duration: number; // in minutes
  weight?: number; // in kg
  caloriesBurned: number;
}

export interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  type: 'strength' | 'cardio' | 'flexibility' | 'sports';
  duration: number; // in minutes
  exercises: IWorkoutExercise[];
  totalCalories: number;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const workoutExerciseSchema = new Schema<IWorkoutExercise>(
  {
    exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    duration: { type: Number, required: true },
    weight: { type: Number },
    caloriesBurned: { type: Number, required: true },
  },
  { _id: false }
);

const workoutSchema = new Schema<IWorkout>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    type: {
      type: String,
      enum: ['strength', 'cardio', 'flexibility', 'sports'],
      required: true,
    },
    duration: { type: Number, required: true },
    exercises: [workoutExerciseSchema],
    totalCalories: { type: Number, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IWorkout>('Workout', workoutSchema);
