const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Approved_que = require("../models/Approved_que");
const Not_approved_que = require("../models/Not_approved_que");
const Approved_exp = require("../models/Approved_exp");

const JWT_SECRET = process.env.JWT_SECRET || "interviewTracker123";

// Protecting the Routes
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

// Checking Current User — always loads exp, approved_que etc regardless of login
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  // Always load global data (exp, approved_que) for all pages
  const loadGlobalData = async (loggedInUser) => {
    try {
      let approved_que = await Approved_que.findOne({});
      let not_approved_que = await Not_approved_que.findOne({});
      let approved_exp = await Approved_exp.findOne({ "type": true });
      res.locals.user = loggedInUser || null;
      res.locals.approved_que = approved_que;
      res.locals.not_approved_que = not_approved_que;
      res.locals.exp = approved_exp;
    } catch (e) {
      console.log("checkUser error:", e.message);
      res.locals.user = null;
      res.locals.approved_que = null;
      res.locals.exp = null;
    }
    next();
  };

  if (token) {
    jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        await loadGlobalData(null);
      } else {
        try {
          const user = await User.findById(decodedToken.id);
          await loadGlobalData(user);
        } catch (e) {
          await loadGlobalData(null);
        }
      }
    });
  } else {
    loadGlobalData(null);
  }
};

// Protect Admin Routes — reads from res.locals (safe, no race condition)
const checkAdmin = (req, res, next) => {
  if (res.locals.user && res.locals.user.isAdmin) {
    next();
  } else {
    res.redirect("/na");
  }
};

module.exports = { requireAuth, checkUser, checkAdmin };
