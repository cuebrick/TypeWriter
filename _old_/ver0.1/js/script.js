/**********************************************************
 * Type Writer main script
 *
 * 작업 예정 목록
 * - 단어모드와 문장모드와의 차이첨 구현
 * -- 단어모드는 한 라인마다 타수를 계산해주고, 문장모드는 하나의 문장이 끝나면 계산
 * -- 문장모드는 중간에 과정을 끝내면 정말 끝낼건지 물어보고 끝내는 것을 선택하면 타수를 계산
 * - 손가락 모드 기능
 * -- 손가락 모양을 키보드 위에 표현
 * - 단어모드 기능
 * -- 단어모드 시작 버튼
 * - 문장모드 기능
 * -- 문장모드일 경우 앞 뒤 문장을 표시하여 유저에게 예측을 가능하도록 함.
 * -- 문장 수준에 맞게 선택하는 ui
 * - 실전모드 기능
 * -- 실전모드의 텍스트 문장을 선택하는 ui
 * - 데이터
 * -- json 데이터 수집하고 작성
 * -- 단어, 문장, 실전 모드의 데이터 구분
 * -- 쿠키에 데이터 저장/저장된 쿠키 데이터를 가져와 현재 상태로 세팅
 * - 버그
 * -- ie 의 경우 엔터키 오동작 수정
 * - 컨텐츠 (다음 버전?)
 * -- 전체 과정의 목록 화면
 * -- 전체 과정을 준비하고 보상 표식을 준비(ex:badge)
 * -- 전체 과정에 따른 상태 변경 준비
 **********************************************************/
$(function () {
	// POWERMODE.colorful = true ;

	_type.initListener();
	_type.loadJson();
});

var _type = {
	consts: {
		FINGER_MODE: 'finger',
		WORD_MODE: 'word',
		SENTENCE_MODE: 'sentence',
		PRACTICE_MODE: 'practice'
	},
	_props_ : {},
	timestamps: [],
	timer: 0,
	data: {
		letter: null
	},// json data
	// messageCodes: [],// modal, modaless 가 있는 경우 여기에 리스트업

	keymap:{},
	keymapData:{},

	powermode: {
		start: function () {
			document.body.addEventListener('keyup', POWERMODE);
		},
		stop: function () {
			document.body.removeEventListener('keyup', POWERMODE);
		}
	},

	cookie: {
		setCookie: function (cookieName, value, exdays) {
			var exdate = new Date();
			exdate.setDate(exdate.getDate() + exdays);
			var cookieValue = escape(value) + ((exdays===null) ? "" : "; expires=" + exdate.toGMTString());
			document.cookie = cookieName + "=" + cookieValue;
		},
		getCookie: function (cookieName) {
			cookieName = cookieName + '=';
			var cookieData = document.cookie;
			var start = cookieData.indexOf(cookieName);
			var cookieValue = '';
			if(start !== -1){
				start += cookieName.length;
				var end = cookieData.indexOf(';', start);
				if(end === -1)end = cookieData.length;
				cookieValue = cookieData.substring(start, end);
			}
			return unescape(cookieValue);
		},
		deleteCookie: function (cookieName) {
			var expireDate = new Date();
			expireDate.setDate(expireDate.getDate() - 1);
			document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
		}
	},

	mode: {
		selected: null,

		GET: function () {
			if(_type.mode.selected)
				return _type.mode[_type.mode.selected];
			else
				return new Error('Mode select Error.');
		},

		finger:{
			index : 0,
			letterGroupIndex: 0,
			isResetWaiting: false,
			currentLetterElement: null,
			keydown: function (code) {
				if(_type.mode.finger.isResetWaiting){
					return;
				}
				_type.jq.keyboardKeyDown(code);
				switch (code){
					case 16:// shift
						_type.jq.keyboardShifting();
						break;
					default:
				}
			},
			keyup: function (code, shiftKey) {

				if(_type.mode.finger.isResetWaiting){
					return;
				}
				console.log(code);
				_type.jq.keyboardKeyUp(code);

				switch (code){
					case 16:// shift
						_type.jq.keyboardUnshifting();
						break;

					// 아무것도 하지 않는 케이스들
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
						break;
					default:
						var result = _type.mode.finger.fingerMatch(code, shiftKey);
						_type.jq.fingerMatchDisplay(result);
						_type.mode.finger.next();
				}

			},

			fingerMatch: function (code, shiftKey) {
				var idx = _type.jq.getMatchedLetterLength();
				var letter = _type.jq.getMatchingLetter(idx);
				var obj = {index: idx};
				if(Boolean(letter.data('shift')) === shiftKey){
					obj['isMatch'] = (code === letter.data('key'));
				}else{
					obj['isMatch'] = false;
				}
				return obj;
			},

			next: function () {
				var current = _type.jq.getCurrentElement();
				if($(current).is('.modaless-item')){
					_type.modaless($(current).text());
					_type.mode.finger.index++;
					_type.mode.finger.next();
				}else{
					if(_type.mode.finger.currentLetterElement)
						_type.jq.removeBlink(_type.mode.finger.currentLetterElement);
					_type.mode.finger.currentLetterElement = current;
					_type.jq.setBlinkCurrentLetter(current);
					var idx = _type.jq.getMatchedLetterLength();

					if(idx > 0)
						_type.jq.offKeyboard(_type.jq.getCurrentLetterKeyCode(idx-1));

					_type.mode.finger.index++;

					var letterLength = _type.jq.getAllLetterLength();
					if(letterLength === idx){
						_type.mode.finger.isResetWaiting = true;
						setTimeout(_type.mode.finger.reset, 2000);
					} else {
						_type.jq.onKeyboard(_type.jq.getCurrentLetterKeyCode(idx));
					}
				}
			},

			off: function () {
				if(_type.mode.finger.currentLetterElement)
					_type.jq.removeBlink(_type.mode.finger.currentLetterElement);

				_type.mode.finger.currentLetterElement = null;
				_type.jq.offAllKeyboard();

				_type.mode.finger.letterGroupIndex = 0;
				_type.mode.finger.index = 0;
			},

			reset: function () {
				_type.mode.finger.isResetWaiting = false;
				function getKeyDataByChar(char) {
					var obj = _type.keymapData[char];
					if(obj)
						return obj;
					else
						return {code:char, char: _type.getModalessText(char)};
				}

				var charList = _type.data.letter[_type.mode.finger.letterGroupIndex];
				var letterData = [];
				$.each(charList.data, function (index, value) {
					letterData.push(getKeyDataByChar(value));
				});

				if(!letterData || letterData.length === 0)
					return;

				var codeData = [];
				$.each(letterData, function (index, obj) {
					if($.isNumeric(obj.code)){
						codeData.push(obj.code);
					}
				});

				var container = $('#exampleLetter').text('');
				container.attr('data-num', codeData.length);

				$.each(letterData, function (index, obj) {
					var $element = ($.isNumeric(obj.code)) ? $('<span></span>') : $('<em></em>').addClass('modaless-item');
					$element.attr('data-key', obj.code).text(obj.char).appendTo(container);
					if(obj.shift === true)
						$element.attr('data-shift', "true");
				});

				_type.setTitle(charList.title);
				_type.mode.finger.paging(_type.mode.finger.letterGroupIndex);

				_type.mode.finger.index = 0;
				_type.mode.finger.next();
				_type.mode.finger.letterGroupIndex++;
			},

			paging: function (page) {
				$('.letter-paging > span.select').removeClass('select');
				$('.letter-paging > span').eq(page).addClass('select');
			},

			createPaging: function () {
				$('.letter-paging').text('');
				var letterList = _type.data.letter;
				$.each(letterList, function () {
					$('.letter-paging').append($('<span></span>'));
				});
			}
		},

		word:{

			index: 0,

			keyup: function (code) {
				switch (code){
					case 13:// enter key
						_type.mode.word.timerStop();
						_type.mode.word.evaluate();
						_type.mode.word.next();
						_type.mode.word.speedPerMinites();
						break;
					case 27:// ecs key
						_type.mode.word.stop();
						break;
					default:
						_type.mode.word.timeStart();
				}
			},

			keydown: function (code) {

			},

			timeStart: function () {
				if(_type.timer)
					return;

				_type.mode.word.pushTime();
				var count = 0;
				_type.timer = setInterval(function () {
					$('#timeElapse').text((count * 0.1).toFixed(1));
					++count;
				}, 100);
			},

			timerStop: function () {
				clearInterval(_type.timer);
				_type.timer = null;
			},

			next: function () {
				_type.mode.word.stop();

				var list = _type.data.text;
				if(_type.mode.word.index < list.length){
					$('#inputText').focus();

					var item = list[_type.mode.word.index];
					_type.setTitle(item.title);
					_type.mode.word.setText(item.data);
				}

				console.log(_type.timestamps);
				_type.mode.word.index++;
			},

			speedPerMinites: function () {
				var timeElapse = Number($('#timeElapse').text());
				var typingLength = Number($('#typingLength').text());
				var missTypingLength = Number($('#missTypingLength').text());

				// console.log(typingLength, missTypingLength, timeElapse);
				$('#speedPerMinutes').text(((typingLength - missTypingLength) * (60/timeElapse)).toFixed(1))
			},

			reset: function () {
				_type.mode.word.clearTime();
				_type.mode.word.index = 0;
			},

			getTime : function (index) {
				if(index === undefined)
					index = 0;

				return _type.timestamps[index];
			},

			stop: function () {
				_type.mode.word.pushTime();
			},

			evaluate: function () {
				var exampleText = $('#exampleText').text().trim();
				var typingText = $('#inputText').val().trim();
				var example = Hangul.disassemble(exampleText, true);
				var typing = Hangul.disassemble(typingText, true);

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

				$('#typingResult').html( '<span id="letterLength">' + example.length + '</span>개의 문자, <span id="typingLength">'+Hangul.disassemble(exampleText).length + '</span>타이핑과 <span id="missTypingLength">' + missCount + '</span> 개 오타')
			},

			pushTime : function () {
				_type.timestamps.push(new Date().getTime());
			},
			clearTime: function () {
				_type.timestamps = [];
			},

			setText: function (text) {
				$('#inputText').val('');
				$('#exampleText').text(text);
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
		getAllLength: function () {
			return $('#exampleLetter').children().length;
		},
		getAllLetterLength: function () {
			return $('#exampleLetter').find('span').length;
		},
		getCurrentLetterKeyCode: function (index) {
			return $('#exampleLetter').find('span').eq(index).data('key')
		},
		getCurrentElement: function () {
			return $('#exampleLetter').children().eq(_type.mode.finger.index);
		},
		setBlinkCurrentLetter: function ($element) {
			$element.addClass('current');
		},
		removeBlink:function ($element) {
			$element.removeClass('current');
		}
	},


	initListener: function () {
		$(window).keyup(function (e) {
			// console.log('keyup :', e);
			_type.mode.GET().keyup(e.keyCode, e.shiftKey);

		}).keydown(function (e) {
			// console.log('keydown :', code);
			_type.mode.GET().keydown(e.keyCode);
		});

		$('#startButton').click(function () {
			$(this).fadeOut(1000, function () {
				_type.mode.word.reset();
				_type.mode.word.next();
			});
		});

		$('nav > ul > li').click(function () {
			if(_type.mode.selected)
				$('#' + _type.mode.selected + "Mode").removeClass('select');

			$(this).addClass('select');
		});
		$('#fingerMode').click(function () {
			$('.word-mode').hide();
			$('.finger-mode').show();
			_type.createKeyMap();
			_type.mode.finger.createPaging();
			_type.mode.finger.reset();
			_type.mode.selected = _type.consts.FINGER_MODE;
			_type.powermode.stop();
		});
		$('#wordMode').click(function () {
			$('.word-mode').show();
			$('.finger-mode').hide();
			_type.mode.selected = _type.consts.WORD_MODE;
			_type.powermode.start();
			_type.mode.finger.off();
		});
		$('#sentenceMode').click(function () {
			$('.word-mode').show();
			$('.finger-mode').hide();
			_type.mode.selected = _type.consts.SENTENCE_MODE;
		});
		$('#practiceMode').click(function () {
			_type.mode.selected = _type.consts.PRACTICE_MODE;
		});

		$('#cancel').click(function () {
			$('#modal').fadeOut(100);
		});

		$('.letter-paging').on('click', 'span', function () {
			_type.mode.finger.off();
			_type.mode.finger.letterGroupIndex = $(this).index();
			_type.mode.finger.reset();
		})
	},

	loadJson: function () {
		$.getJSON('json/data.json', function (d) {
			_type.data = d;

			$('#wordMode').trigger('click');
		});
	},

	createKeyMap: function () {
		$('.keyboard > .row > div:not(".disable")').each(function () {
			var key = $(this).data('key');
			var d = {};

			var krs = $(this).find('.kr > .shift');
			if(krs.length){
				d['krs'] = krs.text();
				_type.keymapData[krs.text()] = {
					"code": key,
					"char": krs.text(),
					"shift": true
				}
			}

			var krn = $(this).find('.kr > .normal');
			if(krn.length){
				d['krn'] = krn.text();
				_type.keymapData[krn.text()] = {
					"code": key,
					"char": krn.text(),
					"shift": false
				}
			}

			var ens = $(this).find('.en > .shift');
			if(ens.length)
				d['ens'] = ens.text();

			var enn = $(this).find('.en > .normal');
			if(enn.length)
				d['enn'] = enn.text();

			_type.keymap['code'+key] = d;
		});
		console.log('keymapData', _type.keymapData);
		console.log('keymap', _type.keymap);
	},

	setTitle: function (text) {
		$('#phaseTitle').text(text);
	},

	modaless: function (msg, duration) {
		var dur = (duration) ? duration : 4000;
		var el = $('#modaless').text(msg);
		el.dequeue().show().css('margin-left', -el.outerWidth() * 0.5).delay(dur).fadeOut(500);
	},

	getModalessText: function (id) {
		return _type.data.modaless[id]
	}
};