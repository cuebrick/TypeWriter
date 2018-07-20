import React from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component{
	render(){
		return(
			<div className="container">
				<div className="error-msg-box">
					<h3>요청하신 페이지를 찾을 수 없습니다.</h3>
					<p className="error-text">
						이 주소는 없어졌거나 잘못된 주소인것 같습니다.<br />
						주소를 다시 확인해 주세요.
					</p>
					<div className="button-ui">
						<Link to="/">
							<button className="home-btn"><img src="/images/home.svg" width="15" height="15"/> 첫 화면으로 이동</button>
						</Link>
						<Link to="/levels">
							<button>단계 목록으로 이동</button>
						</Link>
					</div>
				</div>
			</div>
		)
	}
}

export default NotFound