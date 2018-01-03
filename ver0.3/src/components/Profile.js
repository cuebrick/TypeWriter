import React from 'react';
import User from './User';
import UserList from './UserList';
import UserProfile from './UserProfile';

class Profile extends React.Component{

	_user;

	constructor(props){
		super(props);
		this.toggleUserLayer = this.toggleUserLayer.bind(this);
		this.toggleAddUserView = this.toggleAddUserView.bind(this);
		this.inputUserName = this.inputUserName.bind(this);
		this.handleInputFocus = this.handleInputFocus.bind(this);
		this.handleCreateUser = this.handleCreateUser.bind(this);

		this._user = User.getInstance();
		this.state = {
			profile : this._user.profile,
			users: this._user.users,
			isShowUserLayer : false,
			isShowAddUserView : false,
			inputNewUserName: ''
		};

		console.log('User.getInstance(): ', this._user.profile.toString());
	}

	toggleUserLayer(){
		this.setState({"isShowUserLayer": !this.state.isShowUserLayer});
	}

	toggleAddUserView(){
		this.setState({"isShowAddUserView": !this.state.isShowAddUserView});
	}

	handleCreateUser(){
		// 먼저 현재 사용자를 저장
		this._user.saveUser();
		this._user.reloadUserList();
		this.setState({users: this._user.users});

		// 새로운 사용자를 생성하고 세팅
		let profile = new UserProfile(null);
		profile.rename(this.state.inputNewUserName);
		profile.changeIcon(3);
		this._user.setUserProfile(profile);
		this.setState({profile: profile});
		this.toggleAddUserView();
	}

	inputUserName(e){
		this.setState({inputNewUserName: e.target.value});
	}

	handleInputFocus(e){
		e.target.select();
	}

	render(){
		let profileActiveClassName = (this.state.isShowUserLayer) ? ' user-layer-mode' : '';
		let addUserModeClassName = (this.state.isShowAddUserView) ? ' add-user-mode' : '';

		return(
			<div className={"profile" + profileActiveClassName + addUserModeClassName}>
				<div className="user-info">
					{this.state.isShowAddUserView ?
						<div className="user-description">
							<div className="profile-image">
								<img src={"/images/icon/profile-icon-0.svg"}/>
							</div>
							<div className="user-grade">새로운 수련생 등록</div>
							<div className="user-name">
								<input type="text" defaultValue="이름없는 사용자" onChange={this.inputUserName} onFocus={this.handleInputFocus}/>
							</div>
						</div>
						:
						<div className="user-description" onClick={this.toggleUserLayer}>

							<div className="profile-image">
								<img src={"/images/icon/profile-icon-"+ this.state.profile.icon +".svg"}/>
							</div>
							<div className="user-grade">{this.state.profile.grade}</div>
							<div className="user-name">{this.state.profile.name}</div>
						</div>
					}
				</div>
				<div className="profile-buttons">
					{this.state.isShowAddUserView ?
						<div>
							<button className="" onClick={this.handleCreateUser}>등록</button>
							<button className="" onClick={this.toggleAddUserView}>취소</button>
						</div>
						:
						<div>
							{this.state.isShowUserLayer === false &&
								<button className="" onClick={this.toggleAddUserView}>+</button>
							}
						</div>
					}
				</div>
				<div className="user-layer">
					<UserList users={this.state.users}/>
				</div>
			</div>
		)
	}
}

export default Profile;