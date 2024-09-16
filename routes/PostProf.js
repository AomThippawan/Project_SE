const express = require("express");
const router = express.Router();

const {postPostProf,editPostProf,deletePostProf,getPostProf} = require ("../controllers/PostProf");

router.post("/", async (req,res) => {
    res.sendStatus(400);
});

router.post("/post",postPostProf);
router.put("/update/:id",editPostProf);
router.delete("/delete/:id",deletePostProf);
router.get("/",getPostProf);
module.exports = router;