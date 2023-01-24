const express = require("express");
const app = express();
const PORT = 5000;
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const mongoose = require("mongoose");
const postRoute = require("./routes/posts");
const uploadRoute = require("./routes/upload");

// db접속
mongoose.connect("mongodb+srv://beoman0:qjadjs0@cluster0.kml5foj.mongodb.net/project?retryWrites=true&w=majority"
).then(() => {
    console.log("db접속중");
}).catch((err) => {
    console(err);
});


// 미들
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/upload", uploadRoute);

app.get("/", (req, res) => {
    res.send("dd")
});

app.listen(PORT, () => console.log("ON"));