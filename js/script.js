/**********************************************************
 * Type Writer main script
 **********************************************************/
$(function () {
	// POWERMODE.colorful = true ;
	document.body.addEventListener('keyup', POWERMODE);
	_type.initListener();
	$('#fingerMode').trigger('click')
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
	data: {
		"text":[
			'첫 번째 테스트 문장',
			'두 번째 테스트 문장',
			'세 번째 테스트 문장'
		],
		"letter":['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ']
	},
	textIndex: 0,

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
				_type.efx.keyboardKeyDown(code);
			},
			keyup: function (code) {
				var result = _type.calc.fingerMatch(code);
				_type.efx.fingerMatchDisplay(result);
				_type.efx.keyboardKeyUp(code);
				_type.mode.fingerMode.next();
			},
			next: function () {
				var len = $('#exampleLetter').find('.miss, .match').length;

				if(len > 0)
					_type.efx.offKeyboard(_type.fn.getCurrentKeyCode(len-1));

				var letterLength = $('#exampleLetter').find('span').length;
				if(letterLength === len)
					_type.mode.fingerMode.reset();
				else
					_type.efx.onKeyboard(_type.fn.getCurrentKeyCode(len));
			},
			reset: function () {
				var letterCodes = [81, 87, 69, 82];
				var letterObjects = {};
				$.each(letterCodes, function (index, value) {
					letterObjects[value] = _type.keymap[value];
				});

				var el = $('#exampleLetter').text('');
				$.each(letterObjects, function (key, obj) {
					el.append($('<span></span>').attr('data-key', key).text(obj.krn))
				});

				_type.mode.fingerMode.next();
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
			var len = $('#exampleLetter').find('.miss, .match').length;
			var letter = $('#exampleLetter').find('span').eq(len);
			return {
				index: len,
				isMatch:  code === letter.data('key')
			}
		}
	},

	efx : {
		keyboardKeyDown: function (code) {
			$('.keyboard .row > div[data-key='+code+']').addClass('press');
		},
		keyboardKeyUp: function (code) {
			$('.keyboard .row > div[data-key='+code+']').removeClass('press');
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
		}
	},

	fn: {
		getCurrentKeyCode: function (index) {
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

		$('#fingerMode').click(function () {
			$('.word-input').hide();
			$('.dashboard').hide();
			$('.letter-view').show();
			$('.keyboard').show();
			_type.createKeyMap();
			_type.mode.fingerMode.next();
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

			_type.keymap[key] = d;
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