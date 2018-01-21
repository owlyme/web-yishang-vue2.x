const http = require('http')
const url = require('url')


const start = (route, handle) =>{

	const onRequest = (request, response)=>{
		let pathname = url.parse(request.url).pathname
		console.log("Request for " + pathname + " received.");
		// route( handle, pathname, response )
		
			route(handle, pathname, response,request);
		
	}

	http.createServer(onRequest).listen(8000,'127.0.0.1')
	console.log("Server has started, localhost:"+8000);
}

exports.start = start

