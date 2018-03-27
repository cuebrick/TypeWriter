import React from 'react';
import KeyboardLayout from './KeyboardLayout';
import LetterList from './LetterList';

class SentenceArea extends React.Component{
	constructor(props){
		super(props);
		this.goLevelList = this.goLevelList.bind(this);
		this.goNextLevel = this.goNextLevel.bind(this);
		this.onKeydown = this.onKeydown.bind(this);
		this.typingFinished = this.typingFinished.bind(this);
		window.addEventListener('keydown', this.onKeydown);

		this.state = {
			typingFinished: false
		}
	}

	onKeydown(e){
		let code = e.keyCode;
		console.log('여기 실행', code);
		if(code === 27){
			this.goLevelList();
		} else if (code === 39 && this.state.typingFinished){
			this.goNextLevel();
		}
	}

	typingFinished(){
		this.setState({typingFinished: true})
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

				<LetterList level={this.props.level} typingFinished={this.typingFinished}/>

				<div className="button-ui">
					<button onClick={this.goLevelList} className="list-btn">목록으로(esc)</button>
					{
						this.state.typingFinished &&
						<button onClick={this.goNextLevel} className="next-btn">다음단계(enter)</button>
					}
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