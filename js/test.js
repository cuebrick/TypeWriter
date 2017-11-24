$(function () {
	_play.init();
});


var level = {
	text : "세계의 끝과 하드보일드 원더랜드"
};


var _play = {
	init: function () {
		var container = $('#letterList').text('');
		var str = "세계의 끝과 하드보일드 원더랜드 입니다.";
		// var letters = [];
		for(var i = 0; i < str.length; ++i){
			// letters.push(str[i]);
			var letterElement = $('<div></div>').addClass('letter')
				.append($('<div></div>').addClass('text').text(str[i]))
				.append($('<div></div>').addClass('typing').text(''))
				.appendTo(container);

			if(i === 0)
				letterElement.addClass('active')
		}
	}
};