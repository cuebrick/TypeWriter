class Level{

	static get CHARACTER_FORM(){
		return 'character';
	}
	static get SENTENCE_TYPE(){
		return 'sentence';
	}
	static get GROUP_TYPE(){
		return 'group';
	}

	id;
	grade;
	type;
	language;
	title;
	subtitle;
	text;

	index;
	intervalId;
	timeCount;
	timeRecord;
	buffer;

	result;

	constructor(props){
		this.type = props.type;
		this.id = props.id;
		this.grade = props.grade;
		this.difficulty = props.difficulty;
		this.form = props.form;
		this.language = props.language;
		this.title = props.title;
		this.subtitle = props.subtitle;
		this.text = props.text;

		this.index = 0;
		this.intervalId = undefined;
		this.timeCount = 0;
		this.timeRecord = [];
		this.buffer = [];
		this.result = {};
	}
}

export default Level;