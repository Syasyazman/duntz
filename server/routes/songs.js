const router = require("express").Router();
const { User } = require("../models/user");
const { Song, validate } = require("../models/song");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validObjectId = require("../middleware/validObjectId");
const { use } = require("./users");

// create song
router.post("/", admin, async (req, res) => {
    const { error } = validate(req.body);

    if (error) return res.status(400).send({ message: error.details[0].message });

    const song = await Song(req.body).save();
    res.status(201).send({ data: song, message: "Song created successfully" });
});

// get all liked songs
router.get("/like", auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    const songs = await Song.find({ _id: user.likedSongs });
    res.status(200).send({ data: songs });
    
});

// get all songs
router.get("/", admin, async (req, res) => {
    const songs = await Song.find();
    res.status(200).send({ data: songs });
});


// get song by id
router.get("/:id", [validObjectId, auth], async (req, res) => {
    const song = await Song.findById(req.params.id);
    res.status(200).send({ data: song });
});

// update song by id
router.put("/:id", [validObjectId, admin], async (req, res) => {
    const song = await Song.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).send({ message: "Song updated successfully", data: song });
})

// delete song by id
router.delete("/:id", [validObjectId, admin], async (req, res) => {
    await Song.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Song deleted successfully" });
});

// like song by id
router.put("/like/:id", [validObjectId, admin], async (req, res) => {
    const song = await Song.findById(req.params.id);

    if (!song) return res.status(400).send({ message: "Song does not exist" });

    const user = await User.findById(req.user._id);
    const index = user.likedSongs.indexOf(song._id);
    let resMessage = "";

    if (index === -1) {
        user.likedSongs.push(song._id);
        resMessage = "Added to your liked songs";
    } else {
        user.likedSongs.splice(index, 1);
        resMessage = "Removed from your liked songs";
    }
    
    await user.save();
    res.status(200).send({ message: resMessage });
});

module.exports = router;