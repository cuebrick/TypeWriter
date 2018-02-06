import Hangul from '../lib/hangul';

class Reporter{


	saveResultAtLevel(level, data){
		// console.log('Reporter.saveResult(): ',level,  data);

		let missCount = 0;
		let missLetterCount = 0;
		data.map((key, index) => {
			let d = data[index];
			let text = Hangul.d(d.text);
			let typing = Hangul.d(d.typing);

			for(let i = 0; i < text.length; ++i){
				if(text[i] !== typing[i]){
					missCount++;
				}
			}
			if(text.length < typing.length){
				missCount += typing.length - text.length;
			}
			if(d.text !== d.typing){
				missLetterCount++;
			}
		});

		let totalCharLen = Hangul.d(level.text).length;
		let accuracy = (((totalCharLen - missCount) / totalCharLen) * 100).toFixed(1);
		let elapseTime = (level.timeCount * 0.01).toFixed(1);
		let speedPerMin = ((totalCharLen - missCount) * (60 / elapseTime)).toFixed(1);
		let star = 0;

		if(Number(missLetterCount) === 0)
			star++;

		if(Number(missCount) === 0)
			star++;

		if(Number(speedPerMin) > 100)
			star++;

		level.result = {
			id: level.id,
			totalLetterLen : data.length,
			totalCharLen : totalCharLen,
			missLetterCount : missLetterCount,
			missCount : missCount,
			elapseTime : elapseTime,
			speedPerMin : speedPerMin,
			accuracy : accuracy,
			star : star
		};
		return level;
	}
}

export default Reporter;