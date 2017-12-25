import React from 'react';

class Level extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			id: this.props.id,
			grade: this.props.grade,
			type: this.props.type,
			language: this.props.language,
			title: this.props.title,
			text: this.props.text
		}
	}
	get id(){
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
}

export default Level;