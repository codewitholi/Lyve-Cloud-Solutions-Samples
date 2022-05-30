const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const streamingRouter = require("./routes/streaming");

const app = express();

app.use(cors());

// app.get("/api/video", (req, res) => {
//     // Ensure `Range` header present
//     const range = req.get("Range");
//     if (!range) {
//         res.status(400).json({
//             "code": 400,
//             "message": "`range` header not present. "
//         });
//     } else {
//         // Get video size
//         const videoName = "Test_Recording.mov";
//         const videoPath = `server/media/${videoName}`;
//         const videoSize = fs.statSync(videoPath).size;

//         // Parse Range, e.g.: "bytes=32324-"
//         const CHUNK_SIZE = 2 * (10 ** 6); // 1MB
//         const start = Number(range.replace(/\D/g, ""));
//         const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

//         // Create headers
//         const contentLength = end - start + 1;
//         const headers = {
//             "Content-Range": `bytes ${start}-${end}/${videoSize}`,
//             "Accept-Ranges": "bytes",
//             "Content-Length": contentLength,
//             "Content-Type": "video/quicktime",
//         };

//         // HTTP Status 206 for Partial Content
//         res.set(headers);
//         res.status(206); // Partial Content

//         // create video read stream for this particular chunk
//         const videoStream = fs.createReadStream(videoPath, { start, end });

//         // Stream the video chunk to the client
//         videoStream.pipe(res);
//     }
// })

app.use(express.static(path.join(__dirname, "public")));

app.use("/", streamingRouter);

module.exports = app;
