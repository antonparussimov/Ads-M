const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const db = require('../../models');
const Op = db.Sequelize.Op;
const Advertiser = db.advertiser;

// @route       POST api/advertiser
// @desc        Register a advertiser
// @access      Public
router.post(
  "/",
  [
    check("name", " Name is Required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid Email").isEmail(),
    check(
      "password",
      "Please enter a Passowrd with 6 or more charcters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array()[0].msg });
    }
    const { name, email, password } = req.body;
    try {
      let advertiser = await Advertiser.findOne({ 
        where: {
          email: email
        }
      });
      if (advertiser) {
        return res.status(400).json({ msg: "advertiser Already Exists" });
      }

      advertiser = {
        name: name,
        email: email,
        password: password
      };

      const salt = await bcrypt.genSalt(10);
      advertiser.password = await bcrypt.hash(password, salt);
      advertiser = await Advertiser.create(advertiser);

      const payload = {
        advertiser: {
          id: advertiser.id,
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
      res.status(500).send({message: "Server Error"});
    }
  }
);

module.exports = router;
