import React from 'react';
import UserList from './UserList';

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
		let profileActiveClassName = (this.state.isShowUserLayer) ? ' active' : '';
		return(
			<div className={"profile" + profileActiveClassName}>
				<div className="user-info" onClick={this.toggleUserLayer}>
					<div className="profile-image">
						<img src={"/images/icon/profile-icon-1.svg"}/>
					</div>
					<div className="user-description">
						<div className="user-grade">수련생</div>
						<div className="user-name">세계의끝</div>
					</div>
				</div>
				<div className="user-layer">
					<UserList/>
				</div>
			</div>
		)
	}
}

export default Profile;