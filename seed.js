import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Show from "./models/Show.js";

dotenv.config();

const shows = [
  {
    showId: 169,
    name: "Breaking Bad",
    summary: "<p>A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student to secure his family's future.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/0/2445.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/0/2445.jpg",
    },
    genres: ["Drama", "Crime", "Thriller"],
    rating: { average: 9.5 },
    language: "English",
    status: "Ended",
    runtime: 60,
    officialSite: "http://www.amctv.com/shows/breaking-bad",
  },
  {
    showId: 2993,
    name: "Stranger Things",
    summary: "<p>When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/595/1489169.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/595/1489169.jpg",
    },
    genres: ["Drama", "Fantasy", "Horror"],
    rating: { average: 8.7 },
    language: "English",
    status: "Running",
    runtime: 60,
    officialSite: "https://www.netflix.com/title/80057281",
  },
  {
    showId: 82,
    name: "Game of Thrones",
    summary: "<p>Seven noble families fight for control over the mythical lands of Westeros, while an ancient enemy returns after being dormant for millennia.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/498/1245274.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/498/1245274.jpg",
    },
    genres: ["Drama", "Fantasy", "Thriller"],
    rating: { average: 8.9 },
    language: "English",
    status: "Ended",
    runtime: 60,
    officialSite: "http://www.hbo.com/game-of-thrones",
  },
  {
    showId: 37856,
    name: "The Boys",
    summary: "<p>A group of vigilantes known as 'The Boys' take on corrupt superheroes who abuse their superpowers and influence over the world.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/619/1547768.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/619/1547768.jpg",
    },
    genres: ["Action", "Sci-Fi", "Drama"],
    rating: { average: 8.7 },
    language: "English",
    status: "Running",
    runtime: 60,
    officialSite: "https://www.primevideo.com/detail/The-Boys/0LHTRAAUGS0VJWUE461KQXMQ4N",
  },
  {
    showId: 16311,
    name: "Dark",
    summary: "<p>A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes relationships among four families.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/504/1262352.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/504/1262352.jpg",
    },
    genres: ["Drama", "Sci-Fi", "Thriller"],
    rating: { average: 8.5 },
    language: "German",
    status: "Ended",
    runtime: 60,
    officialSite: "https://www.netflix.com/title/80100172",
  },
  {
    showId: 17315,
    name: "Better Call Saul",
    summary: "<p>The trials of Jimmy McGill, a small-time lawyer who seems destined for a life of mediocrity, as he transforms into a morally questionable attorney.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/501/1253515.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/501/1253515.jpg",
    },
    genres: ["Drama", "Crime"],
    rating: { average: 8.8 },
    language: "English",
    status: "Ended",
    runtime: 60,
    officialSite: "http://www.amctv.com/shows/better-call-saul",
  },
  {
    showId: 1312,
    name: "Sherlock",
    summary: "<p>A modern update finds the famous sleuth and his doctor partner solving crime in 21st century London.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/139/349037.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/139/349037.jpg",
    },
    genres: ["Drama", "Crime", "Thriller"],
    rating: { average: 8.5 },
    language: "English",
    status: "Ended",
    runtime: 90,
    officialSite: "http://www.bbc.co.uk/programmes/b0184ws3",
  },
  {
    showId: 20834,
    name: "Peaky Blinders",
    summary: "<p>A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/48/122213.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/48/122213.jpg",
    },
    genres: ["Drama", "Crime"],
    rating: { average: 8.8 },
    language: "English",
    status: "Ended",
    runtime: 60,
    officialSite: "http://www.bbc.co.uk/programmes/b04529lz",
  },
  {
    showId: 59836,
    name: "Wednesday",
    summary: "<p>Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends at Nevermore Academy.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/586/1466410.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/586/1466410.jpg",
    },
    genres: ["Comedy", "Fantasy", "Horror"],
    rating: { average: 8.1 },
    language: "English",
    status: "Running",
    runtime: 60,
    officialSite: "https://www.netflix.com/title/81231974",
  },
  {
    showId: 6491,
    name: "The Witcher",
    summary: "<p>Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/594/1486674.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/594/1486674.jpg",
    },
    genres: ["Drama", "Fantasy", "Action"],
    rating: { average: 8.0 },
    language: "English",
    status: "Running",
    runtime: 60,
    officialSite: "https://www.netflix.com/title/80189685",
  },
  {
    showId: 38760,
    name: "Money Heist",
    summary: "<p>An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history by stealing 2.4 billion euros from the Royal Mint of Spain.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/205/513795.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/205/513795.jpg",
    },
    genres: ["Action", "Crime", "Drama"],
    rating: { average: 8.2 },
    language: "Spanish",
    status: "Ended",
    runtime: 60,
    officialSite: "https://www.netflix.com/title/80192098",
  },
  {
    showId: 49,
    name: "Lost",
    summary: "<p>The survivors of a plane crash find themselves stranded on a mysterious island, forced to fight for their survival while uncovering its dark secrets.</p>",
    image: {
      medium: "https://static.tvmaze.com/uploads/images/medium_portrait/0/1.jpg",
      original: "https://static.tvmaze.com/uploads/images/original_untouched/0/1.jpg",
    },
    genres: ["Drama", "Fantasy", "Sci-Fi"],
    rating: { average: 8.3 },
    language: "English",
    status: "Ended",
    runtime: 45,
    officialSite: "http://www.abc.com/shows/lost",
  },
];

const seedDB = async () => {
  try {
    await connectDB();

    await Show.deleteMany({});
    console.log("Existing shows cleared.");

    const created = await Show.insertMany(shows);
    console.log(`${created.length} shows inserted successfully.`);

    created.forEach((show) => {
      console.log(`  - ${show.name} (showId: ${show.showId})`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
};

seedDB();
