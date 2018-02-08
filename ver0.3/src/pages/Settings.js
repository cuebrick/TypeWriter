import React from 'react';

class Settings extends React.Component{
	constructor(props){
		super(props);
		this.togglePowerMode = this.togglePowerMode.bind(this);

		this.state = {
			isPowerMode : false
		}
	}

	togglePowerMode(){
		this.setState({isPowerMode: !this.state.isPowerMode});
	}

	render(){
		let powerModeClassName = (this.state.isPowerMode) ? 'on' : '';
		let powerModeButtonText = (this.state.isPowerMode) ? '켜짐' : '꺼짐';
		return(
			<div className="setting-area">
				<h3>환경 설정</h3>
				<ul className="setting-list">
					<li>
						<span className="title">Power Mode</span>
						<span>
							<button onClick={this.togglePowerMode} className={powerModeClassName}>{powerModeButtonText}</button>
						</span>
					</li>
				</ul>
			</div>
		)
	}
}

export default Settings;