import mongoose, { Schema } from 'mongoose';
const ActivitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    distanceKm: { type: Number },
    durationMin: { type: Number },
    date: { type: Date, default: Date.now },
});
export default mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);
//# sourceMappingURL=Activity.js.map