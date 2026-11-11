import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    plan: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },
    status: {
      type: String,
      enum: ["inactive", "active", "past_due", "expired"],
      default: "inactive",
    },
    currentPeriodStart: {
      type: Date,
      default: null,
    },
    currentPeriodEnd: {
      type: Date,
      default: null,
    },
    cancelAtPeriodEnd: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String,
      default: null,
    },
    providerCustomerId: {
      type: String,
      default: null,
    },
    providerSubscriptionId: {
      type: String,
      default: null,
    },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 8,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    masterStatus: {
      type: String,
      enum: ["user", "master"],
      default: "user",
    },
    creatorPartnerStatus: {
      type: String,
      enum: ["notApplied", "pending", "approved", "rejected"],
      default: "notApplied",
    },
    subscription: {
      type: subscriptionSchema,
      default: () => ({}),
    },

    collegeName: {
      type: String,
      trim: true,
      lowercase: true,
    },
    degreeName: {
      type: String,
      enum: ["UG", "PG"],
      default: "UG",
    },
    gradutionYear: {
      type: Number,
    },
    numberOfProblemSolved: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: "user-default-profile.png",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;