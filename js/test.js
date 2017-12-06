$(function () {
	_play.loadKeyMap('json/keymap.json');
	// document.body.addEventListener('keyup', POWERMODE);
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

				// 한글, 영문 입력 a~z, A~Z, ㄱ~ㅎ, ㅏ~ㅣ
				case 65:
				case 66:
				case 67:
				case 68:
				case 69:
				case 70:
				case 71:
				case 72:
				case 73:
				case 74:
				case 75:
				case 76:
				case 77:
				case 78:
				case 79:
				case 80:
				case 81:
				case 82:
				case 83:
				case 84:
				case 85:
				case 86:
				case 87:
				case 88:
				case 89:
				case 90:
					inputLetter(e);
					break;

				// 엔터키의 경우 개행이 있는 문장에서는 개행하고, 없는 문장에서는 레벨을 끝내려는 유저의 의도로 판단함
				// 개행문장의 경우 개행이 아직 아닌데 엔터키를 누르면 개행전까지의 타이핑을 전부 오타처리하고 개행부터 다시 판단.
				case 13: // enter
					e.preventDefault();
					inputLetter(e);
					enterKeyLoop();
					break;

				// 숫자, 기호 입력 케이스(숫자, 기호 입력은 입력 즉시 다음 칸으로 움직이고 한글 도깨비불 현상이 없음)
				case 32: // space bar
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
					e.preventDefault();
					inputLetter(e);
					setNextIndex();
					clearBuffer();
					break;

				default:

			}

			function inputLetter(e) {
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
				if(letter.length === 0)
					return;

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

				return bool;
			}
			function updateDisplay(charArray) {
				$('#letterList').find('.active').find('.typing').text(Hangul.a(charArray));
			}
			function setPrevIndex() {
				var active = $('#letterList').find('.active');
				var prev = active.prev().addClass('active');
				if(prev.length){
					active.removeClass('active');
					setScroll(prev);
				}
			}
			function setNextIndex() {
				var active = $('#letterList').find('.active');
				if(active.length === 0)
					return false;

				var next = active.next().addClass('active');
				setScroll(next);
				active.removeClass('active');

				if (next.length === 0)
					finish();
			}
			function setScroll(element) {
				if(!element || element.length === 0)
					return;

				var container = $('#letterList');
				var sc = element.position().top + container.scrollTop();
				container.stop().animate({scrollTop: sc});
			}
			function enterKeyLoop() {
				if($('#letterList').find('.active').length === 0)
					return;

				if(isEnterKey()){
					evaluate();
					setNextIndex();
					clearBuffer();
				}else{
					evaluate();
					setNextIndex();
					enterKeyLoop();
				}
			}
			function isEnterKey() {
				var active = $('#letterList').find('.active');
				if(active && active.length === 0)
					return false;
				return (active.hasClass('enter-key'));
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
				// console.log(Hangul.d(_play.level.text).length, 60 / _play.level.timeCount);

				// 총 n 개의 글자 중 n 개의 오탈자, 총 m 개의 타이핑 중 m 개의 오타, 분당 k 타
				// 정확도 %, 타이핑과 타이핑의 평균 속도

				var totalLetterLength = String(_play.level.text).length;
				var totalCharLength = Hangul.d(_play.level.text).length;
				var incorrectedLetters = $('#letterList').find('.letter.incorrected');
				var incorrectedLetterLength = incorrectedLetters.length;
				var elapseTime = (_play.level.timeCount * 0.01).toFixed(1);

				var incorrectedCharLength = 0;
				$.each(incorrectedLetters, function (index, value) {
					var text = Hangul.d($(value).find('.text').text());
					var typing = Hangul.d($(value).find('.typing').text());

					for(var i = 0; i < text.length; i++){
						if(text[i] !== typing[i]){
							incorrectedCharLength++;
						}
					}
					if(text.length < typing.length){
						incorrectedCharLength += typing.length - text.length;
					}
				});

				var accuracy = (((totalCharLength - incorrectedCharLength) / totalCharLength) * 100).toFixed(1);
				var speedPerMin = ((totalCharLength - incorrectedCharLength ) * (60 / elapseTime)).toFixed(1);


				$('#msg').html('총 글자수: ' + totalLetterLength + '중 ' + incorrectedLetterLength + '글자 오탈자.<br>총 입력해야할 타이핑 수 : ' + totalCharLength + '개중 ' + incorrectedCharLength + '개의 오타<br>총 시간 : ' + elapseTime + '초<br>정확도 : ' + accuracy + '%<br>분당 타수 : ' + speedPerMin + '타');


				// $('#msg').html( '<span id="letterLength">' + example.length + '</span>개의 문자, <span id="typingLength">'+Hangul.d(_play.level.text).length + '</span>타이핑과 <span id="missTypingLength">' + missCount + '</span> 개 오타')
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

			if(letter === '↩')
				letterElement.addClass('enter-key');

			if(i === 0)
				letterElement.addClass('active');
		}
	},
	getNewLevelObject: function () {
		return {
			title: "-",
			text : "세계의 끝과 하드보일드 원더랜드",
			language: "kr",
			index: 0,
			keyBuffer: [],
			record: [],
			interval: null,
			timeCount: 0
		}
	}
};