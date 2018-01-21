const server = require('./server.js')
const router = require('./router.js')
const requsetHandler  = require("./requestHandlers.js")


const handle = {}
handle["/"] = requsetHandler.start;
handle["/start"] = requsetHandler.start;
handle["/upload"] = requsetHandler.upload;
handle["/show"] = requsetHandler.show;
handle["/uploadFiles"] = requsetHandler.uploadFiles;
// console.log(handle)
server.start( router.route, handle )