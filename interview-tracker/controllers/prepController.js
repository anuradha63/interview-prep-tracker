const Not_approved_que = require("../models/Not_approved_que");
const Approved_que = require("../models/Approved_que");

//Get Requests
module.exports.prep_get = (req, res) => {
  res.render("dashboard.ejs");
};

module.exports.question_get = (req, res) => {
  res.render("questions.ejs", { top: req.params.topic });
};

//Post Requests
module.exports.question_post = async (req, res) => {
  const { topic, name, website, url } = req.body;

  try {
    // Find the not-approved-que doc dynamically (no hardcoded ID)
    const doc = await Not_approved_que.findOne({});
    if (!doc) {
      return res.status(500).send({ error: "Database not seeded. Run: node seed.js" });
    }
    await Not_approved_que.updateOne(
      { "_id": doc._id, "topics.title": topic },
      {
        "$push": {
          "topics.$.questions": {
            "name": name,
            "platform": website,
            "link": url
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
  }

  res.status(201).send({});
};
