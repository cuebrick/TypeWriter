import React from 'react';

class LetterItem extends React.Component{

	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className="letter">
				<div className="text">{this.props.text}</div>
				<div className="typing">{this.props.typing}</div>
			</div>
		)
	}
}

export default LetterItem;