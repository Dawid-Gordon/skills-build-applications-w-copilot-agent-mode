import mongoose, { Document, Types } from 'mongoose';
export interface ILeaderboard extends Document {
    user: Types.ObjectId;
    points: number;
    rank?: number;
}
declare const _default: mongoose.Model<any, {}, {}, {}, any, any>;
export default _default;
//# sourceMappingURL=Leaderboard.d.ts.map