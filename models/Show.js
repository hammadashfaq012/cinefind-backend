// Mongoose schema and model for TV shows.
// Each show has a numeric showId (used by the API and frontend),
// display fields (name, summary, image, genres, rating, etc.),
// and automatic createdAt/updatedAt timestamps.

import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    // Numeric identifier used by the frontend (mapped to "id" in API responses)
    showId: {
      type: Number,
      required: true,
      unique: true,
    },

    // Display name of the show (used for search matching)
    name: {
      type: String,
      required: true,
    },

    // HTML-formatted synopsis of the show
    summary: {
      type: String,
      default: "",
    },

    // Poster image URLs in two sizes (used by ShowCard and ShowDetails)
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

    // Array of genre tags (e.g. "Drama", "Crime") — used for genre search
    genres: {
      type: [String],
      default: [],
    },

    // Average rating out of 10
    rating: {
      average: {
        type: Number,
        default: 0,
      },
    },

    // Language the show is primarily in (e.g. "English", "Spanish")
    language: {
      type: String,
      default: "",
    },

    // Current status: "Running", "Ended", etc.
    status: {
      type: String,
      default: "",
    },

    // Episode runtime in minutes
    runtime: {
      type: Number,
      default: null,
    },

    // Official website URL for the show
    officialSite: {
      type: String,
      default: "",
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

const Show = mongoose.model("Show", showSchema);

export default Show;
