const express = require("express");
const router = express.Router();

const { registerProf,loginProf,showprofileProf } = require ("../controllers/Professor");

router.post("/", async (req,res) => {
    res.sendStatus(400);
});

router.post("/register", registerProf);
router.post("/login" ,loginProf);
router.get("/",showprofileProf);
module.exports = router;