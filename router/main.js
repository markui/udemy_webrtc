// Router로 Request 처리하기
// server.js에서 module로 불러올 수 있도록 모듈화
module.exports = function(app){
	app.get('/', function(req, res){
		res.render('index.html')
	});
	app.get('/about', function(req, res){
		res.render('about.html')
	});

}