import mongoose, { Schema } from 'mongoose';
const TeamSchema = new Schema({
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});
export default mongoose.models.Team || mongoose.model('Team', TeamSchema);
//# sourceMappingURL=Team.js.map