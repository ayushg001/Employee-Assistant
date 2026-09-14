import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    serviceRequired: {
      type: String,
      required: [true, 'Service required is required'],
      trim: true,
    },
    budget: {
      type: String,
      required: [true, 'Budget is required'],
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Quote = mongoose.model('Quote', quoteSchema);
export default Quote;
