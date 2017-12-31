import React from 'react';

class Profile extends React.Component{
	constructor(props){
		super(props);
		this.toggleUserLayer = this.toggleUserLayer.bind(this);
		this.state = {
			isShowUserLayer : false
		}
	}

	toggleUserLayer(){
		this.setState({"isShowUserLayer": !this.state.isShowUserLayer});
	}

	render(){
		let layerShowClassName = (this.state.isShowUserLayer) ? ' show' : ' hide';
		return(
			<div className="profile" onClick={this.toggleUserLayer}>
				<div className="profile-image">
					<img src={"/images/icon/profile-icon-1.svg"}/>
				</div>
				<div className="user-info">
					<div className="user-grade">수련생</div>
					<div className="user-name">세계의끝</div>
				</div>
				<div className={"user-layer" + layerShowClassName}>
					<button>새로운 사용자</button>
				</div>
			</div>
		)
	}
}

export default Profile;