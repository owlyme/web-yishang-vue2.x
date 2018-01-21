const { exec } = require('child_process');
const querystring = require("querystring");
const fs = require('fs')
const formidable = require('formidable')


function start(response,  request) {
	console.log("Request handler 'start' was called.");

	var body = '<form action="/upload" enctype="multipart/form-data" '+
		'method="post">'+
		'<input type="text" name="title"><br>'+
		'<input type="file" name="upload" multiple="multiple"><br>'+
		'<input type="submit" value="Upload">'+
		'</form>'

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();

}

function upload(response, request) {
	console.log("Request handler 'upload' was called.");
	let form = new formidable.IncomingForm()
		form.uploadDir = './upload/'
		form.parse(request, (err, fields, files)=>{

			fs.rename(files.upload.path, "./upload/test.jpg", function(err) {
			if (err) {
				fs.unlink("./upload/test.jpg");
				fs.rename(files.upload.path, "./upload/test.jpg");
				}
			});

			console.log(files.upload.path)

			response.writeHead(200, {"Content-Type": "text/html"});
			response.write("received image:<br/>");
			response.write("<img src='/show' />");
			response.end();

		})
}

function show(response, request){
	console.log("Request handler 'show' was called.")
	
	fs.readFile('./upload/test.jpg','binary', (error, file)=>{
		if(error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		}else{
			response.writeHead(200, {"Content-Type": "image/jpg"});
			response.write(file, "binary");
			response.end();
		}
	})
}
function uploadFiles(response, pathname){
	console.log("Request handler 'uploadFiles' was called.")	
	fs.readFile('./'+ pathname,'binary', (error, file)=>{
		if(error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		}else{
			response.writeHead(200, {"Content-Type": "image/"});
			response.write(file, "binary");
			response.end();
		}
	})
}



exports.start = start;
exports.upload = upload;
exports.show = show;
exports.uploadFiles = uploadFiles;

function sleep(milliSeconds) {
	var startTime = new Date().getTime();
	while (new Date().getTime() < startTime + milliSeconds);
}