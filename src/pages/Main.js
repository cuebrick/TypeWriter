import React from 'react';
import { Link } from 'react-router-dom';
import PlayManager from "../components/PlayManager";
import UserManager from "../components/UserManager";
import Information from "../components/Information";

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
					{
						this.state.isShowNext === false ?
						<Information/>
						:
						<div>
							다시 만나 반갑습니다. 아래 메뉴 중 하나를 선택할 수 있습니다.
						</div>
					}
				</div>
				<div className="button-ui">
					<Link to="/levels"><button>단계 목록으로 이동</button></Link>
					{
						this.state.isShowNext &&
						<Link to={"/typing/" + this.state.nextLevel.id}>
							<button>
								{this.state.nextLevel.title}
								<small>{" (" + this.state.nextLevel.subtitle + ") "}</small>
								이어서 하기
							</button>
						</Link>
					}
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

export default Main