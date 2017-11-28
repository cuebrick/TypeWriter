$(function () {
	_play.loadKeyMap('json/keymap.json');
});


var level = {
	text : "세계의 끝과 하드보일드 원더랜드",
	keyBuffer: []
};


var _play = {
	keymap: undefined,
	level: undefined,

	loadKeyMap: function (url) {
		$.getJSON(url, function (d) {
			_play.keymap = d;
			_play.initListener();
			_play.init();
		});
	},
	init: function () {
		_play.level = _play.getNewLevelObject();
		_play.setLevelText(_play.level.text);
	},
	initListener: function () {
		$(window).keydown(function (e) {
			var code = e.keyCode;
			var buffer = _play.level.keyBuffer;
			switch (code){
				case 8: // backspace
					buffer.pop();
					break;

				// 아무것도 하지 않는 케이스들
				case 16:// shift
				case 13: // enter
				case 17: // ctrl
				case 91: // win key
				case 18: // alt - left
				case 32: // space
				case 21: // alt - right
				case 93: // context menu
				case 25: // ctrl - right
				case 220: // backslash
				case 20: // caps
					break;
				default:

					var lang = _play.level.language;
					var shiftKey = (e.shiftKey) ? "s" : "n";
					var char = _play.keymap['code'+ code][lang + shiftKey];

					// 모음일경우 계속 추가(예외: 모음이 이미 하나 이상 있고 종성도 있는 경우)
					// 초성일 경우 계속 추가(버퍼에 종성이 이미 있는 경우 다음 인덱스로 이동하고 새로 추가)
					// 종성일 경우

					if(buffer.length === 0){
						addBuffer(char);
					}else{
						if(Hangul.a(buffer.concat(char)).length <= 1 && Hangul.isComplete(Hangul.a(buffer.concat(char)))){
							addBuffer(char);
							console.log('나온다?');
						}else{
							setNextIndex();
							var poped = buffer.pop();
							$('#letterList').find('.active').find('.typing').text(Hangul.assemble(buffer));
							_play.level.keyBuffer = [];
							// console.log('dasdfasdf', buffer, char);
							addBuffer(poped);
							addBuffer(char);
						}
					}
			}

			function setNextIndex() {
				// _play.level.index = index;
				var active = $('#letterList').find('.active');
				active.next().addClass('active');
				active.removeClass('active');
			}

			function addBuffer(char) {
				_play.level.keyBuffer.push(char);
			}

			console.log(_play.level.keyBuffer);
			$('#letterList').find('.active').find('.typing').text(Hangul.assemble(buffer))
		});
	},
	setLevelText: function (text) {
		var container = $('#letterList').text('');

		for(var i = 0; i < text.length; ++i){
			var letterElement = $('<div></div>').addClass('letter')
				.append($('<div></div>').addClass('text').text(text[i]))
				.append($('<div></div>').addClass('typing').text(''))
				.appendTo(container);

			if(i === 0)
				letterElement.addClass('active');
		}
	},
	getNewLevelObject: function () {
		return {
			text : "세계의 끝과 하드보일드 원더랜드 입니다.!",
			language: "kr",
			index: 0,
			keyBuffer: [],
			record: [
				/*{
					"timestamp": undefined,
					"keycode": undefined,
					"shifted": false
				}*/
			],
			tpm: 0
		}
	}
};