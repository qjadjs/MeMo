const router = require("express").Router();
const User = require("../models/User");

// router.get("/", (req, res) => {
//     res.send("auth router");
// });

//회원가입
router.post("/register" , async (req, res) => {
    try {
        const newUser = await new User ({    
            email: req.body.email,
            password: req.body.password,
            currentpassword: req.body.currentpassword,
            username: req.body.username,
        });
        
        
        const user = await newUser.save();
        return res.status(200).json(user);  

    } catch(err) {
        return res.status(500).json(err);
    }
});

//로그인
router.post("/login" , async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).send("정보를 찾을 수 없습니다.");

        const vailedPassword = req.body.password === user.password;
        if (!vailedPassword) return res.status(400).json("비밀번호가 틀립니다.");

        return res.status(200).json(user);
        
    } catch (err) {
        return res.status.json(err);
    }
});

module.exports = router;