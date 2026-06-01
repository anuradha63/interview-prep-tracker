const User = require("../models/User");
const Not_approved_que = require("../models/Not_approved_que");
const Approved_que = require("../models/Approved_que");
const Approved_exp = require("../models/Approved_exp");

//Get Requests
module.exports.admin_get = (req, res) => {
  res.render("admin.ejs");
};

module.exports.add_get = (req, res) => {
  res.render("add_admin.ejs");
};

module.exports.remove_get = (req, res) => {
  res.render("rem_admin.ejs");
};

module.exports.appr_que_get = (req, res) => {
  res.render("approve_que.ejs");
};

module.exports.appr_exp_get = (req, res) => {
  res.render("approve_exp.ejs");
};

module.exports.notAdmin_get = (req, res) => {
  res.render("notAdmin.ejs");
};

//Post Requests
module.exports.approve_que_post = async (req, res) => {
  const { title, name, platform, link } = req.body;
  try {
    const approvedDoc = await Approved_que.findOne({});
    const notApprovedDoc = await Not_approved_que.findOne({});

    if (approvedDoc) {
      await Approved_que.updateOne(
        { "_id": approvedDoc._id, "topics.title": title },
        {
          "$push": {
            "topics.$.questions": { "name": name, "platform": platform, "link": link }
          }
        }
      );
    }
    if (notApprovedDoc) {
      await Not_approved_que.updateOne(
        { "_id": notApprovedDoc._id, "topics.title": title },
        {
          "$pull": {
            "topics.$.questions": { "name": name, "platform": platform, "link": link }
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
  res.status(201).send({});
};

module.exports.reject_que_post = async (req, res) => {
  const { title, name, platform, link } = req.body;
  try {
    const notApprovedDoc = await Not_approved_que.findOne({});
    if (notApprovedDoc) {
      await Not_approved_que.updateOne(
        { "_id": notApprovedDoc._id, "topics.title": title },
        {
          "$pull": {
            "topics.$.questions": { "name": name, "platform": platform, "link": link }
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
  res.status(201).send({});
};

module.exports.add_post = async (req, res) => {
  const { email } = req.body;
  try {
    await User.updateOne({ "email": email }, { $set: { "isAdmin": true } });
  } catch (err) {
    console.log(err);
  }
  res.status(201).send({});
};

module.exports.remove_post = async (req, res) => {
  const { email } = req.body;
  try {
    await User.updateOne({ "email": email }, { $set: { "isAdmin": false } });
  } catch (err) {
    console.log(err);
  }
  res.status(201).send({});
};

module.exports.appr_exp_post = async (req, res) => {
  const { k, l } = req.body;
  let dataString = {};
  dataString["companies." + k + ".experiences." + l + ".approved"] = true;
  try {
    await Approved_exp.updateOne({ "type": true }, { "$set": dataString });
  } catch (err) {
    console.log(err);
  }
  res.status(201).send({});
};
