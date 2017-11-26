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

		var str = "세계의 끝과 하드보일드 원더랜드 입니다.";
		// var letters = [];

		_play.level = _play.getNewLevelObject();
		_play.setLevelText(_play.level.text);
	},
	initListener: function () {
		$(window).keydown(function (e) {
			var char = _play.keymap['code'+e.keyCode].krn;
			_play.level.keyBuffer.push(char);

			console.log(_play.level.keyBuffer);
			$('#letterList').find('.active').find('.typing').text(Hangul.assemble(_play.level.keyBuffer))
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