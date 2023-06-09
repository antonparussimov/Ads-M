const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const db = require('../models');
const User = db.user;
const AllowAdvertiser = db.allowAdvertiser;
const Op = db.Sequelize.Op;

// @route       GET api/auth
// @desc        Get logged in user
// @access      Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error "});
  }
});

// @route       POST api/auth
// @desc        Auth user & get Token
// @access      Public
router.post(
  "/",
  [
    check("email", " Please include a valid Email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array()[0].msg });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        where: {
          email: email
        }
      });
      if (!user) {
        return res.status(400).send({ msg: "Invalid Credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ msg: "Invalid Credentials" });
      }
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send({msg: "Server Error"});
    }
  }
);

// @route       GET api/auth/get_allow_advertisers
// @desc        Get logged in user
// @access      Private
router.get("/get_allow_advertisers", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const advertisers = await user.getAdvertisers();
    res.json({advertisers})
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error "});
  }
});

module.exports = router;
