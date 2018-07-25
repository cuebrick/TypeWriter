import React from 'react';
import UserManager from "../components/UserManager";
import { Link } from 'react-router-dom';

class Settings extends React.Component{
	constructor(props){
		super(props);
		this._um = UserManager.getInstance();

		this.togglePowerMode = this.togglePowerMode.bind(this);
		this.handleRemoveRecord = this.handleRemoveRecord.bind(this);
		this.reloadSettings = this.reloadSettings.bind(this);
		this.handleDeleteUser = this.handleDeleteUser.bind(this);

		// this._um.setReloadSettingsCallback(this.reloadSettings);
		this._um.setUserReloadCallback(this.reloadSettings);

		this.state = {
			isPowerMode : this._um.info.settings.powerMode,
			isRemovedRecord: false,
			info: this._um.info
		}
	}

	_um;

	reloadSettings(){
		this.setState({
			isPowerMode: this._um.info.settings.powerMode,
			info: this._um.info
		});
	}

	togglePowerMode(){
		let bool = !this.state.isPowerMode;
		this._um.saveSettings('powerMode', bool);
		this.setState({isPowerMode: bool});
	}

	handleRemoveRecord(){
		this._um.removeSaveData();
		this.setState({isRemovedRecord: true});
	}

	handleDeleteUser(){
		// TODO: 플레이어 삭제 구현
		console.log('사용자 삭제=====');
		// let users = this._um.requestDeleteUser(this.state.info.id);
		// this.setState({users: users});
	}

	render(){
		let powerModeClassName = (this.state.isPowerMode) ? 'on' : '';
		let powerModeButtonText = (this.state.isPowerMode) ? '켜짐' : '꺼짐';
		let removeRecordClassName = (this.state.isRemovedRecord) ? ' removed' : '';
		return(
			<div className="container">
				<h3>환경 설정 <small>({this.state.info.name})</small></h3>
				<ul className="setting-list">
					<li>
						<div className="icon-view">
							<img src={"./images/icon/profile-icon-" + this.state.info.icon + ".svg"}/>
						</div>
						<div className="username-view">{this.state.info.name}</div>
					</li>
					<li>
						<div className="title">파워 모드</div>
						<div className="ui">
							<button onClick={this.togglePowerMode} className={powerModeClassName}>{powerModeButtonText}</button>
						</div>
						<div className="desc">타이핑 할 때 화면에 반짝이는 효과를 나타냅니다. 화면 느려짐이 생기는 컴퓨터에서는 꺼두는 것을 권장합니다.</div>
					</li>
					<li>
						<div className="title">기록 삭제</div>
						<div className="ui">
							<button onClick={this.handleRemoveRecord} className={"delete-button" + removeRecordClassName}>삭제</button>
						</div>
						<div className="desc">{this.state.info.name}님이 기록한 레벨 기록들을 모두 삭제 합니다. 삭제 되면 복구 되지 않습니다.</div>
					</li>
					<li>
						<div className="title">사용자 삭제</div>
						<div className="ui"> </div>
						<div className="desc">사용자를 삭제하려면 오른쪽 위의 사용자 아이콘을 선택한 후 삭제하려고 하는 사용자 이름에 있는 <img src={"./images/delete.svg"} className="delete" width="15" /> 아이콘을 선택하세요.</div>
					</li>
					{/*
					<li>
						<div className="title">사용자 삭제</div>
						<div className="ui">
							<button onClick={this.handleDeleteUser} className={"delete-button" + removeRecordClassName}>삭제</button>
						</div>
						<div className="desc">{this.state.info.name}님의 플레이어를 삭제 합니다. 삭제 되면 복구 되지 않습니다.</div>
					</li>
					*/}
				</ul>
				<div className="button-ui">
					<Link to="/">
						<button className="home-btn"><img src={"./images/home.svg"} width="15" height="15"/></button>
					</Link>
					<Link to="/levels"><button>단계 목록으로 이동</button></Link>
					<Link to="/about"><button>Typing Play 일반 정보</button></Link>
					<Link to="/appInfo"><button>프로그램 기술 정보</button></Link>
				</div>
			</div>
		)
	}
}

export default Settings;