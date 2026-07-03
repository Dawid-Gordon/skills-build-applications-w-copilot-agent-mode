import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  const acts = await Activity.find().populate('user').lean();
  res.json(acts);
});

router.post('/', async (req, res) => {
  try {
    const { userId, type, distanceKm, durationMin } = req.body;
    if (!userId || !type) return res.status(400).json({ error: 'userId and type required' });
    const created = await Activity.create({ user: userId, type, distanceKm, durationMin });
    const populated = await Activity.findById(created._id).populate('user').lean();
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ error: 'failed to create activity' });
  }
});

export default router;
