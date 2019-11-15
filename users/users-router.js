const router = require("express").Router();
const Users = require("../database/helpers/usermodle");

// GET - all users 
router.get("/", async (req, res) => {
    try {
        const users = await Users.find();

        res.status(200).json(users);
    } catch(err) {
        res.status(500).json({ error: "Server failed to grab all users." });
    }

});

module.exports = router;