import React from 'react';
import KeyboardLayout from './KeyboardLayout';
import LetterList from './LetterList';

class SentenceArea extends React.Component{
	constructor(props){
		super(props);
		this.goLevelList = this.goLevelList.bind(this);
		this.goNextLevel = this.goNextLevel.bind(this);
	}

	goLevelList(){
		this.props.goLevelList();
	}

	goNextLevel(){
		this.props.goNextLevel();
	}

	render(){
		return(
			<div className="sentence-area">
				<h3>{this.props.level.title}</h3>

				<LetterList level={this.props.level}/>

				<div className="button-ui">
					<button onClick={this.goLevelList} className="list-btn">목록으로</button>
					<button onClick={this.goNextLevel} className="next-btn">다음단계</button>
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