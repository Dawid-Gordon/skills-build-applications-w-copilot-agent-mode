import { Router } from 'express';
import Leaderboard from '../models/Leaderboard';
import User from '../models/User';
const router = Router();
router.get('/', async (_req, res) => {
    const entries = await Leaderboard.find().sort({ points: -1 }).populate('user').lean();
    res.json(entries);
});
// Optional: recompute leaderboard from users
router.post('/recompute', async (_req, res) => {
    const users = await User.find().lean();
    const sorted = users.sort((a, b) => (b.points || 0) - (a.points || 0));
    await Leaderboard.deleteMany({});
    const docs = sorted.map((u, idx) => ({ user: u._id, points: u.points || 0, rank: idx + 1 }));
    await Leaderboard.create(docs);
    const entries = await Leaderboard.find().sort({ points: -1 }).populate('user').lean();
    res.json(entries);
});
export default router;
//# sourceMappingURL=leaderboard.js.map