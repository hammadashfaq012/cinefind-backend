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
    const shows = await Show.find({
      name: { $regex: query, $options: "i" },
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
    const showId = Date.now();
    const show = await Show.create({ ...req.body, showId });
    res.status(201).json(transformShow(show));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateShow = async (req, res) => {
  try {
    const show = await Show.findOneAndUpdate(
      { showId: Number(req.params.id) },
      req.body,
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
