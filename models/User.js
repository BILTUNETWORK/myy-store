import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, default: 'customer' }, // customer or admin
});

export default mongoose.models.User || mongoose.model('User', userSchema);