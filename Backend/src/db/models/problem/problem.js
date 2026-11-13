import mongoose from "mongoose";

const { Schema } = mongoose;

const exampleSchema = new Schema(
  {
    input: { type: String, required: true },
    output: { type: String, required: true },
    explanation: { type: String, default: "" },
  },
  { _id: false },
);

const testCaseSchema = new Schema(
  {
    input: { type: String, required: true },
    output: { type: String, required: true },
    isHidden: { type: Boolean, default: true },
  },
  { _id: false },
);

const starterCodeSchema = new Schema(
  {
    language: {
      type: String,
      required: true,
      enum: ["javascript", "python", "java", "cpp"],
    },
    code: { type: String, required: true },
  },
  { _id: false },
);

const problemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["Easy", "Medium", "Hard"],
    },
    topics: {
      type: [{ type: String, trim: true, lowercase: true }],
      default: [],
    },
    constraints: {
      type: [{ type: String, trim: true }],
      default: [],
    },
    examples: {
      type: [exampleSchema],
      default: [],
    },
    testCases: {
      type: [testCaseSchema],
      default: [],
    },
    starterCode: {
      type: [starterCodeSchema],
      default: [],
    },
    hints: {
      type: [{ type: String, trim: true }],
      default: [],
    },
    editorial: {
      type: String,
      default: "",
    },

    // Set to "premium" to restrict this problem to active subscribers.
    accessLevel: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
      index: true,
    },

    // Both admins and CreatorPartners are users in the User collection.
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdByRole: {
      type: String,
      enum: ["admin", "creatorPartner"],
      required: true,
    },

    // For a CreatorPartner-created problem, this must match createdBy.
    // An admin can optionally set it to track partner attribution.
    creatorPartnerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
      validate: {
        validator: function (value) {
          if (this.createdByRole !== "creatorPartner") return true;
          return value != null && String(value) === String(this.createdBy);
        },
        message:
          "For a CreatorPartner-created problem, creatorPartnerId must match createdBy.",
      },
    },

    timeLimitMs: {
      type: Number,
      default: 2000,
      min: 1,
    },
    memoryLimitMb: {
      type: Number,
      default: 256,
      min: 1,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true },
);

problemSchema.index({ isPublished: 1, accessLevel: 1, difficulty: 1 });

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
