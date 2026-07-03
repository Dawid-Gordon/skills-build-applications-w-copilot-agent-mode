import mongoose, { Document, Types } from 'mongoose';
export interface ITeam extends Document {
    name: string;
    members: Types.ObjectId[];
}
declare const _default: mongoose.Model<any, {}, {}, {}, any, any>;
export default _default;
//# sourceMappingURL=Team.d.ts.map