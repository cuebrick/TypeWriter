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
			console.log(Hangul.disassemble(exampleText, true));
			console.log(Hangul.disassemble(inputText, true));
			switch (code){
				case 13:// enter key
					_type.pushTime();
					clearInterval(_type.timer);
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
	}
};