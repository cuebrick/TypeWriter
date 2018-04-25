import React from 'react';
import Information from "../components/Information";
import { Link } from 'react-router-dom';

class About extends React.Component{
	render(){
		return(
			<div className="container">
				<h3>Typing Play 일반 정보</h3>
				<div className="main-text font-LexiSaebomR">
					<Information/>
				</div>

				<h3>사용자 등록</h3>
				<div className="main-text font-LexiSaebomR">
					서버를 통하는 회원 가입 절차는 없습니다.<br/>
					모든 기록은 여러분의 pc에 로컬로 저장되고 다른 pc로 공유 되지 않습니다. <br/>
					비밀번호나 주민등록번호가 필요하지 않는 대신 다른 pc에서 여러분의 기록을 이어서 플레이 할 수는 없습니다. <br/>
					다른 pc에서는 새로운 사용자를 만들어 주셔야 합니다.<br/>
					그러나 하나의 pc 에서 여러 사용자의 기록을 관리 할 수 있도록 사용자를 추가할 수 있습니다.<br/>
					사용자를 추가하시려면 화면 오른쪽 위의 + 버튼을 선택해 주세요.
				</div>

				<div className="button-ui">
					<Link to="/levels"><button>단계 목록으로 이동</button></Link>
					<Link to="/appInfo"><button>프로그램 기술 정보</button></Link>
					<Link to="/settings" className="settings-btn">
						<button>
							<img src="/images/settings.svg" width="15" height="15"/>
							설정
						</button>
					</Link>
				</div>
			</div>
		)
	}
}

export default About;