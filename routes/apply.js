const express = require("express");
const router = express.Router();

const {applyJob} = require ("../controllers/applyJob");

router.post("/", async (req,res) => {
    res.sendStatus(400);
});

router.post("/apply",applyJob);
module.exports = router;