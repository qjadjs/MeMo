const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");


router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    console.log(newPost);
    try {
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    } catch (err) {
        return res.status(500).json(err);
    }

})

// 유저정보 습득
// router.get("/:id" , async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//     }
// })


router.put("/:id", async (req, res) => {
    try {


        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({
                $set: req.body,

            });
            return res.status(200).json("수정완료");
        } else {
            return res.status(500).json("자신의것이 아닙니다.")
        }
    } catch (err) {
        return res.status(500).json(err)
    }
});

router.delete("/:id", async (req, res) => {
    
    try {


        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            return res.status(200).json("삭제완료");
        } else {
            return res.status(500).json("자신의것이 아닙니다.")
        }
    } catch (err) {
        console.log("요청은온다");
        return res.status(500).json(err)
    }
});

//포스트내용 불러오기
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        return res.status(200).json(userPosts)
    } catch (err) {
        return res.status(500).json(err);
    }
})


module.exports = router;