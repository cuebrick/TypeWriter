import React from 'react';

class LetterItem extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			isActive: false,
			isCorrected: false,
			input: ''
		}
	}

	setActive(bool){
		this.setState({isActive:bool});
	}

	input(char){
		console.log('LetterItem.input(): ', char);
		this.setState({input: char});
		this.setState({isCorrected: (this.props.char === this.state.input)})
	}

	render(){
		let enterKeyClassName = (this.props.char === '↩') ? ' enter-key' : '';

		let activeClassName = (this.state.isActive) ? ' active' : '';

		let correctedClassName = '';
		if(this.state.input !== ''){
			correctedClassName = (this.state.isCorrected) ? ' corrected' : ' incorrected'
		}

		return(
			<div className={"letter" + enterKeyClassName + activeClassName + correctedClassName}>
				<div className="text">{this.props.char}</div>
				<div className="typing">{this.state.input}</div>
			</div>
		)
	}
}

export default LetterItem;