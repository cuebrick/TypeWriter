import React from 'react';
import LevelData from '../json/level-data';

class LetterList extends React.Component{

	constructor(props){
		super(props);
	}

	render(){
		console.log('LetterList.render:>>', this.props.level);
		return(
			<div id="letterList" className="letter-list">

			</div>
		)
	}
}

export default LetterList;