import React from 'react';
import KeyboardLayout from './KeyboardLayout';
import LetterList from './LetterList';
import User from './User';

class SentenceArea extends React.Component{
	constructor(props){
		super(props);
		this.goLevelList = this.goLevelList.bind(this);
	}

	goLevelList(){
		this.props.goLevelList();
		User.getInstance().report('from : SentenceArea.goLevelList()')
	}

	render(){
		// console.log('SentenceArea.render() :', this.props.level);
		return(
			<div className="sentence-area">
				<h3>{this.props.level.title}</h3>

				<LetterList level={this.props.level}/>

				<div className="button-ui">
					<button onClick={this.goLevelList}>목록으로</button>
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