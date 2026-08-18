import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    showId: {
      type: Number,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      default: "",
    },

    image: {
      medium: {
        type: String,
        default: "",
      },
      original: {
        type: String,
        default: "",
      },
    },

    genres: {
      type: [String],
      default: [],
    },

    rating: {
      average: {
        type: Number,
        default: 0,
      },
    },

    language: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "",
    },

    runtime: {
      type: Number,
      default: null,
    },

    officialSite: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Show = mongoose.model("Show", showSchema);

export default Show;
