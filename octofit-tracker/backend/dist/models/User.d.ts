import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    name: string;
    email?: string;
    points: number;
}
declare const _default: mongoose.Model<any, {}, {}, {}, any, any>;
export default _default;
//# sourceMappingURL=User.d.ts.map