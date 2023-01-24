const router = require("express").Router();
const { useParams } = require("react-router-dom");
const User = require("../models/User");

router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("유저 정보가 송신되었습니다")
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json("자신의 아이디가 아닙니다.")
    }
});

module.exports = router;