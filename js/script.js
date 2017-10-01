/**********************************************************
 * Type Writer main script
 **********************************************************/
$(function () {
	// POWERMODE.colorful = true ;
	document.body.addEventListener('keyup', POWERMODE);
	_type.initListener();
	_type.loadJson();
});

var _type = {
	consts: {
		FINGER_MODE: 'fingerMode',
		WORD_MODE: 'wordMode',
		SENTENCE_MODE: 'sentenceMode',
		PRACTICE_MODE: 'practiceMode'
	},
	_props_ : {

	},
	timestamps: [],
	timer: 0,
	data: {},// json data
	textIndex: 0,
	letterIndex: 0,

	keymap:{},

	mode: {
		selected: null,
		GET: function () {
			if(_type.mode.selected)
				return _type.mode[_type.mode.selected];
			else
				return new Error('Mode select Error.')
		},
		fingerMode:{
			index : 0,
			keydown: function (code) {
				_type.jq.keyboardKeyDown(code);
				switch (code){
					case 16:// shift
						_type.jq.keyboardShifting();
						break;
					default:
				}
			},
			keyup: function (code) {

				_type.jq.keyboardKeyUp(code);

				switch (code){
					case 16:// shift
						_type.jq.keyboardUnshifting();
						break;
					case 13: // enter
					case 17: // ctrl
					case 91: // win key
					case 18: // alt - left
					case 32: // space
					case 21: // alt - right
					case 93: // context menu
					case 25: // ctrl - right
					case 220: // backslash
					case 8: // backspace
					case 20: // caps
						// 아무것도 하지 않는 케이스들
						break;
					default:
						var result = _type.calc.fingerMatch(code);
						_type.jq.fingerMatchDisplay(result);
						setTimeout(_type.mode.fingerMode.next, 1000);
				}

			},
			next: function () {
				var idx = _type.jq.getMatchedLetterLength();

				if(idx > 0)
					_type.jq.offKeyboard(_type.jq.getCurrentLetterKeyCode(idx-1));

				var letterLength = _type.jq.getAllLetterLength();
				if(letterLength === idx)
					_type.mode.fingerMode.reset();
				else
					_type.jq.onKeyboard(_type.jq.getCurrentLetterKeyCode(idx));
			},
			reset: function () {
				var letterCodes = _type.data.letter[_type.letterIndex];
				if(!letterCodes)
					return;

				var letterObjects = {};
				$.each(letterCodes, function (index, value) {
					letterObjects['code'+value] = _type.keymap['code'+value];
				});

				var el = $('#exampleLetter').text('');
				$.each(letterObjects, function (key, obj) {
					el.append($('<span></span>').attr('data-key', key).text(obj.krn));
				});

				_type.mode.fingerMode.next();
				_type.letterIndex++;
			}
		},
		wordMode:{
			keyup: function (code) {
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
			}
		}
	},

	calc: {
		fingerMatch: function (code) {
			var idx = _type.jq.getMatchedLetterLength();
			var letter = _type.jq.getMatchingLetter(idx);
			return {
				index: idx,
				isMatch:  'code' + code === letter.data('key')
			}
		}
	},

	jq : {
		keyboardKeyDown: function (code) {
			$('.keyboard .row > div[data-key='+code+']').addClass('press');
		},
		keyboardKeyUp: function (code) {
			$('.keyboard .row > div[data-key='+code+']').removeClass('press');
		},
		keyboardShifting: function () {
			$('.keyboard .row > div > .kr').addClass('shifted');
		},
		keyboardUnshifting: function () {
			$('.keyboard .row > div > .kr').removeClass('shifted');
		},
		fingerMatchDisplay: function (result) {
			var letter = $('#exampleLetter').find('span').eq(result.index);
			if(result.isMatch){
				letter.addClass('match');
			}else{
				letter.addClass('miss');
			}
		},
		onKeyboard: function (code) {
			$('.keyboard .row > div[data-key='+code+']').addClass('on');
		},
		offKeyboard: function (code) {
			$('.keyboard .row > div[data-key='+code+']').removeClass('on');
		},
		offAllKeyboard: function () {
			$('.keyboard .row > div').removeClass('on');
		},
		getMatchingLetter: function (index) {
			return $('#exampleLetter').find('span').eq(index);
		},
		getMatchedLetterLength: function () {
			return $('#exampleLetter').find('.miss, .match').length;
		},
		getAllLetterLength: function () {
			return $('#exampleLetter').find('span').length;
		},
		getCurrentLetterKeyCode: function (index) {
			return $('#exampleLetter').find('span').eq(index).data('key')
		}
	},


	initListener: function () {
		$(window).keyup(function (e) {
			console.log('keyup :', e.keyCode);
			_type.mode.GET().keyup(e.keyCode);

		}).keydown(function (e) {
			// console.log('keydown :', code);
			_type.mode.GET().keydown(e.keyCode);
		});

		$('#startButton').click(function () {
			$(this).fadeOut(1000, function () {
				_type.reset();
				_type.next();
			});
		});

		$('nav > ul > li').click(function () {
			if(_type.mode.selected)
				$('#' + _type.mode.selected).removeClass('select');

			$(this).addClass('select');
		});

		$('#fingerMode').click(function () {
			$('.word-input').hide();
			$('.dashboard').hide();
			$('.letter-view').show();
			$('.keyboard').show();
			_type.createKeyMap();
			_type.mode.fingerMode.reset();
			_type.mode.selected = _type.consts.FINGER_MODE;
		});
		$('#wordMode').click(function () {
			$('.word-input').show();
			$('.dashboard').show();
			$('.letter-view').hide();
			$('.keyboard').hide();
			_type.mode.selected = _type.consts.WORD_MODE;
		});
		$('#sentenceMode').click(function () {
			$('.word-input').show();
			$('.dashboard').show();
			$('.letter-view').hide();
			$('.keyboard').hide();
			_type.mode.selected = _type.consts.SENTENCE_MODE;
		});
		$('#practiceMode').click(function () {

			_type.mode.selected = _type.consts.PRACTICE_MODE;
		});
	},

	loadJson: function () {
		$.getJSON('json/data.json', function (d) {
			_type.data = d;

			$('#fingerMode').trigger('click');
		});
	},

	createKeyMap: function () {
		$('.keyboard > .row > div:not(".disable")').each(function (index, element) {
			var key = $(this).data('key');
			var d = {};

			var krs = $(this).find('.kr > .shift');
			if(krs.length)
				d['krs'] = krs.text();

			var krn = $(this).find('.kr > .normal');
			if(krn.length)
				d['krn'] = krn.text();

			var ens = $(this).find('.en > .shift');
			if(ens.length)
				d['ens'] = ens.text();

			var enn = $(this).find('.en > .normal');
			if(enn.length)
				d['enn'] = enn.text();

			_type.keymap['code'+key] = d;
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

	modaless: function (msg, duration) {
		var dur = (duration) ? duration : 4000;
		var el = $('#modaless').text(msg);
		el.dequeue().show().css('margin-left', -el.outerWidth() * 0.5).delay(dur).fadeOut(500);
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