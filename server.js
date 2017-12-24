// Express 서버 생성
var express = require('express.io');
var app = express();
app.http().io();
var PORT = 3000;

// 새로운 사람들이 채팅룸에 입장할시, 해당 Client들에게 msg 전달하기
app.io.route('ready', function(req) {
	req.io.join(req.data);
	app.io.room(req.data).broadcast('announce', {
		message: 'New client in the ' + req.data + 'room .'
	})
})

// 라우터 모듈인 main.js 를 불러와서 app 에 전달해줍니다.
var router = require('./router/main')(app);

// 서버가 읽을 수 있도록 HTML 의 위치를 정의해줍니다.
app.set('views', __dirname + '/views')

// 서버가 HTML 렌더링을 할 때, EJS 엔진을 사용하도록 설정합니다.
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


var server = app.listen(3000, function(){
	console.log('Express server has started on port ' + PORT)
})

app.use(express.static('public'));