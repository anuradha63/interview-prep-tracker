/**
 * SEED SCRIPT — Run once to initialise the database
 * Usage: node seed.js
 * 
 * This creates the three required documents in MongoDB:
 *   1. approved_ques    — approved questions collection (starts empty per topic)
 *   2. not_approved_ques — pending questions (starts empty)
 *   3. approved_exps    — approved experiences with company list
 */

require('dotenv').config();
const mongoose = require("mongoose");
const Approved_que = require("./models/Approved_que");
const Not_approved_que = require("./models/Not_approved_que");
const Approved_exp = require("./models/Approved_exp");

const MONGODB_URI = process.env.MONGODB_URI ||
  "mongodb+srv://anuradhaharale:Aklhf%4029@cluster0.oyqttry.mongodb.net/Interview_Tracker?retryWrites=true&w=majority&appName=Cluster0";

const TOPICS = [
  "Arrays",
  "Searching & Sorting",
  "Matrix",
  "Strings",
  "Hashing",
  "Bit Manipulation",
  "Linked List",
  "Stack",
  "Queue",
  "Trees",
  "Heaps",
  "Graphs",
  "Greedy Algorithms",
  "Dynamic Programming",
  "Recursion/Backtracking",
  "Other"
];

const COMPANIES = [
  "google", "microsoft", "flipkart", "amazon", "goldmanSachs",
  "uber", "oracle", "wipro", "L&T", "IBM", "JPMC", "americanExpress", "other"
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB — seeding...");

    // 1. Approved Questions
    const existingApproved = await Approved_que.findOne({});
    if (!existingApproved) {
      const topicsData = TOPICS.map(t => ({ title: t, questions: [] }));
      const doc = await Approved_que.create({ topics: topicsData });
      console.log("✅ Created approved_que doc:", doc._id.toString());
    } else {
      console.log("ℹ️  approved_que already exists:", existingApproved._id.toString());
    }

    // 2. Not-Approved Questions
    const existingNotApproved = await Not_approved_que.findOne({});
    if (!existingNotApproved) {
      const topicsData = TOPICS.map(t => ({ title: t, questions: [] }));
      const doc = await Not_approved_que.create({ topics: topicsData });
      console.log("✅ Created not_approved_que doc:", doc._id.toString());
    } else {
      console.log("ℹ️  not_approved_que already exists:", existingNotApproved._id.toString());
    }

    // 3. Approved Experiences
    const existingExp = await Approved_exp.findOne({ type: true });
    if (!existingExp) {
      const companiesData = COMPANIES.map(c => ({ companyName: c, experiences: [] }));
      const doc = await Approved_exp.create({ type: true, companies: companiesData });
      console.log("✅ Created approved_exp doc:", doc._id.toString());
    } else {
      console.log("ℹ️  approved_exp already exists:", existingExp._id.toString());
    }

    console.log("\n🎉 Seeding complete! You can now run: npm start");
  } catch (err) {
    console.error("❌ Seed error:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
