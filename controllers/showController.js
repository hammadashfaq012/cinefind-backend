import Show from "../models/Show.js";

const transformShow = (show) => {
  const obj = show.toObject();
  obj.id = obj.showId;
  delete obj.showId;
  delete obj._id;
  delete obj.__v;
  return obj;
};

const searchShows = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query || query.trim() === "") {
      return res.status(200).json([]);
    }

    const regex = { $regex: query, $options: "i" };

    const shows = await Show.find({
      $or: [
        { name: regex },
        { genres: regex },
      ],
    });

    res.status(200).json(shows.map(transformShow));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getShowById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid show ID" });
    }

    const show = await Show.findOne({ showId: id });

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    res.status(200).json(transformShow(show));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getShows = async (req, res) => {
  try {
    const shows = await Show.find();
    res.status(200).json(shows.map(transformShow));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createShow = async (req, res) => {
  try {
    const { name, summary, image, genres, rating, language, status, runtime, officialSite } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Show name is required" });
    }

    const formattedSummary = summary && summary.trim() !== ""
      ? `<p>${summary.trim()}</p>`
      : "";

    const showId = Date.now();
    const show = await Show.create({
      showId,
      name: name.trim(),
      summary: formattedSummary,
      image: {
        medium: image?.medium || "",
        original: image?.original || "",
      },
      genres: Array.isArray(genres) ? genres : [],
      rating: { average: Number(rating?.average) || 0 },
      language: language || "",
      status: status || "",
      runtime: runtime != null ? Number(runtime) : null,
      officialSite: officialSite || "",
    });

    res.status(201).json(transformShow(show));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateShow = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid show ID" });
    }

    const { name, summary, image, genres, rating, language, status, runtime, officialSite } = req.body;

    if (name !== undefined && name.trim() === "") {
      return res.status(400).json({ message: "Show name cannot be empty" });
    }

    const updateData = {};

    if (name !== undefined) updateData.name = name.trim();

    if (summary !== undefined) {
      updateData.summary = summary.trim() !== ""
        ? `<p>${summary.trim()}</p>`
        : "";
    }

    if (image !== undefined) {
      updateData.image = {
        medium: image?.medium || "",
        original: image?.original || "",
      };
    }

    if (genres !== undefined) updateData.genres = Array.isArray(genres) ? genres : [];
    if (rating !== undefined) updateData.rating = { average: Number(rating?.average) || 0 };
    if (language !== undefined) updateData.language = language;
    if (status !== undefined) updateData.status = status;
    if (runtime !== undefined) updateData.runtime = runtime != null ? Number(runtime) : null;
    if (officialSite !== undefined) updateData.officialSite = officialSite;

    const show = await Show.findOneAndUpdate(
      { showId: id },
      updateData,
      { new: true }
    );

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    res.status(200).json(transformShow(show));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteShow = async (req, res) => {
  try {
    const show = await Show.findOneAndDelete({ showId: Number(req.params.id) });

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    res.status(200).json({ message: "Show deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { searchShows, getShowById, getShows, createShow, updateShow, deleteShow };
