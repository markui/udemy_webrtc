// Router로 Request 처리하기
// server.js에서 module로 불러올 수 있도록 모듈화
module.exports = function(app){
	app.get('/', function(req, res){
		res.render('index.html')
	});
	app.get('/about', function(req, res){
		res.render('about.html')
	});
	// 새로운 사람들이 채팅룸에 입장할시, 해당 Client들에게 msg 전달하기
	app.io.route('ready', function(req) {
		req.io.join(req.data);
		app.io.room(req.data).broadcast('announce', {
			message: 'New client in the ' + req.data + 'room .'
		})
	});
	//
	app.io.route('send', function(req) {
		app.io.room(req.data.room).broadcast('message', {
			message: req.data.message,
			author: req.data.author
		});
	});

}