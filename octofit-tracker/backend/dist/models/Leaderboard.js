import mongoose, { Schema } from 'mongoose';
const LeaderboardSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true },
    rank: { type: Number },
});
export default mongoose.models.Leaderboard || mongoose.model('Leaderboard', LeaderboardSchema);
//# sourceMappingURL=Leaderboard.js.map