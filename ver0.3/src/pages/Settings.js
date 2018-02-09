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

		this._um.setReloadSettingsCallback(this.reloadSettings);

		this.state = {
			isPowerMode : this._um.info.settings.powerMode,
			isRemovedRecord: false
		}
	}

	_um;

	reloadSettings(){
		this.setState({isPowerMode: this._um.info.settings.powerMode});
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

	render(){
		// console.log(UserManager.getInstance().info);
		let powerModeClassName = (this.state.isPowerMode) ? 'on' : '';
		let powerModeButtonText = (this.state.isPowerMode) ? '켜짐' : '꺼짐';
		let removeRecordClassName = (this.state.isRemovedRecord) ? ' removed' : '';
		return(
			<div className="setting-area">
				<h3>환경 설정</h3>
				<ul className="setting-list">
					<li>
						<span className="title">파워 모드</span>
						<span>
							<button onClick={this.togglePowerMode} className={powerModeClassName}>{powerModeButtonText}</button>
						</span>
					</li>
					<li>
						<span className="title">기록 삭제</span>
						<span>
							<button onClick={this.handleRemoveRecord} className={"delete-button" + removeRecordClassName}>삭제</button>
						</span>
					</li>
				</ul>
				<div className="button-ui">
					<Link to="/levels"><button>단계 목록으로 이동</button></Link>
				</div>
			</div>
		)
	}
}

export default Settings;