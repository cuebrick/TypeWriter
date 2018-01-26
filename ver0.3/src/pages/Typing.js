import React from 'react';
import PlayManager from "../components/PlayManager";
import KeyboardLayout from '../components/KeyboardLayout';
import { Link } from 'react-router-dom';
import LetterList from "../components/LetterList";
import Level from "../components/Level";

class Typing extends React.Component{

	_pm;
	
	constructor(props){
		super(props);
		this.typingFinished = this.typingFinished.bind(this);
		this._pm = PlayManager.getInstance();
		this._pm.setTyping(this);
		let data = this._pm.getLevelDataById(this.props.match.params.id);
		let level = new Level(data);
		this.state = {
			level: level
		}
	}

	typingFinished(){
		console.log('Typing.finished() : ', this.state.level);
	}

	render(){
		return(
			<div className="sentence-area">
				<h3>{this.state.level.title}</h3>

				<LetterList level={this.state.level} typingFinished={this.typingFinished}/>

				<div className="button-ui">
					<Link to="/levels"><button className="list-btn">목록으로(esc)</button></Link>
					<Link to="/typing/s5"><button className="next-btn">다음단계(enter)</button></Link>
				</div>

				<KeyboardLayout/>

			</div>
		)
	}
}

export default Typing