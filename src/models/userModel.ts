import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  email: string; 
  username: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true }, 
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);

export default User;
