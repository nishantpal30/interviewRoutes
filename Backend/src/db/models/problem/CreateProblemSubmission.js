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

// Proposed problem content. The partner cannot set publication or review fields.
const problemContentSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true },
    description: { type: String, required: true },
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
    examples: { type: [exampleSchema], default: [] },
    testCases: { type: [testCaseSchema], default: [] },
    starterCode: { type: [starterCodeSchema], default: [] },
    hints: {
      type: [{ type: String, trim: true }],
      default: [],
    },
    editorial: { type: String, default: "" },
    accessLevel: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },
    timeLimitMs: { type: Number, default: 2000, min: 1 },
    memoryLimitMb: { type: Number, default: 256, min: 1 },
  },
  { _id: false },
);

const problemSubmissionSchema = new Schema(
  {
    submissionType: {
      type: String,
      required: true,
      enum: ["create", "update"],
    },

    // Null for a new problem; the existing Problem ID for an edit.
    problemId: {
      type: Schema.Types.ObjectId,
      ref: "Problem",
      default: null,
      validate: {
        validator: function (value) {
          return this.submissionType !== "update" || value != null;
        },
        message: "problemId is required for an update submission.",
      },
    },

    content: {
      type: problemContentSchema,
      required: true,
    },

    submittedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    submittedByRole: {
      type: String,
      enum: ["admin", "creatorPartner"],
      required: true,
    },
    creatorPartnerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
      validate: {
        validator: function (value) {
          if (this.submittedByRole !== "creatorPartner") return true;
          return value != null && String(value) === String(this.submittedBy);
        },
        message:
          "For a CreatorPartner submission, creatorPartnerId must match submittedBy.",
      },
    },

    reviewStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    reviewedAt: {
      type: Date,
      default: null,
    },
    reviewMessage: {
      type: String,
      default: "",
    },

    // Soft delete
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

problemSubmissionSchema.index({ reviewStatus: 1, createdAt: 1 });
problemSubmissionSchema.index({ problemId: 1, reviewStatus: 1 });
problemSubmissionSchema.index({
  creatorPartnerId: 1,
  isDeleted: 1,
  createdAt: -1,
});

const CreateProblemSubmission = mongoose.model(
  "CreateProblemSubmission",
  problemSubmissionSchema,
);

export default CreateProblemSubmission;