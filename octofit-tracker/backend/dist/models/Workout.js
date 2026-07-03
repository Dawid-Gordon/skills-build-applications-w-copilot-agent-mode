import mongoose, { Schema } from 'mongoose';
const WorkoutSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    durationMin: { type: Number },
    notes: { type: String },
    date: { type: Date, default: Date.now },
});
export default mongoose.models.Workout || mongoose.model('Workout', WorkoutSchema);
//# sourceMappingURL=Workout.js.map