import React from 'react';
import Information from "../components/Information";

class About extends React.Component{
	render(){
		return(
			<div className="container">
				<h3>Typing Play 에 오신것을 환영합니다.</h3>
				<div className="main-text font-LexiSaebomR">
					<Information/>
				</div>
			</div>
		)
	}
}

export default About;