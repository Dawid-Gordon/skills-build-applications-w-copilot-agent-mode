import { Router } from 'express';
import Workout from '../models/Workout';
const router = Router();
router.get('/', async (_req, res) => {
    const ws = await Workout.find().populate('user').lean();
    res.json(ws);
});
router.post('/', async (req, res) => {
    try {
        const { userId, name, durationMin, notes } = req.body;
        if (!userId || !name)
            return res.status(400).json({ error: 'userId and name required' });
        const created = await Workout.create({ user: userId, name, durationMin, notes });
        const populated = await Workout.findById(created._id).populate('user').lean();
        res.status(201).json(populated);
    }
    catch (err) {
        res.status(500).json({ error: 'failed to create workout' });
    }
});
export default router;
//# sourceMappingURL=workouts.js.map