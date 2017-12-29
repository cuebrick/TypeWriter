import React from 'react';

class LetterItem extends React.Component{

	constructor(props){
		super(props);
		this.state = {input: ''}
	}
	input(char){
		console.log('LetterItem.input(): ', char);
		this.setState({input: char})
	}

	render(){
		let enterKeyClassName = (this.props.char === '↩') ? ' enter-key' : '';

		let typing = (this.props.typing) ? this.props.typing : '';

		return(
			<div className={"letter" + enterKeyClassName}>
				<div className="text">{this.props.char}</div>
				<div className="typing">{this.state.input}</div>
				{/*<div className="typing">{typing}</div>*/}
			</div>
		)
	}
}

export default LetterItem;