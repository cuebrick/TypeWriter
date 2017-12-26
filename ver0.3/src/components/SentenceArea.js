import React from 'react';
import KeyboardLayout from './KeyboardLayout';
import LetterList from './LetterList';

class SentenceArea extends React.Component{
	constructor(props){
		super(props);

		console.log("SentenceArea.constructor", props);
	}

	/*level(id){
		console.log('selectLevel :":::::', id);
	}*/

	componentDidUpdate (){
		console.log('componentDidUpdate :', this.props);
	}

	/*componentDidMount(){
		this.props.onRef(this);
	}*/

	render(){
		console.log('render :', this.props.level);
		return(
			<div className="sentence-area">
				<h3 id="levelTitle">문장연습</h3>

				<LetterList level={this.props.level}/>

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