// Router로 Request 처리하기
// server.js에서 module로 불러올 수 있도록 모듈화
module.exports = function(app){
	app.get('/', function(req, res){
		res.render('index.html')
	});
	app.get('/about', function(req, res){
		res.render('about.html')
	});
	// ready route에서 chat_room, signal_room 2개의 채팅방 모두에 join 시키기
	// 새로운 사람들이 채팅룸에 입장할시, 룸안의 모 Client들에게 announce 전달하기
	app.io.route('ready', function(req) {
		req.io.join(req.data.chat_room);
		req.io.join(req.data.signal_room);
		app.io.room(req.data.chat_room).broadcast('announce', {
			message: 'New client in the ' + req.data.chat_room + 'room .'
		});
	});
	// 채팅룸 내 사람들이 메시지를 보낼경우, 룸안의 모든 Client들에게 message 전달하기
	app.io.route('send', function(req) {
		app.io.room(req.data.room).broadcast('message', {
			message: req.data.message,
			author: req.data.author
		});
	});
	// signaling을 할 경우, 
	//Note the use of req here for broadcasting so only the sender doesn't receive their own messages
	app.io.route('signal', function(req) {
		req.io.room(req.data.room).broadcast('signaling_message', {
			type: req.data.type,
			message: req.data.message
		});
	});
}