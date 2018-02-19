import React from 'react';
import { Link } from 'react-router-dom';
import PlayManager from "../components/PlayManager";
import UserManager from "../components/UserManager";

class Main extends React.Component{

	_pm;
	_um;

	constructor(props) {
		super(props);
		this.reload = this.reload.bind(this);
		this._pm = PlayManager.getInstance();
		this._um = UserManager.getInstance();
		this._um.setReloadMainCallback(this.reload);

		let nextId = this._pm.getProgressLevelId();
		this.state = {
			nextLevel: this._pm.getLevelObject(nextId),
			isShowNext: (nextId)
		}
	}

	reload(){
		let nextId = this._pm.getProgressLevelId();
		this.setState({
			nextLevel: this._pm.getLevelObject(nextId),
			isShowNext: (nextId)
		});
	}

	render(){

		return(
			<div className="container">
				<h3>Typing Play 에 오신것을 환영합니다.</h3>
				<div className="main-text font-LexiSaebomR">
					Typing Play는 pc의 한글 키보드 연습을 위한 프로그램 입니다.<br/>
					여러분이 만약<br/>
					<em>
						1. PC 사용 방법을 처음 배우기 위해 한글 키보드 입력 방법을 배워야 하는 분이거나<br/>
						2. PC는 사용하고 있었지만 키보드를 눈으로 보면서 타이핑을 하는(일명 독수리 타법) 분이라면<br/>
					</em>
					Typing Play 는 멋진 선택이 될 거라고 말씀드릴 수 있습니다.<br/>
					준비되어 있는 과정을 하나하나 밟아 나가면, 한글 키보드 입력이 자연스러워 지는 자신을 발견하실 수 있을 겁니다.<br/>
					단계를 밟아 가면서 <em>지켜야 할 규칙은 단 하나. "키보드를 보고 치치 않는다"</em> 입니다.<br/>
					자 그럼 이제 시작해 볼까요?
				</div>
				<div className="button-ui">
					<Link to="/levels"><button>단계 목록으로 이동</button></Link>
					{
						this.state.isShowNext &&
						<Link to={"/levels/" + this.state.nextLevel.id}><button>{this.state.nextLevel.title + "(" + this.state.nextLevel.subtitle + ")"} 이어서 하기</button></Link>
					}
				</div>
			</div>
		)
	}
}

export default Main