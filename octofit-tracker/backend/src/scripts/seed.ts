import {
  connectDatabase,
  disconnectDatabase,
} from '../config/database.js';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

async function seedDatabase(): Promise<void> {
  try {
    console.log('Seed the octofit_db database with test data');
    await connectDatabase();

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [mona, hubot, octocat, codercat] = await User.create([
      {
        username: 'mona',
        email: 'mona@example.com',
        firstName: 'Mona',
        lastName: 'Lisa',
      },
      {
        username: 'hubot',
        email: 'hubot@example.com',
        firstName: 'Hubert',
        lastName: 'Octobot',
      },
      {
        username: 'octocat',
        email: 'octocat@example.com',
        firstName: 'Octavia',
        lastName: 'Cat',
      },
      {
        username: 'codercat',
        email: 'codercat@example.com',
        firstName: 'Cody',
        lastName: 'Coder',
      },
    ]);

    const [trailBlazers, coreCrushers] = await Team.create([
      {
        name: 'Trail Blazers',
        description: 'Outdoor enthusiasts who enjoy running and hiking.',
        members: [mona._id, octocat._id],
        createdBy: mona._id,
      },
      {
        name: 'Core Crushers',
        description: 'Strength athletes focused on consistent progress.',
        members: [hubot._id, codercat._id],
        createdBy: hubot._id,
      },
    ]);

    await Promise.all([
      User.updateMany(
        { _id: { $in: [mona._id, octocat._id] } },
        { $set: { team: trailBlazers._id } },
      ),
      User.updateMany(
        { _id: { $in: [hubot._id, codercat._id] } },
        { $set: { team: coreCrushers._id } },
      ),
    ]);

    await Activity.create([
      {
        user: mona._id,
        type: 'Running',
        durationMinutes: 42,
        distanceKilometers: 7.5,
        caloriesBurned: 480,
        date: new Date('2026-09-21T07:30:00Z'),
      },
      {
        user: hubot._id,
        type: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 410,
        date: new Date('2026-09-22T18:00:00Z'),
      },
      {
        user: octocat._id,
        type: 'Hiking',
        durationMinutes: 95,
        distanceKilometers: 8.2,
        caloriesBurned: 620,
        date: new Date('2026-09-20T09:15:00Z'),
      },
      {
        user: codercat._id,
        type: 'Cycling',
        durationMinutes: 60,
        distanceKilometers: 22.4,
        caloriesBurned: 530,
        date: new Date('2026-09-23T16:45:00Z'),
      },
      {
        user: mona._id,
        type: 'Swimming',
        durationMinutes: 35,
        distanceKilometers: 1.4,
        caloriesBurned: 360,
        date: new Date('2026-09-24T06:45:00Z'),
      },
      {
        user: hubot._id,
        type: 'Walking',
        durationMinutes: 30,
        distanceKilometers: 2.6,
        caloriesBurned: 145,
        date: new Date('2026-09-24T12:15:00Z'),
      },
    ]);

    await LeaderboardEntry.create([
      { user: mona._id, rank: 1, totalPoints: 2450 },
      { user: octocat._id, rank: 2, totalPoints: 2210 },
      { user: hubot._id, rank: 3, totalPoints: 1985 },
      { user: codercat._id, rank: 4, totalPoints: 1760 },
    ]);

    await Workout.create([
      {
        name: 'Beginner Full Body',
        description: 'A balanced routine for building foundational strength.',
        difficulty: 'Beginner',
        durationMinutes: 30,
        exercises: ['Bodyweight Squats', 'Push-ups', 'Glute Bridges', 'Plank'],
      },
      {
        name: 'Trail Runner Conditioning',
        description: 'Improve leg endurance and stability for uneven terrain.',
        difficulty: 'Intermediate',
        durationMinutes: 45,
        exercises: ['Walking Lunges', 'Step-ups', 'Calf Raises', 'Side Plank'],
      },
      {
        name: 'Power Circuit',
        description: 'A high-intensity strength and conditioning circuit.',
        difficulty: 'Advanced',
        durationMinutes: 40,
        exercises: ['Burpees', 'Kettlebell Swings', 'Box Jumps', 'Push Press'],
      },
      {
        name: 'Active Recovery',
        description: 'Low-impact mobility work for recovery days.',
        difficulty: 'Beginner',
        durationMinutes: 20,
        exercises: ['Cat-Cow Stretch', 'Hip Flexor Stretch', 'Bird Dog'],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error: unknown) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await disconnectDatabase();
  }
}

void seedDatabase();
