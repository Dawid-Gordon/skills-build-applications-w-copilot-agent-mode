import mongoose, { Document, Types } from 'mongoose';
export interface IActivity extends Document {
    user: Types.ObjectId;
    type: string;
    distanceKm?: number;
    durationMin?: number;
    date: Date;
}
declare const _default: mongoose.Model<any, {}, {}, {}, any, any>;
export default _default;
//# sourceMappingURL=Activity.d.ts.map