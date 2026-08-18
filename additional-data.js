import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Show from "./models/Show.js";

dotenv.config();

const additionalShows = [
  {
    showId: 71,
    name: "The Walking Dead",
    summary: "<p>The world is in ruin. A group of survivors fight to survive in a zombie apocalypse. Rick Grimes leads the group as they struggle to stay alive while dealing with both the undead and the living.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/21/53870.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/21/53870.jpg",
    },
    genres: ["Drama", "Action", "Horror"],
    rating: { average: 8.1 },
    language: "English",
    status: "Ended",
    runtime: 60,
    officialSite: "http://www.amctv.com/shows/the-walking-dead",
  },
  {
    showId: 16,
    name: "Prison Break",
    summary: "<p>Due to a political conspiracy, an innocent man is sent to death row and his only hope is his brother, who makes it his mission to deliberately get himself sent to the same prison in order to break the both of them out.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/82/207646.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/82/207646.jpg",
    },
    genres: ["Drama", "Action", "Thriller"],
    rating: { average: 8.3 },
    language: "English",
    status: "Ended",
    runtime: 45,
    officialSite: "",
  },
  {
    showId: 146,
    name: "Suits",
    summary: "<p>While running from a drug deal gone bad, Mike Ross, a brilliant college dropout, is mistaken for a lawyer by Harvey Specter. Despite having no law degree, Mike is hired by Harvey and the two form a dynamic partnership.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/69/173301.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/69/173301.jpg",
    },
    genres: ["Drama", "Comedy"],
    rating: { average: 8.4 },
    language: "English",
    status: "Ended",
    runtime: 45,
    officialSite: "https://www.usanetwork.com/suits",
  },
  {
    showId: 25,
    name: "Vikings",
    summary: "<p>The travels of Ragnar Lothbrok, the greatest hero of his age. The series tells the saga of Ragnar's band of Viking brothers and his family as he rises to become King of the Norse tribes.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/30/75226.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/30/75226.jpg",
    },
    genres: ["Drama", "Action", "History"],
    rating: { average: 8.5 },
    language: "English",
    status: "Ended",
    runtime: 45,
    officialSite: "",
  },
  {
    showId: 45048,
    name: "The Last of Us",
    summary: "<p>Joel and Ellie, a pair connected through the harshness of the world they live in, are forced to endure brutal circumstances and ruthless killers on a trek across a post-pandemic America.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/401/1007803.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/401/1007803.jpg",
    },
    genres: ["Drama", "Action", "Horror"],
    rating: { average: 8.8 },
    language: "English",
    status: "Running",
    runtime: 60,
    officialSite: "https://www.hbo.com/the-last-of-us",
  },
  {
    showId: 36709,
    name: "House of the Dragon",
    summary: "<p>The story of the Targaryen civil war that took place about 200 years before the events depicted in Game of Thrones, chronicling the beginning of the end of House Targaryen.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/401/1007805.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/401/1007805.jpg",
    },
    genres: ["Drama", "Fantasy"],
    rating: { average: 8.4 },
    language: "English",
    status: "Running",
    runtime: 60,
    officialSite: "https://www.hbo.com/house-of-the-dragon",
  },
  {
    showId: 27735,
    name: "Ozark",
    summary: "<p>A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder $500 million in five years to appease a drug boss.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/377/944842.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/377/944842.jpg",
    },
    genres: ["Drama", "Crime", "Thriller"],
    rating: { average: 8.5 },
    language: "English",
    status: "Ended",
    runtime: 60,
    officialSite: "https://www.netflix.com/title/80186891",
  },
  {
    showId: 14328,
    name: "Narcos",
    summary: "<p>A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar, as well as the many other drug kingpins who plagued the country through the years.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/85/214830.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/85/214830.jpg",
    },
    genres: ["Drama", "Action", "Crime"],
    rating: { average: 8.3 },
    language: "Spanish",
    status: "Ended",
    runtime: 49,
    officialSite: "https://www.netflix.com/title/80057281",
  },
  {
    showId: 25086,
    name: "Black Mirror",
    summary: "<p>An exploration of our near-future where modern humanity's most primal instincts collide with technology. Each standalone episode taps into the collective unease about our modern world.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/322/806471.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/322/806471.jpg",
    },
    genres: ["Drama", "Sci-Fi", "Thriller"],
    rating: { average: 8.5 },
    language: "English",
    status: "Running",
    runtime: 60,
    officialSite: "https://www.netflix.com/title/70264888",
  },
  {
    showId: 10183,
    name: "Mr. Robot",
    summary: "<p>Elliot, a brilliant but highly unstable young cyber-security engineer and vigilante hacker, becomes a key figure in a complex game of global hacking when the mysterious stranger he meets recruits him for an anti-corporate hacktivist mission.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/261/654165.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/261/654165.jpg",
    },
    genres: ["Drama", "Crime", "Thriller"],
    rating: { average: 8.5 },
    language: "English",
    status: "Ended",
    runtime: 50,
    officialSite: "https://www.usanetwork.com/mr-robot",
  },
  {
    showId: 501,
    name: "Dexter",
    summary: "<p>Dexter Morgan is a forensic blood spatter expert at the Miami-Dade Police Department. He's also a serial killer who targets other serial killers, living by a strict moral code taught to him by his adoptive father.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/2/4988.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/2/4988.jpg",
    },
    genres: ["Drama", "Crime", "Mystery"],
    rating: { average: 8.6 },
    language: "English",
    status: "Ended",
    runtime: 55,
    officialSite: "",
  },
  {
    showId: 4158,
    name: "The Office",
    summary: "<p>A mockumentary on a group of typical office workers, where the office staff is led by the bumbling yet well-meaning regional manager Michael Scott. Their workday consists of ego trips, miscommunication, and boredom.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/3/7473.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/3/7473.jpg",
    },
    genres: ["Comedy"],
    rating: { average: 8.8 },
    language: "English",
    status: "Ended",
    runtime: 30,
    officialSite: "",
  },
  {
    showId: 33356,
    name: "Chernobyl",
    summary: "<p>In April 1986, an explosion at the Chernobyl nuclear power plant in the Soviet Union becomes one of the worst man-made catastrophes in history, as workers and first responders risk their lives to contain the disaster.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/231/578867.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/231/578867.jpg",
    },
    genres: ["Drama", "History", "Thriller"],
    rating: { average: 8.7 },
    language: "English",
    status: "Ended",
    runtime: 70,
    officialSite: "https://www.hbo.com/chernobyl",
  },
  {
    showId: 38950,
    name: "Lupin",
    summary: "<p>Inspired by the adventures of Arsene Lupin, gentleman thief Assane Diop sets out to avenge his father for an injustice inflicted by a wealthy family, using his charm and cleverness.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/375/938098.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/375/938098.jpg",
    },
    genres: ["Drama", "Crime", "Thriller"],
    rating: { average: 7.9 },
    language: "French",
    status: "Running",
    runtime: 45,
    officialSite: "https://www.netflix.com/title/81024625",
  },
];

const seedAdditional = async () => {
  try {
    await connectDB();

    // Get existing show names to avoid duplicates
    const existingShows = await Show.find({}, { name: 1, _id: 0 });
    const existingNames = existingShows.map((s) => s.name.toLowerCase());
    console.log(`Existing shows (${existingShows.length}): ${existingShows.map((s) => s.name).join(", ")}`);

    // Filter out any duplicates
    const newShows = additionalShows.filter(
      (show) => !existingNames.includes(show.name.toLowerCase())
    );

    console.log(`\nAttempted to add ${additionalShows.length} shows, ${newShows.length} are new (no duplicates).`);

    if (newShows.length === 0) {
      console.log("Nothing to insert — all shows already exist.");
      process.exit(0);
    }

    // Insert new shows
    const created = await Show.insertMany(newShows);
    console.log(`\n${created.length} new shows added successfully:`);
    created.forEach((show) => {
      console.log(`  + ${show.name} (showId: ${show.showId})`);
    });

    // Final count
    const totalCount = await Show.countDocuments();
    console.log(`\nTotal shows in database: ${totalCount}`);

    process.exit(0);
  } catch (error) {
    console.error("Error adding shows:", error.message);
    process.exit(1);
  }
};

seedAdditional();
