import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Workout from '../models/Workout';
import Leaderboard from '../models/Leaderboard';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        // Clear existing data
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            Workout.deleteMany({}),
            Leaderboard.deleteMany({}),
        ]);
        // Create users
        const users = await User.create([
            { name: 'Alice Johnson', email: 'alice@example.com', points: 120 },
            { name: 'Bob Smith', email: 'bob@example.com', points: 95 },
            { name: 'Cara Lee', email: 'cara@example.com', points: 140 },
            { name: 'Dave Patel', email: 'dave@example.com', points: 80 },
        ]);
        // Create teams
        const teams = await Team.create([
            { name: 'Team Alpha', members: [users[0]._id, users[1]._id] },
            { name: 'Team Beta', members: [users[2]._id, users[3]._id] },
        ]);
        // Create activities
        const activities = await Activity.create([
            { user: users[0]._id, type: 'run', distanceKm: 5.2, durationMin: 28, date: new Date() },
            { user: users[1]._id, type: 'ride', distanceKm: 20.5, durationMin: 60, date: new Date() },
            { user: users[2]._id, type: 'swim', distanceKm: 1.2, durationMin: 30, date: new Date() },
            { user: users[0]._id, type: 'run', distanceKm: 10, durationMin: 55, date: new Date() },
        ]);
        // Create workouts
        const workouts = await Workout.create([
            { user: users[0]._id, name: 'Morning Interval Run', durationMin: 40, notes: 'Hills', date: new Date() },
            { user: users[2]._id, name: 'Strength Session', durationMin: 50, notes: 'Upper body focus', date: new Date() },
        ]);
        // Build leaderboard from users' points
        const sorted = [...users].sort((a, b) => b.points - a.points);
        const leaderboardDocs = sorted.map((u, idx) => ({ user: u._id, points: u.points, rank: idx + 1 }));
        await Leaderboard.create(leaderboardDocs);
        console.log('Inserted sample users:', users.length);
        console.log('Inserted sample teams:', teams.length);
        console.log('Inserted sample activities:', activities.length);
        console.log('Inserted sample workouts:', workouts.length);
        console.log('Inserted leaderboard entries:', leaderboardDocs.length);
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
//# sourceMappingURL=seed.js.map