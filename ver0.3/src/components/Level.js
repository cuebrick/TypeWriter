class Level{

	static get CHARACTER_TYPE(){
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
		// super(props);

		this.id = props.id;
		this.grade = props.grade;
		this.type = props.type;
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

		/*this.state = {
			id: this.props.id,
			grade: this.props.grade,
			type: this.props.type,
			language: this.props.language,
			title: this.props.title,
			text: this.props.text,

			intervalId: 0
		}*/
	}

	/*get id(){
		return this.state.id
	}
	get grade(){
		return this.state.grade
	}
	get type(){
		return this.state.type
	}
	get language(){
		return this.state.language
	}
	get title(){
		return this.state.title
	}
	get text(){
		return this.state.text
	}


	get intervalId(){
		return this.state.intervalId;
	}
	set intervalId(id){
		console.log(id);
		this.setState({intervalId: id});
	}*/
}

export default Level;