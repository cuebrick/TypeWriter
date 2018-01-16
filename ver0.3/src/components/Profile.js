import React from 'react';
import User from './User';
import UserList from './UserList';
import UserInfo from './UserInfo';

class Profile extends React.Component{

	_user;

	constructor(props){
		super(props);
		this.toggleUserLayer = this.toggleUserLayer.bind(this);
		this.toggleAddUserView = this.toggleAddUserView.bind(this);
		this.inputUserName = this.inputUserName.bind(this);
		this.handleInputFocus = this.handleInputFocus.bind(this);
		this.handleCreateUser = this.handleCreateUser.bind(this);
		this.toggleProfileIcon = this.toggleProfileIcon.bind(this);
		this.selectedUser = this.selectedUser.bind(this);
		this.deletedUser = this.deletedUser.bind(this);

		this._user = User.getInstance();
		this.state = {
			info : this._user.info,
			users: this._user.users,
			isDisableProfile: false,
			isShowUserListLayer : false,
			isShowAddUserView : false,
			isShowProfileIconSelector: false,
			inputNewUserName: '',
			selectIconIndex: 0
		};

		// console.log('User.getInstance(): ', this._user.info.toString());
	}

	toggleUserLayer(){
		this.setState({isShowUserListLayer: !this.state.isShowUserListLayer});
		this.setState({isDisableProfile: !this.state.isDisableProfile});
	}

	toggleProfileIcon(e){
		console.log(this.state.isShowProfileIconSelector);
		this.setState({isShowProfileIconSelector: !this.state.isShowProfileIconSelector});
	}

	handleIconSelect(index){
		console.log(index);
		this.setState({selectIconIndex: index});
	}

	toggleAddUserView(){
		this.setState({inputNewUserName: "이름없는 사용자"});
		this.setState({selectIconIndex: 0});
		this.setState({isShowAddUserView: !this.state.isShowAddUserView});
	}

	toggleTypingMode(bool){
		this.setState({isDisableProfile: bool});
		// this.setState({isShowProfileIconSelector: !bool});
		// this.setState({isShowAddUserView: bool});
	}

	handleCreateUser(){
		// 먼저 현재 사용자를 저장
		this._user.saveUser();

		// 새로운 사용자를 생성하고 세팅
		let userInfo = new UserInfo(null);
		console.log('new UserInfo: ', this.state.inputNewUserName, this.state.selectIconIndex);
		userInfo.rename(this.state.inputNewUserName);
		userInfo.changeIcon(this.state.selectIconIndex);
		this._user.setUserInfo(userInfo);
		this.setState({info: userInfo});
		this.setState({isShowAddUserView: false});
		this.setState({users: this._user.reloadUserList()});
	}

	selectedUser(userId){
		let userInfo = User.getInstance().changeUser(userId);
		this.setState({info: userInfo});
		this.toggleUserLayer();
		this._user.reloadUserList();
	}

	deletedUser(userId){
		let users = User.getInstance().requestDeleteUser(userId);
		this.setState({users: users});
	}

	inputUserName(e){
		this.setState({inputNewUserName: e.target.value});
	}

	handleInputFocus(e){
		e.target.select();
	}

	render(){
		let disableProfileClassName = (this.state.isDisableProfile) ? ' disable-profile-mode' : '';
		let userListModeClassName = (this.state.isShowUserListLayer) ? ' user-list-layer-mode' : '';
		let addUserModeClassName = (this.state.isShowAddUserView) ? ' add-user-mode' : '';

		return(
			<div className={"profile" + userListModeClassName + addUserModeClassName + disableProfileClassName}>
				<div className="user-info">
					{
						this.state.isShowAddUserView ?
						<div className="user-description">
							<div className="profile-image" onClick={this.toggleProfileIcon}>
								<img src={"/images/icon/profile-icon-" + this.state.selectIconIndex + ".svg"}/>
							</div>
							<div className="user-grade">새로운 수련생 등록</div>
							<div className="user-name">
								<input type="text" defaultValue="이름없는 사용자" onChange={this.inputUserName} onFocus={this.handleInputFocus}/>
							</div>

							{this.state.isShowProfileIconSelector &&
								<div className="icon-selector">
									{[...Array(10)].map((x, i) =>
										<img key={i} src={"/images/icon/profile-icon-" + i + ".svg"} onClick={() => this.handleIconSelect(i)}/>
									)}
								</div>
							}
						</div>
						:
						<div className="user-description" onClick={this.state.isDisableProfile ? null :  this.toggleUserLayer}>

							<div className="profile-image">
								<img src={"/images/icon/profile-icon-"+ this.state.info.icon +".svg"}/>
							</div>
							<div className="user-grade">{this.state.info.grade}</div>
							<div className="user-name">{this.state.info.name}</div>
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
							{this.state.isDisableProfile === false &&
								<button className="" onClick={this.toggleAddUserView}>+</button>
							}
						</div>
					}
				</div>
				<div className="user-layer">
					<UserList users={this.state.users} currentUserId={this.state.info.id} selectUser={this.selectedUser} deleteUser={this.deletedUser}/>
				</div>
			</div>
		)
	}
}

export default Profile;