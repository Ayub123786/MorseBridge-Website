import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String },
    company: { type: String, default: '' },
    role: { type: String, enum: ['startup', 'investor', 'admin'], default: 'startup' },
    stage: { type: String, default: '' },
    sector: { type: String, default: '' },
    targetRound: { type: String, default: '' },
    checkSize: { type: String, default: '' },
    investorType: { type: String, default: '' },
    website: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    notes: { type: String, default: '' },
    plan: { type: String, default: 'Community (Free)' },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80' }
  },
  { timestamps: true }
);

const SubmissionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
    status: { type: String, default: 'Under Review' }
  },
  { timestamps: true }
);

const SubscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true }
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Submission = mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);
export const Subscriber = mongoose.models.Subscriber || mongoose.model('Subscriber', SubscriberSchema);
