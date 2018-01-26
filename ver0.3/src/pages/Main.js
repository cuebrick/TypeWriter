import React from 'react';
import { Link } from 'react-router-dom';

class Main extends React.Component{
	render(){
		return(
			<div className="container">
				<h3>Typing Play 에 오신것을 환영합니다.</h3>
				<Link to="/levels">단계 목록</Link>
			</div>
		)
	}
}

export default Main