import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Exercise from '../models/Exercise';
import Workout from '../models/Workout';
import Progress from '../models/Progress';
import Goal from '../models/Goal';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Exercise.deleteMany({});
    await Workout.deleteMany({});
    await Progress.deleteMany({});
    await Goal.deleteMany({});
    console.log('Cleared existing collections');

    // Seed Users
    const users = await User.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password_123',
        age: 28,
        weight: 85,
        height: 180,
        fitnessLevel: 'intermediate',
        goals: ['Lose 5kg', 'Build muscle', 'Increase endurance'],
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'hashed_password_456',
        age: 32,
        weight: 65,
        height: 168,
        fitnessLevel: 'advanced',
        goals: ['Maintain weight', 'Improve flexibility'],
      },
      {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        password: 'hashed_password_789',
        age: 25,
        weight: 95,
        height: 185,
        fitnessLevel: 'beginner',
        goals: ['Build muscle', 'Get stronger'],
      },
    ]);
    console.log('Seeded 3 users');

    // Seed Exercises
    const exercises = await Exercise.insertMany([
      {
        name: 'Bench Press',
        category: 'Strength',
        description: 'Classic upper body strength exercise',
        targetMuscleGroup: 'Chest, Shoulders, Triceps',
        difficulty: 'intermediate',
        caloriesBurned: 45,
      },
      {
        name: 'Squats',
        category: 'Strength',
        description: 'Lower body strength exercise',
        targetMuscleGroup: 'Legs, Glutes',
        difficulty: 'intermediate',
        caloriesBurned: 55,
      },
      {
        name: 'Running',
        category: 'Cardio',
        description: 'Cardio endurance exercise',
        targetMuscleGroup: 'Full Body',
        difficulty: 'beginner',
        caloriesBurned: 80,
      },
      {
        name: 'Deadlift',
        category: 'Strength',
        description: 'Full body strength compound exercise',
        targetMuscleGroup: 'Back, Legs, Core',
        difficulty: 'advanced',
        caloriesBurned: 65,
      },
      {
        name: 'Yoga',
        category: 'Flexibility',
        description: 'Flexibility and mind-body exercise',
        targetMuscleGroup: 'Full Body',
        difficulty: 'beginner',
        caloriesBurned: 25,
      },
      {
        name: 'Swimming',
        category: 'Cardio',
        description: 'Full body cardio exercise',
        targetMuscleGroup: 'Full Body',
        difficulty: 'intermediate',
        caloriesBurned: 90,
      },
      {
        name: 'Planks',
        category: 'Core',
        description: 'Core strengthening exercise',
        targetMuscleGroup: 'Core, Shoulders',
        difficulty: 'beginner',
        caloriesBurned: 20,
      },
      {
        name: 'Push-ups',
        category: 'Strength',
        description: 'Upper body strength exercise',
        targetMuscleGroup: 'Chest, Shoulders, Triceps',
        difficulty: 'beginner',
        caloriesBurned: 35,
      },
    ]);
    console.log('Seeded 8 exercises');

    // Seed Workouts
    const workouts = await Workout.insertMany([
      {
        userId: users[0]._id,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        type: 'strength',
        duration: 60,
        exercises: [
          {
            exerciseId: exercises[0]._id,
            sets: 4,
            reps: 8,
            duration: 30,
            weight: 100,
            caloriesBurned: 45,
          },
          {
            exerciseId: exercises[1]._id,
            sets: 4,
            reps: 10,
            duration: 30,
            weight: 120,
            caloriesBurned: 55,
          },
        ],
        totalCalories: 100,
        notes: 'Great workout, felt strong',
      },
      {
        userId: users[0]._id,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        type: 'cardio',
        duration: 45,
        exercises: [
          {
            exerciseId: exercises[2]._id,
            sets: 1,
            reps: 1,
            duration: 45,
            caloriesBurned: 360,
          },
        ],
        totalCalories: 360,
        notes: '5km run, good pace',
      },
      {
        userId: users[1]._id,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        type: 'flexibility',
        duration: 60,
        exercises: [
          {
            exerciseId: exercises[4]._id,
            sets: 1,
            reps: 1,
            duration: 60,
            caloriesBurned: 25,
          },
        ],
        totalCalories: 25,
        notes: 'Relaxing yoga session',
      },
      {
        userId: users[2]._id,
        date: new Date(),
        type: 'strength',
        duration: 90,
        exercises: [
          {
            exerciseId: exercises[3]._id,
            sets: 5,
            reps: 5,
            duration: 45,
            weight: 150,
            caloriesBurned: 65,
          },
          {
            exerciseId: exercises[7]._id,
            sets: 3,
            reps: 20,
            duration: 30,
            caloriesBurned: 35,
          },
          {
            exerciseId: exercises[6]._id,
            sets: 3,
            reps: 1,
            duration: 15,
            caloriesBurned: 20,
          },
        ],
        totalCalories: 120,
        notes: 'Intense leg day',
      },
    ]);
    console.log('Seeded 4 workouts');

    // Seed Progress
    const progressRecords = await Progress.insertMany([
      {
        userId: users[0]._id,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        weight: 87,
        bodyMeasurements: {
          chest: 102,
          waist: 95,
          hips: 100,
          arms: 32,
          legs: 58,
        },
        mood: 'good',
        energyLevel: 7,
        notes: 'Feeling motivated',
      },
      {
        userId: users[0]._id,
        date: new Date(),
        weight: 85,
        bodyMeasurements: {
          chest: 103,
          waist: 93,
          hips: 98,
          arms: 32.5,
          legs: 59,
        },
        mood: 'great',
        energyLevel: 9,
        notes: 'Losing weight and gaining muscle',
      },
      {
        userId: users[1]._id,
        date: new Date(),
        weight: 65,
        bodyMeasurements: {
          chest: 88,
          waist: 72,
          hips: 92,
          arms: 28,
          legs: 54,
        },
        mood: 'great',
        energyLevel: 8,
        notes: 'Maintaining fitness level',
      },
    ]);
    console.log('Seeded 3 progress records');

    // Seed Goals
    const goals = await Goal.insertMany([
      {
        userId: users[0]._id,
        title: 'Lose 5kg',
        description: 'Reach target weight of 80kg',
        type: 'weight',
        targetValue: 80,
        currentValue: 85,
        unit: 'kg',
        deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        status: 'active',
      },
      {
        userId: users[0]._id,
        title: 'Bench Press 120kg',
        description: 'Increase bench press strength',
        type: 'strength',
        targetValue: 120,
        currentValue: 100,
        unit: 'kg',
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        status: 'active',
      },
      {
        userId: users[1]._id,
        title: 'Run a 5K under 25 minutes',
        description: 'Improve running endurance',
        type: 'endurance',
        targetValue: 25,
        currentValue: 28,
        unit: 'minutes',
        deadline: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
        status: 'active',
      },
      {
        userId: users[2]._id,
        title: 'Deadlift 200kg',
        description: 'Build deadlift strength',
        type: 'strength',
        targetValue: 200,
        currentValue: 150,
        unit: 'kg',
        deadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
        status: 'active',
      },
    ]);
    console.log('Seeded 4 goals');

    console.log('\n✅ Database seeding completed successfully!');
    console.log(`Total users: ${users.length}`);
    console.log(`Total exercises: ${exercises.length}`);
    console.log(`Total workouts: ${workouts.length}`);
    console.log(`Total progress records: ${progressRecords.length}`);
    console.log(`Total goals: ${goals.length}`);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
