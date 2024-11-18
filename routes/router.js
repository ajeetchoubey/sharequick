const { Router } = require("express")
const { upload } = require("../service/fileStorage");
const { files } = require("../db");
const { io } = require("../service/socket");

const router = new Router();

router.post("/upload", upload.single("file"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                messaeg: "No file selected"
            })
        }

        const newFile = {
            fileName: req.file.originalname,
            path: req.file.path
        }

        files.push(newFile);
        return res.status(200).json({ success: true, message: "File uploaded successfully" });

        io().emit("updateFileList", files)
    } catch (error) {
        console.log("Error in uploading file: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})
router.get("/download/:fileName", (req, res) => {
    const fileName = req.params.fileName;
    const filePath = "./uploads/" + fileName;

    res.download(filePath, (err) => {
        if (err) {
            console.log("Error in downloading file: ", err);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    })
})

module.exports = router;