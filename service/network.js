const os = require("os");

exports.getNetworkIpAddress = () => {
    const networkInterfaces = os.networkInterfaces();

    const connectedNetworkInterface = Object.values(networkInterfaces).flatMap((interface) => interface).find((interface) => interface.family === "IPv4" && !interface.internal);

    if(connectedNetworkInterface){
        return connectedNetworkInterface.address;
    }else{
        return null;
    }
}