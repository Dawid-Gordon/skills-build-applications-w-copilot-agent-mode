import { Router } from 'express';
import User from '../models/User';
const router = Router();
router.get('/', async (_req, res) => {
    const users = await User.find().lean();
    res.json(users);
});
router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name)
            return res.status(400).json({ error: 'name is required' });
        const created = await User.create({ name, email, points: 0 });
        res.status(201).json(created);
    }
    catch (err) {
        res.status(500).json({ error: 'failed to create user' });
    }
});
export default router;
//# sourceMappingURL=users.js.map