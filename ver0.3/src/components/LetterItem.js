import React from 'react';

class LetterItem extends React.Component{

	constructor(props){
		super(props);
	}
	render(){
		let enterKeyClassName = (this.props.char === '↩') ? ' enter-key' : '';

		return(
			<div className={"letter" + enterKeyClassName}>
				<div className="text">{this.props.char}</div>
				<div className="typing"></div>
			</div>
		)
	}
}

export default LetterItem;