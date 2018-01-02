import React from 'react';
import User from './User';
import UserList from './UserList';

class Profile extends React.Component{
	constructor(props){
		super(props);
		this.toggleUserLayer = this.toggleUserLayer.bind(this);
		this.state = {
			profile : User.getInstance().profile,
			isShowUserLayer : false
		};

		console.log('User.getInstance(): ', User.getInstance());
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
						<div className="user-grade">{this.state.profile.grade}</div>
						<div className="user-name">{this.state.profile.name}</div>
					</div>
				</div>
				<div className="user-layer">
					<UserList/>
					<button className="add-user">
						<div className="user-image">
							새로운 수련생 추가
							<img src={"/images/icon/profile-icon-0.svg"}/>
						</div>
					</button>
				</div>
			</div>
		)
	}
}

export default Profile;