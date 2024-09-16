const express = require("express");
const router = express.Router();

const {postPostStu,editPostStu,deletePostStu,getPostStu} = require ("../controllers/PostStu");

router.post("/", async (req,res) => {
    res.sendStatus(400);
});

router.post("/post",postPostStu);
router.put("/update/:id",editPostStu);
router.delete("/delete/:id",deletePostStu);
router.get("/",getPostStu);
module.exports = router;