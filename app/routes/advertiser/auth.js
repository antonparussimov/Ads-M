
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/advertiser/auth");
const { check, validationResult } = require("express-validator");

const db = require('../../models');
const Advertiser = db.advertiser;
const User = db.user;
const AllowAdvertiser = db.allowAdvertiser;
const Op = db.Sequelize.Op;

// @route       GET api/advertiser/auth
// @desc        Get logged in advertiser
// @access      Private
router.get("/", auth, async (req, res) => {
  try {
    const advertiser = await Advertiser.findByPk(req.advertiser.id);
    res.json(advertiser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error "});
  }
});

// @route       POST api/advertiser/auth
// @desc        Auth advertiser & get Token
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
      let advertiser = await Advertiser.findOne({
        where: {
          email: email
        }
      });
      if (!advertiser) {
        return res.status(400).send({ msg: "Invalid Credentials" });
      }
      const isMatch = await bcrypt.compare(password, advertiser.password);
      if (!isMatch) {
        return res.status(400).send({ msg: "Invalid Credentials" });
      }
      const payload = {
        advertiser: {
          id: advertiser.id
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

// @route       POST api/advertiser/auth/update_info
// @desc        Update Auth advertiser & get Token
// @access      Public
router.post("/update_info", auth, async (req, res) => {
  Advertiser.update({advertiserId: req.body.advertiserId, accessToken: req.body.accessToken}, {
    where: {
      id: req.advertiser.id
    }
  }).then((advertiser) => {
    Advertiser.findByPk(req.advertiser.id)
      .then(advertiser => {
        res.json(advertiser)
      })
      .catch(err => {
        res.status(500).json({message: "Database Error"})
      })
  }).catch((err) => {
    console.log(err.message)
    res.status(500).json({message: "Database Error"})
  })
})

// @route       GET api/advertiser/auth/get_users
// @desc        get Users list
// @access      Public
router.get("/get_users", auth, async(req, res) => {
  User.findAll()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.status(500).json({msg: "Database error"})
    })
})

// @route       GET api/advertiser/auth/get_allow_users
// @desc        get allow Users list
// @access      Public
router.get("/get_allow_users", auth, async(req, res) => {
  try {
    const advertiser = await Advertiser.findByPk(req.advertiser.id);
    const users = await advertiser.getUsers()
    res.json(users)
  } catch (error) {
    res.status(500).json({msg: "Database error"})
  }
})

// @route       POST api/advertiser/auth/set_allow_users
// @desc        get allow Users list
// @access      Public
router.post("/set_allow_users", auth, async(req, res) => {
  try {
    const advertiser = await Advertiser.findByPk(req.advertiser.id);
    await advertiser.setUsers([])
    const { allowUsers } = req.body
    for(let i = 0 ; i < allowUsers.length ; i ++) {
      const user = await User.findByPk(allowUsers[i])
      await advertiser.addUser(user)
    }

    res.json(await advertiser.getUsers())
  } catch (error) {
    res.status(500).json({msg: "Database error"})
  }
})

module.exports = router;
