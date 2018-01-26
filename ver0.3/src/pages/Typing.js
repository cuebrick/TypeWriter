import React from 'react';
import PlayManager from "../components/PlayManager";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import LetterList from "../components/LetterList";

class Typing extends React.Component{
	constructor(props){
		super(props);
		PlayManager.getInstance().setTyping(this);

		console.log('Typing ', this.props.match.params.id);

		this.state = {
			title: this.props.match.params.id
		}
	}

	display(id){
		console.log('Typing.display() : ', id);
		this.setState({title: id})
	}

	render(){
		return(
			<div className="sentence-area">
				<h3>{this.state.title}</h3>

				<div className="button-ui">
					<Link to="/levels"><button className="list-btn">목록으로(esc)</button></Link>
					<Link to="/typing/s5"><button className="next-btn">다음단계(enter)</button></Link>
				</div>
			</div>
		)
	}
}

export default Typing