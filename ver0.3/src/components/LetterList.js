import React from 'react';
import LevelData from '../json/level-data';

class LetterList extends React.Component{

	constructor(props){
		super(props);
		// console.log(LevelData.sentence.s5);
		console.log(this.props.letterList);
	}

	render(){
		return(
			<div id="letterList" className="letter-list">

			</div>
		)
	}
}

export default LetterList;