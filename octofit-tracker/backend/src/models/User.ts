import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email?: string;
  points: number;
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String },
  points: { type: Number, default: 0 },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
