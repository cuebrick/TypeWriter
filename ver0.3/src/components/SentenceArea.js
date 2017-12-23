import React from 'react';
import KeyboardLayout from './KeyboardLayout';
import LetterList from './LetterList';
import LevelData from '../json/level-data';

class SentenceArea extends React.Component{

	level(id){
		console.log('selectLevel :":::::', id);
	}

	componentDidUpdate (){
		console.log('componentWillReceiveProps :', this.props.level);
	}

	/*componentDidMount(){
		this.props.onRef(this);
	}*/

	render(){
		console.log('render :', this.props.level);
		return(
			<div className="sentence-area">
				<h3 id="levelTitle">문장연습</h3>

				<LetterList letterList={"테스트 문장입니다."}/>

				<div className="button-ui">
					<button id="goLevelListButton">목록으로</button>
				</div>

				<KeyboardLayout/>

				<div id="typingResult" className="typing-result">
					<div className="msg"></div>
				</div>
			</div>
		)
	}
}

export default SentenceArea;