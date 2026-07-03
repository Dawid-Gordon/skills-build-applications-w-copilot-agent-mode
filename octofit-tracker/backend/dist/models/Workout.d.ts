import mongoose, { Document, Types } from 'mongoose';
export interface IWorkout extends Document {
    user: Types.ObjectId;
    name: string;
    durationMin?: number;
    notes?: string;
    date: Date;
}
declare const _default: mongoose.Model<any, {}, {}, {}, any, any>;
export default _default;
//# sourceMappingURL=Workout.d.ts.map