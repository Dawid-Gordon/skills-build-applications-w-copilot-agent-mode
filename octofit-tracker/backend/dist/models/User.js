import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String },
    points: { type: Number, default: 0 },
});
export default mongoose.models.User || mongoose.model('User', UserSchema);
//# sourceMappingURL=User.js.map