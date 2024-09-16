const express = require("express");
const router = express.Router();

const {registerstd,loginstu,showprofilestu} = require ("../controllers/Student");

router.post("/", async (req,res) => {
    res.sendStatus(400);
});

router.post("/register",registerstd);
router.post("/login",loginstu);
router.get("/",showprofilestu);

module.exports = router;
