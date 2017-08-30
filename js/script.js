/**********************************************************
 * Type Writer main script
 **********************************************************/
$(function () {
	// POWERMODE.colorful = true ;
	document.body.addEventListener('input', POWERMODE);
	_type.initListener();
});

var _type = {
	_props_ : {

	},

	data: [],
	keyData:[],

	initListener: function () {
		$(window).keyup(function (e) {
			var code = e.keyCode;
			console.log('keydown :', code);
			var exampleText = $('#exampleText').text().trim();
			var inputText = $('#inputText').val().trim();
			console.log(Hangul.disassemble(exampleText));
			console.log(Hangul.disassemble(inputText));
			switch (code){
				case 13:// enter key

					break;
				default:

			}
		});
	}
};