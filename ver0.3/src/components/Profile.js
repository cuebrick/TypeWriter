import React from 'react';
import UserList from './UserList';
import UserManager from "./UserManager";
import PlayManager from "./PlayManager";

class Profile extends React.Component{

	_um;

	constructor(props){
		super(props);

		this._um = UserManager.getInstance();
		this._pm = PlayManager.getInstance();
		this._pm.setProfile(this);

		this.toggleUserLayer = this.toggleUserLayer.bind(this);
		this.toggleAddUserView = this.toggleAddUserView.bind(this);
		this.inputUserName = this.inputUserName.bind(this);
		this.handleInputFocus = this.handleInputFocus.bind(this);
		this.handleCreateUser = this.handleCreateUser.bind(this);
		this.toggleProfileIcon = this.toggleProfileIcon.bind(this);
		this.selectedUser = this.selectedUser.bind(this);
		this.deletedUser = this.deletedUser.bind(this);

		this.state = {
			info : this._um.info,
			users: this._um.reloadUserList(),
			isTypingMode: false,
			isShowUserLayer: false,
			isShowAddUserView : false,
			isShowProfileIconSelector: false,
			inputNewUserName: '',
			selectIconIndex: 0
		};
	}

	/**
	 * 유저 목록 보임 토글
	 */
	toggleUserLayer(){
		this.setState({isShowUserLayer: !this.state.isShowUserLayer});
	}

	/**
	 * 새로운 사용자 추가
	 */
	toggleAddUserView(){
		this.setState({
			inputNewUserName: "이름없는 사용자",
			selectIconIndex: 0,
			isShowAddUserView: !this.state.isShowAddUserView,
			isShowProfileIconSelector: true
		});
	}

	/**
	 * 새로운 사용자 추가 상태에서 icon 선택 레이어 보임 토글
	 * @param e
	 */
	toggleProfileIcon(e){
		this.setState({isShowProfileIconSelector: !this.state.isShowProfileIconSelector});
	}

	/**
	 * 유저 목록에서 유저를 선택
	 * @param userId
	 */
	selectedUser(userId){
		let info = this._um.changeUser(userId);
		this.setState({info: info});
		this.toggleUserLayer();
		this.setState({
			users: this._um.reloadUserList()
		});
	}

	/**
	 * 타이핑 상태로 설정하면 유저를 변경할 수 없도록 상태 변경 토글
	 * @param bool
	 */
	toggleTypingMode(bool){
		if(bool && this.state.isShowAddUserView){
			this.toggleAddUserView();
		}
		let b = (bool === undefined) ? !this.state.isTypingMode : bool;
		this.setState({isTypingMode: b});
	}

	/**
	 * 사용자 입력에 클릭하면 작성되어 있는 모든 텍스트를 선택
	 * @param e
	 */
	handleInputFocus(e){
		e.target.select();
	}

	/**
	 * 사용자 이름 입력
	 * @param e
	 */
	inputUserName(e){
		this.setState({inputNewUserName: e.target.value});
	}

	/**
	 * 새로운 사용자를 추가하는 과정에서 아이콘을 선택함
	 * @param index
	 */
	handleIconSelect(index){
		this.setState({selectIconIndex: index});
	}

	/**
	 * 새로운 사용자의 결정사항들을 결정
	 */
	handleCreateUser(){
		// 먼저 현재 사용자를 저장
		this._um.saveUser();

		// 새로운 사용자를 생성하고 세팅
		this._um.createNewUser({
			name: this.state.inputNewUserName,
			icon: this.state.selectIconIndex
		});

		this.setState({
			info: this._um.info,
			isShowAddUserView: false,
			users: this._um.reloadUserList()
		});
	}

	/**
	 * 유저 목록에서 삭제할 유저를 선택
	 * @param userId
	 */
	deletedUser(userId){
		let users = this._um.requestDeleteUser(userId);
		this.setState({users: users});
	}



	render(){
		let typingModeClassName = (this.state.isTypingMode) ? ' typing-mode' : '';
		let profileActiveClassName = (this.state.isShowUserLayer) ? ' user-layer-mode' : '';
		let addUserModeClassName = (this.state.isShowAddUserView) ? ' add-user-mode' : '';

		return(
			<div className={"profile" + profileActiveClassName + addUserModeClassName + typingModeClassName}>
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

							{
								this.state.isShowProfileIconSelector &&
								<div className="icon-selector">
									{[...Array(10)].map((x, i) =>
										<img key={i} src={"/images/icon/profile-icon-" + i + ".svg"} onClick={() => this.handleIconSelect(i)}/>
									)}
								</div>
							}
						</div>
						:
						<div className="user-description"
						     onClick={this.state.isTypingMode ? null : this.toggleUserLayer}>
							<div className="profile-image">
								<img src={"/images/icon/profile-icon-" + this.state.info.icon + ".svg"}/>
							</div>
							<div className="user-grade">{this.state.info.grade}</div>
							<div className="user-name">{this.state.info.name}</div>
						</div>
					}
				</div>
				{
					this.state.isTypingMode === false &&
					<div className="profile-buttons">
						{
							this.state.isShowAddUserView ?
							<div>
								<button className="" onClick={this.handleCreateUser}>등록</button>
								<button className="" onClick={this.toggleAddUserView}>취소</button>
							</div>
							:
							<div>
								{
									this.state.isShowUserLayer === false &&
									<button className="" onClick={this.toggleAddUserView}>+</button>
								}
							</div>
						}
					</div>
				}

				<div className="user-layer">
					<UserList users={this.state.users} currentUserId={this.state.info.id} selectUser={this.selectedUser} deleteUser={this.deletedUser}/>
				</div>
			</div>
		)
	}
}

export default Profile;