import React from 'react';
import KeyboardLayout from './KeyboardLayout';

class SentenceArea extends React.Component{
	render(){
		return(
			<div className="sentence-area">
				<h3 id="levelTitle">문장연습</h3>
				<div id="letterList" className="letter-list">

				</div>
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