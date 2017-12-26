import React from 'react';
import LetterItem from './LetterItem';

class LetterList extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			isShow: true
		}
	}

	show(){
		this.setState({isShow: true});
	}

	hide(){
		this.setState({isShow: false});
	}

	render(){
		// console.log('LetterList.render:>>', (this.props.level) ? this.props.level.text : '');
		let letters = [];
		if(this.props.level){
			letters = this.props.level.text.split('');
		}
		return(
			<div id="letterList" className={"letter-list "  + (this.state.isShow ? 'show' : 'hide')}>
				{letters.map((letter, i) => {
					return(
						<LetterItem char={letter} key={i}/>
					);
				})}
			</div>
		)
	}
}

export default LetterList;