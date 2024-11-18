const socketIO = require("socket.io");
const { files } = require("../db");

let io = null;

exports.initIO = (server) => {
    io = socketIO(server);

    io.on("connection", (socket) => {
        const userId = socket.id;
        console.info(`New user is connected: ${userId}`);

        io.emit("updateFileList", files);

        socket.on("disconnect", () => {
            console.info("User disconnecteed");
        })
    })
}

exports.io = () => io;