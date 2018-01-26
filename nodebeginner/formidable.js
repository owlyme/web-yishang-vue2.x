const formidable = require('formidable')
const http= require('http')
const util=require('util');



http.createServer( (req, res)=>{
	if(req.url == '/upload' && req.method.toLowerCase() == 'post'){
		let form = new formidable.IncomingForm()
		form.uploadDir = './upload/'		
		form.parse(req, (err, fields, files)=>{
			console.log(fields, files)
			res.writeHead(200, {'content-type': 'text/plain'});
			res.write('received upload:\n\n');
			res.end(util.inspect({fields: fields, files: files}));
		})
		return
	}

	res.writeHead(200, {'content-type': 'text/html'});
	res.end(
		'<form action="/upload" enctype="multipart/form-data" '+
		'method="post">'+
		'<input type="text" name="title"><br>'+
		'<input type="file" name="upload" multiple="multiple"><br>'+
		'<input type="submit" value="Upload">'+
		'</form>'
	);

}).listen(8001,'127.0.0.1')