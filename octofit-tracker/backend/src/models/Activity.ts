import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  user: Types.ObjectId;
  type: string;
  distanceKm?: number;
  durationMin?: number;
  date: Date;
}

const ActivitySchema: Schema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  distanceKm: { type: Number },
  durationMin: { type: Number },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Activity || mongoose.model<IActivity>('Activity', ActivitySchema);
