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
	data: [],
	keyData:[],

	initListener: function () {
		$(window).keyup(function (e) {
			var code = e.keyCode;
			console.log('keyup :', code);
			var exampleText = $('#exampleText').text().trim();
			var inputText = $('#inputText').val().trim();

			switch (code){
				case 13:// enter key
					_type.pushTime();
					clearInterval(_type.timer);
					_type.evaluate(exampleText, inputText);
					break;
				default:
			}
		});
		$('#inputText').focus();
		$('#startButton').click(function () {
			_type.pushTime();
			$('#inputText').focus();
			var count = 0;
			_type.timer = setInterval(function () {
				$('#timeElapse').text((count * 0.1).toFixed(1));
				++count;
			}, 100);
		});
	},

	pushTime : function () {
		_type.timestamps.push(new Date().getTime());
	},
	getTime : function (index) {
		if(index === undefined)
			index = 0;

		return _type.timestamps[index];
	},

	evaluate: function (example, typing) {
		var example = Hangul.disassemble(example, true);
		var typing = Hangul.disassemble(typing, true);
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

		console.log('전체 ', Hangul.disassemble(example).length, '타이핑 중 ', missTypings.length, ' 개 오타', missTypings);
		$('#msg').text(Hangul.disassemble(example).length + '타이핑 중 ' + missTypings.length + ' 개 오타')
	}
};