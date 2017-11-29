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
			switch (code){

				// 아무것도 하지 않는 케이스들
				case 9:// tab
					e.preventDefault();
					break;
				case 16:// shift
				case 13: // enter
				case 17: // ctrl
				case 91: // win key
				case 18: // alt - left
				case 21: // alt - right
				case 93: // context menu
				case 25: // ctrl - right
				case 220: // backslash
				case 20: // caps
					break;

				case 8: // backspace
					if(_play.level.keyBuffer.length){
						_play.level.keyBuffer.pop();
						evaluate();
					}else{
						removeEvaluate();
						setPrevIndex();
					}

					updateDisplay(_play.level.keyBuffer);
					evaluate();
					break;

				case 32: // space

					evaluate();
					setNextIndex();
					if(_play.level.keyBuffer.length){
						evaluate();
						setNextIndex();
					}
					clearBuffer();
					break;

				default:

					var lang = _play.level.language;
					var shiftKey = (e.shiftKey) ? "s" : "n";
					var char = _play.keymap['code'+ code][lang + shiftKey];

					addBuffer(char);
					var letter = Hangul.a(_play.level.keyBuffer);
					if(letter.length > 1){
						var letters = Hangul.d(letter, true);
						updateDisplay(letters.shift());
						evaluate();
						_play.level.keyBuffer = letters[0];
						setNextIndex();
					}

					updateDisplay(_play.level.keyBuffer);
					evaluate();
			}

			console.log(_play.level.keyBuffer);

			function removeEvaluate() {
				$('#letterList').find('.active').removeClass('incorrected').removeClass('corrected');
			}
			function evaluate() {
				var letter = $('#letterList').find('.active');
				var text = letter.find('.text').text().trim();
				var typing = letter.find('.typing').text().trim();
				console.log(text === typing, text, typing);
				if(text === typing){
					letter.removeClass('incorrected');
					letter.addClass('corrected');
				}else{
					letter.removeClass('corrected');
					letter.addClass('incorrected');
				}
			}
			function updateDisplay(charArray) {
				$('#letterList').find('.active').find('.typing').text(Hangul.a(charArray));
			}
			function setNextIndex() {
				var active = $('#letterList').find('.active');
				var next = active.next().addClass('active');
				if(next.length)
					active.removeClass('active');
			}
			function setPrevIndex() {
				var active = $('#letterList').find('.active');
				var prev = active.prev().addClass('active');
				if(prev.length)
					active.removeClass('active');
			}

			function clearBuffer() {
				_play.level.keyBuffer = [];
			}

			function addBuffer(char) {
				_play.level.keyBuffer.push(char);
			}

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
			text : "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세.",
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