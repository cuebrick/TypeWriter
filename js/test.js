$(function () {
	_play.loadKeyMap('json/keymap.json');
});


var _play = {
	keymap: undefined,
	data: undefined,
	level: undefined,

	loadKeyMap: function (url) {
		$.getJSON(url, function (d) {
			_play.keymap = d;
			_play.loadLevelData('json/level-data.json');
		});
	},
	loadLevelData: function (url) {
		$.getJSON(url, function (d) {
			_play.data = d;
			_play.createLevel();
			_play.initListener();
			// _play.init();
		});
	},
	createLevel: function () {
		var container = $('#levelList').text('');
		$.each(_play.data.sentence, function (key, value) {
			$('<div></div>').addClass('level-item')
				.append($('<div></div>').addClass('level-title').text(value.title))
				.attr('data-id', key)
				.appendTo(container);
		});

	},
	reset: function (id) {
		var level = _play.getNewLevelObject();
		var levelData = _play.data.sentence[id];
		level.title = levelData.title;
		level.text = levelData.text;
		level.language = levelData.language;
		_play.level = level;
		_play.setLevelTitle(_play.level.title);
		_play.setLevelText(_play.level.text);
	},
	initListener: function () {
		$('#levelList').on('click', '.level-item', function () {
			var id = $(this).data('id');
			_play.reset(id);
		});
		$(window).keydown(function (e) {
			var code = e.keyCode;
			// console.log(code);

			switch (code){
				// 아무것도 하지 않는 케이스들
				case 9: // tab
				case 18: // alt - left
				case 21: // alt - right
					e.preventDefault();
					break;
				case 16: // shift
				case 17: // ctrl
				case 93: // context menu
				case 25: // ctrl - right
				case 91: // win key
				case 20: // caps
				case 112: // F1
				case 113: // F2
				case 114: // F3
				case 115: // F4
				case 116: // F5
				case 117: // F6
				case 118: // F7
				case 119: // F8
				case 120: // F9
				case 121: // F10
				case 122: // F11
				case 123: // F12
				case 37: // left
				case 38: // up
				case 39: // right
				case 40: // down
					break;

				case 8: // backspace
					recordKey(e);
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

				default:
					recordKey(e);
					var lang = _play.level.language;
					var shiftKey = (e.shiftKey) ? "s" : "n";
					var char = _play.keymap['code'+ code][lang + shiftKey];

					addBuffer(char);
					var letter = Hangul.a(_play.level.keyBuffer);
					if(letter.length > 1){
						var letters = Hangul.d(letter, true);
						updateDisplay(letters.shift());
						evaluate();
						setNextIndex();
						_play.level.keyBuffer = letters[0];
					}

					updateDisplay(_play.level.keyBuffer);
					evaluate();

					// 숫자, 기호 입력 케이스(숫자, 기호 입력은 입력 즉시 다음 칸으로 움직이고 한글 도깨비불 현상이 없음)
					switch (code){
						case 13: // enter
						case 32:
						case 48: // 0
						case 49: // 1
						case 50: // 2
						case 51: // 3
						case 52: // 4
						case 53: // 5
						case 54: // 6
						case 55: // 7
						case 56: // 8
						case 57: // 9
						case 186: // ;
						case 187: // =
						case 188: // ,
						case 189: // -
						case 190: // .
						case 191: // slash
						case 192: // `
						case 219: // [
						case 220: // backslash
						case 221: // ]
						case 222: // '
							setNextIndex();
							clearBuffer();
							break;
						default:
					}
			}

			// console.log(_play.level.keyBuffer);

			function recordKey(keyEvent) {
				if(_play.level.interval === null){
					_play.level.interval = setInterval(function () {
						_play.level.timeCount++;
					}, 10);
				}

				_play.level.record.push({
					"timestamp": _play.level.timeCount,
					"keyCode": e.keyCode,
					"shiftKey": keyEvent.shiftKey
				});
			}
			function removeEvaluate() {
				$('#letterList').find('.active').removeClass('incorrected').removeClass('corrected');
			}
			function evaluate() {
				var letter = $('#letterList').find('.active');
				var text = letter.find('.text').text();
				var typing = letter.find('.typing').text();

				// console.log(text === typing, text, typing);

				var bool = (text === typing);
				if(bool){
					letter.removeClass('incorrected');
					letter.addClass('corrected');
				}else{
					letter.removeClass('corrected');
					letter.addClass('incorrected');
				}
				if(letter.next().length === 0 && bool){
					setNextIndex();
					finish();
				}
			}
			function updateDisplay(charArray) {
				$('#letterList').find('.active').find('.typing').text(Hangul.a(charArray));
			}
			function setPrevIndex() {
				var active = $('#letterList').find('.active');
				var prev = active.prev().addClass('active');
				if(prev.length)
					active.removeClass('active');
			}
			function setNextIndex() {
				var active = $('#letterList').find('.active');
				var next = active.next().addClass('active');
				// if(next.length)
				active.removeClass('active');
			}
			function clearBuffer() {
				_play.level.keyBuffer = [];
			}
			function addBuffer(char) {
				_play.level.keyBuffer.push(char);
			}
			function finish() {
				console.log('finish!!!');
				clearInterval(_play.level.interval);
				console.log(Hangul.d(_play.level.text).length, 60 / _play.level.timeCount);
				var str = '';
				$('#letterList').find('.letter').find('.typing').each(function (index, value) {
					str += $(value).text();
				});

				console.log(_play.level.text, str, _play.level.text === str);

				var example = Hangul.disassemble(_play.level.text, true);
				var typing = Hangul.disassemble(str, true);

				var missCount = 0;
				$.each(example, function (index, exampleLetter) {
					var typingLetter = typing[index];
					if(typingLetter){
						$.each(exampleLetter, function (idx, exampleChar) {
							var typingChar = typingLetter[idx];
							if(typingChar !== exampleChar){
								missCount++;
							}
						})
					}
				});

				$('#msg').html( '<span id="letterLength">' + example.length + '</span>개의 문자, <span id="typingLength">'+Hangul.d(_play.level.text).length + '</span>타이핑과 <span id="missTypingLength">' + missCount + '</span> 개 오타')
			}
		});
	},
	setLevelTitle: function (title) {
		$('#levelTitle').text(title);
	},
	setLevelText: function (text) {
		var container = $('#letterList').text('');

		var letter = '';
		for(var i = 0; i < text.length; ++i){

			letter = text[i];

			var letterElement = $('<div></div>').addClass('letter')
				.append($('<div></div>').addClass('text').text(letter))
				.append($('<div></div>').addClass('typing').text(''))
				.appendTo(container);

			if(letter === '↩'){
				letterElement.addClass('enter-key')
			}
			if(i === 0)
				letterElement.addClass('active');
		}
	},
	getNewLevelObject: function () {
		return {
			title: "애국가",
			text : "동해물과, 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세.",
			language: "kr",
			index: 0,
			keyBuffer: [],
			record: [],
			interval: null,
			timeCount: 0
		}
	}
};