import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IWorkout extends Document {
  user: Types.ObjectId;
  name: string;
  durationMin?: number;
  notes?: string;
  date: Date;
}

const WorkoutSchema: Schema = new Schema<IWorkout>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  durationMin: { type: Number },
  notes: { type: String },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Workout || mongoose.model<IWorkout>('Workout', WorkoutSchema);
