/**********************************************************
 * Type Writer main script
 **********************************************************/
$(function () {
	// POWERMODE.colorful = true ;
	document.body.addEventListener('keyup', POWERMODE);
	_type.initListener();
});

var _type = {
	_props_ : {

	},
	timestamps: [],
	timer: 0,
	data: {
		"text":[
			'첫 번째 테스트 문장',
			'두 번째 테스트 문장',
			'세 번째 테스트 문장'
		]
	},
	textIndex: 0,

	keyData:[],

	initListener: function () {
		$(window).keyup(function (e) {
			var code = e.keyCode;
			console.log('keyup :', code);

			switch (code){
				case 13:// enter key
					_type.evaluate();
					_type.next();
					break;
				case 27:// ecs key
					_type.stop();
					break;
				default:
			}
		});

		$('#startButton').click(function () {
			$(this).fadeOut(1000, function () {
				_type.reset();
				_type.next();
			});
		});

		$('#fingerMode').click(function () {
			$('.word-input').hide();
			$('.dashboard').hide();
			$('.keyboard').show();
		});
		$('#wordMode').click(function () {
			$('.word-input').show();
			$('.dashboard').show();
			$('.keyboard').hide();
		});
		$('#sentenceMode').click(function () {
			$('.word-input').show();
			$('.dashboard').show();
			$('.keyboard').hide();
		});
		$('#practiceMode').click(function () {

		});
	},

	reset: function () {
		_type.clearTime();
		_type.textIndex = 0;
	},

	stop: function () {
		_type.pushTime();
		clearInterval(_type.timer);
	},

	setText: function (text) {
		$('#inputText').val('');
		$('#exampleText').text(text);
	},

	next: function () {
		_type.stop();

		var text = _type.data.text;
		if(_type.textIndex < text.length){
			_type.pushTime();
			$('#inputText').focus();
			var count = 0;
			_type.timer = setInterval(function () {
				$('#timeElapse').text((count * 0.1).toFixed(1));
				++count;
			}, 100);

			_type.setText(text[_type.textIndex]);
		}else{
			_type.pushTime();
		}
		_type.textIndex++;
	},

	pushTime : function () {
		_type.timestamps.push(new Date().getTime());
	},
	clearTime: function () {
		_type.timestamps = [];
	},
	getTime : function (index) {
		if(index === undefined)
			index = 0;

		return _type.timestamps[index];
	},

	evaluate: function () {
		var exampleText = $('#exampleText').text().trim();
		var typingText = $('#inputText').val().trim();
		var example = Hangul.disassemble(exampleText, true);
		var typing = Hangul.disassemble(typingText, true);
		// 오타의 인덱스 목록
		var missTypings = [];

		$.each(example, function (index, letter) {
			var typingLetter = typing[index];
			// 현재 검사하려는 문자에 해당하는 예시문장의 문자가 있는지 확인
			if(typingLetter){
				// 타이핑 수가 다르면 일단 오타
				if(letter.length !== typingLetter.length){
					missTypings.push(index);
				}else{// 타이핑 수가 같음. 이제부터 각 타이핑이 올바로 되었는지 개별 확인함.
					$.each(letter, function (idx, char) {
						var typingChar = typingLetter[idx];
						if(char !== typingChar){
							missTypings.push(index);
						}
					});
				}
			}else{//해당 index 의 예시 문장이 없어서 오타 취급
				missTypings.push(index);
			}
		});

		console.log('전체 ', Hangul.disassemble(exampleText).length, '타이핑 중 ', missTypings.length, ' 개 오타', missTypings);
		$('#msg').text(Hangul.disassemble(exampleText).length + '타이핑과 ' + exampleText.length + '개의 문자중 ' + missTypings.length + ' 개 오타')
	}
};