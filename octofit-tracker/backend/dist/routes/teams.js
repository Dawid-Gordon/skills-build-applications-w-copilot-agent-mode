import { Router } from 'express';
import Team from '../models/Team';
const router = Router();
router.get('/', async (_req, res) => {
    const teams = await Team.find().populate('members').lean();
    res.json(teams);
});
router.post('/', async (req, res) => {
    try {
        const { name, memberIds } = req.body;
        if (!name)
            return res.status(400).json({ error: 'name is required' });
        const members = Array.isArray(memberIds) ? memberIds : [];
        const created = await Team.create({ name, members });
        const populated = await Team.findById(created._id).populate('members').lean();
        res.status(201).json(populated);
    }
    catch (err) {
        res.status(500).json({ error: 'failed to create team' });
    }
});
export default router;
//# sourceMappingURL=teams.js.map