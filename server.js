const express = require("express")
const router = require("./routes/router");
const { getNetworkIpAddress } = require("./service/network");
const { initIO } = require("./service/socket");

const ipAddress = getNetworkIpAddress();
console.log(ipAddress)

const app = express();
const port = 3000;

// Middlewares
app.use("/", express.static("./public"))
app.use("/uploads", express.static("./uploads"))

// Routes
app.use("/api/v1", router)

const server = app.listen(port, () => {
    if (!ipAddress) {
        console.info(`Server stopped`);
        process.exit(0)
    }
    console.info(`Server running on port ${port}`);
    console.info(`Server connection address for file sharing is http://${ipAddress}:${port}`)
})

initIO(server);