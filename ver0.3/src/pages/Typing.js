import React from 'react';
import PlayManager from "../components/PlayManager";
import KeyboardLayout from '../components/KeyboardLayout';
import { Link } from 'react-router-dom';
import LetterList from "../components/LetterList";
import ReportView from "../components/ReportView";

class Typing extends React.Component{

	_pm;
	
	constructor(props){
		super(props);

		this.typingFinished = this.typingFinished.bind(this);
		this.nextCode = this.nextCode.bind(this);
		this.onKeydown = this.onKeydown.bind(this);

		this._pm = PlayManager.getInstance();
		this._pm.setTyping(this);
		let level = this._pm.getLevelObject(this.props.match.params.id);

		window.addEventListener('keydown', this.onKeydown);

		this.state = {
			level: level,
			nextLevel: null,
			nextCode: null,
			isFinished: false
		}
	}

	onKeydown(e){
		let code = e.keyCode;
		if(code === 27){
			this.props.history.push('/levels');
		} else if (code === 13 && this.state.isFinished){
			this.props.history.push('/typing/'+ this.state.nextLevel.id);
		}
	}

	nextCode(code){
		console.log('currentLetter: must>', code);
		this.setState({nextCode: code})
	}

	typingFinished(typingData){
		// Send data to PlayManager
		this._pm.typingFinished(this.state.level, typingData);

		// Next Level setting
		let nextId = this._pm.getNextLevelId(this.state.level.id);
		let level = this._pm.getLevelObject(nextId);
		this.setState({
			isFinished: true,
			nextLevel: level
		});
	}

	render(){
		// TODO: 새로고침 이외의 방법 확인 필요
		if(this.state.level.id !== this.props.match.params.id){
			window.location.reload();
		}

		return(
			<div className="sentence-area">
				<h3>{this.state.level.title}</h3>

				<LetterList level={this.state.level} nextCode={this.nextCode} typingFinished={this.typingFinished}/>

				<div className="button-ui">
					<Link to="/levels"><button className="list-btn">목록으로(esc)</button></Link>
					{
						this.state.isFinished &&
						<Link to={"/typing/" + this.state.nextLevel.id}><button className="next-btn">다음단계(enter)</button></Link>
					}
				</div>

				<KeyboardLayout nextCode={this.state.nextCode}/>
				{
					this.state.isFinished &&
					<ReportView level={this.state.level}/>
				}
			</div>
		)
	}
}

export default Typing